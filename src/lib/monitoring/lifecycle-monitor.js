export class LifecycleMonitor {
  constructor(monitor) {
    this.monitor = monitor;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // 收集页面生命周期数据
    this.collectLifecycleData();

    // 监听页面加载事件
    window.addEventListener('load', () => {
      this.collectLoadTiming();
    });

    // 监听DOMContentLoaded
    document.addEventListener('DOMContentLoaded', () => {
      this.collectDOMContentTiming();
    });

    // 劫持HTTP请求测速
    this.patchNetworkRequests();

    console.log('LifecycleMonitor initialized');
  }

  collectLifecycleData() {
    if (!window.performance || !window.performance.timing) return;

    const timing = window.performance.timing;

    // DNS查询时间
    const dnsTime = timing.domainLookupEnd - timing.domainLookupStart;
    if (dnsTime > 0) {
      this.monitor.recordInteraction({
        type: 'dns_lookup',
        value: dnsTime,
        target: { tagName: 'document' },
        interactionType: 'network'
      });
    }

    // TCP连接时间
    const tcpTime = timing.connectEnd - timing.connectStart;
    if (tcpTime > 0) {
      this.monitor.recordInteraction({
        type: 'tcp_connect',
        value: tcpTime,
        target: { tagName: 'document' },
        interactionType: 'network'
      });
    }

    // SSL握手时间
    if (timing.secureConnectionStart > 0) {
      const sslTime = timing.connectEnd - timing.secureConnectionStart;
      this.monitor.recordInteraction({
        type: 'ssl_handshake',
        value: sslTime,
        target: { tagName: 'document' },
        interactionType: 'network'
      });
    }

    // 请求响应时间
    const requestTime = timing.responseStart - timing.requestStart;
    if (requestTime > 0) {
      this.monitor.recordInteraction({
        type: 'request_response',
        value: requestTime,
        target: { tagName: 'document' },
        interactionType: 'network'
      });
    }

    // 响应下载时间
    const responseTime = timing.responseEnd - timing.responseStart;
    if (responseTime > 0) {
      this.monitor.recordInteraction({
        type: 'response_download',
        value: responseTime,
        target: { tagName: 'document' },
        interactionType: 'network'
      });
    }
  }

  collectLoadTiming() {
    if (!window.performance || !window.performance.timing) return;

    const timing = window.performance.timing;

    // 页面加载总时间
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    if (loadTime > 0) {
      this.monitor.recordInteraction({
        type: 'page_load_time',
        value: loadTime,
        target: { tagName: 'document' },
        interactionType: 'lifecycle'
      });
    }

    // DOM解析时间
    const domParsing = timing.domComplete - timing.domLoading;
    if (domParsing > 0) {
      this.monitor.recordInteraction({
        type: 'dom_parsing',
        value: domParsing,
        target: { tagName: 'document' },
        interactionType: 'lifecycle'
      });
    }
  }

  collectDOMContentTiming() {
    if (!window.performance || !window.performance.timing) return;

    const timing = window.performance.timing;

    // DOMContentLoaded时间
    const domContentTime = timing.domContentLoadedEventEnd - timing.navigationStart;
    if (domContentTime > 0) {
      this.monitor.recordInteraction({
        type: 'dom_content_loaded',
        value: domContentTime,
        target: { tagName: 'document' },
        interactionType: 'lifecycle'
      });
    }
  }

  patchNetworkRequests() {
    // 使用PerformanceObserver监听资源加载
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource' && entry.duration > 0) {
            this.monitor.recordInteraction({
              type: 'resource_load',
              value: entry.duration,
              target: { tagName: entry.name.split('/').pop() || 'resource' },
              interactionType: 'resource',
              url: entry.name,
              size: entry.transferSize || 0
            });
          }
        }
      });

      observer.observe({ entryTypes: ['resource'] });
    }

    // 劫持XMLHttpRequest
    this.patchXMLHttpRequest();

    // 劫持Fetch
    this.patchFetch();
  }

  patchXMLHttpRequest() {
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    const self = this;

    XMLHttpRequest.prototype.open = function(method, url) {
      this._url = url;
      this._method = method;
      this._startTime = Date.now();
      return originalOpen.apply(this, arguments);
    };

    XMLHttpRequest.prototype.send = function() {
      const xhr = this;
      const startTime = xhr._startTime;

      const handleLoad = () => {
        const duration = Date.now() - startTime;
        self.monitor.recordInteraction({
          type: 'xhr_request',
          value: duration,
          target: { tagName: 'xhr' },
          interactionType: 'xhr',
          url: xhr._url,
          method: xhr._method,
          status: xhr.status
        });
      };

      if (this.addEventListener) {
        this.addEventListener('load', handleLoad);
        this.addEventListener('error', handleLoad);
        this.addEventListener('abort', handleLoad);
      }

      return originalSend.apply(this, arguments);
    };
  }

  patchFetch() {
    const originalFetch = window.fetch;
    const self = this;

    window.fetch = function(url, options = {}) {
      const startTime = Date.now();

      return originalFetch.apply(this, arguments).then(response => {
        const duration = Date.now() - startTime;
        self.monitor.recordInteraction({
          type: 'fetch_request',
          value: duration,
          target: { tagName: 'fetch' },
          interactionType: 'fetch',
          url: url,
          method: options.method || 'GET',
          status: response.status
        });
        return response;
      }).catch(error => {
        const duration = Date.now() - startTime;
        self.monitor.recordInteraction({
          type: 'fetch_request',
          value: duration,
          target: { tagName: 'fetch' },
          interactionType: 'fetch',
          url: url,
          method: options.method || 'GET',
          error: error.message
        });
        throw error;
      });
    };
  }
}