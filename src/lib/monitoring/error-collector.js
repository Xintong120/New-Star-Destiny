export class ErrorCollector {
  constructor(monitor) {
    this.monitor = monitor;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // 监听全局JS错误
    window.addEventListener('error', (event) => {
      this.handleError({
        type: 'js_error',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: event.error?.stack,
        target: event.target?.tagName || 'unknown'
      });
    });

    // 监听未捕获的Promise拒绝
    window.addEventListener('unhandledrejection', (event) => {
      this.handleError({
        type: 'promise_rejection',
        message: event.reason?.message || event.reason,
        stack: event.reason?.stack,
        reason: event.reason
      });
    });

    // 监听资源加载错误
    window.addEventListener('error', (event) => {
      if (event.target && event.target !== window) {
        this.handleError({
          type: 'resource_error',
          target: event.target.tagName || event.target.constructor.name,
          src: event.target.src || event.target.href,
          message: `Failed to load ${event.target.src || event.target.href}`
        });
      }
    }, true); // 捕获阶段

    // 劫持XMLHttpRequest监听网络错误
    this.patchXMLHttpRequest();

    // 劫持Fetch监听网络错误
    this.patchFetch();

    console.log('ErrorCollector initialized');
  }

  handleError(errorData) {
    const error = {
      id: Date.now() + Math.random(),
      type: errorData.type,
      message: errorData.message,
      stack: errorData.stack,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      ...errorData
    };

    // 记录到性能监控器
    this.monitor.recordInteraction({
      type: 'error',
      value: 1, // 错误计数
      rating: 'poor', // 错误始终poor
      target: { tagName: error.target || 'unknown' },
      interactionType: error.type,
      error: error
    });
  }

  patchXMLHttpRequest() {
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    const self = this;

    XMLHttpRequest.prototype.open = function(method, url) {
      this._url = url;
      this._method = method;
      return originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function() {
      const xhr = this;

      const handleError = () => {
        if (xhr.status >= 400) {
          self.handleError({
            type: 'xhr_error',
            message: `HTTP ${xhr.status}: ${xhr.statusText}`,
            url: xhr._url,
            method: xhr._method,
            status: xhr.status
          });
        }
      };

      if (this.addEventListener) {
        this.addEventListener('error', handleError);
        this.addEventListener('load', () => {
          if (xhr.status >= 400) handleError();
        });
      }

      return originalSend.apply(this, arguments);
    };
  }

  patchFetch() {
    const originalFetch = window.fetch;
    const self = this;

    window.fetch = function() {
      const url = arguments[0];
      const options = arguments[1] || {};

      return originalFetch.apply(this, arguments).catch(error => {
        self.handleError({
          type: 'fetch_error',
          message: error.message,
          stack: error.stack,
          url: url,
          method: options.method || 'GET'
        });
        throw error; // 重新抛出错误
      });
    };
  }

  // 手动报告自定义错误
  reportCustomError(type, message, extra = {}) {
    this.handleError({
      type: type,
      message: message,
      ...extra
    });
  }
}