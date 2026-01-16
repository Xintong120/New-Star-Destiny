export class UserBehaviorTracker {
  constructor(monitor) {
    this.monitor = monitor;
    this.pageStartTime = Date.now();
    this.sessionId = this.generateSessionId();
    this.isInitialized = false;

    // 数据过滤和采样控制
    this.lastScrollTime = 0;
    this.scrollMinInterval = 500; // 滚动记录最小间隔500ms
    this.lastClickTime = 0;
    this.clickMinInterval = 100; // 点击记录最小间隔100ms
    this.clickCount = 0;
    this.clickCountResetTime = Date.now();
    this.maxClicksPerSecond = 10; // 每秒最多10次点击
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // 记录页面浏览 (PV)
    this.trackPageView();

    // 监听页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackPageLeave();
      } else {
        this.trackPageReturn();
      }
    });

    // 监听页面卸载
    window.addEventListener('beforeunload', () => {
      this.trackPageLeave();
    });

    // 监听用户点击事件
    this.trackClicks();

    // 监听用户滚动行为
    this.trackScroll();

    // 监听页面来源
    this.trackReferrer();

    console.log('UserBehaviorTracker initialized');
  }

  generateSessionId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  trackPageView() {
    const referrer = document.referrer;
    this.monitor.recordInteraction({
      type: 'page_view',
      value: 1,
      target: { tagName: 'document' },
      interactionType: 'page_load',
      referrer: referrer,
      sessionId: this.sessionId,
      url: window.location.href
    });
  }

  trackPageLeave() {
    const duration = Date.now() - this.pageStartTime;
    this.monitor.recordInteraction({
      type: 'page_leave',
      value: duration,
      target: { tagName: 'document' },
      interactionType: 'page_unload',
      sessionId: this.sessionId,
      duration: duration
    });
  }

  trackPageReturn() {
    this.monitor.recordInteraction({
      type: 'page_return',
      value: 1,
      target: { tagName: 'document' },
      interactionType: 'visibility_visible',
      sessionId: this.sessionId
    });
  }

  trackClicks() {
    document.addEventListener('click', (event) => {
      const now = Date.now();

      // 检查最小间隔
      if (now - this.lastClickTime < this.clickMinInterval) return;

      // 检查每秒最大点击数
      if (now - this.clickCountResetTime > 1000) {
        this.clickCount = 0;
        this.clickCountResetTime = now;
      }
      if (this.clickCount >= this.maxClicksPerSecond) return;

      const target = event.target;
      const elementInfo = this.getElementInfo(target);

      this.monitor.recordInteraction({
        type: 'user_click',
        value: 1,
        target: elementInfo,
        interactionType: 'click',
        sessionId: this.sessionId,
        x: event.clientX,
        y: event.clientY
      });

      this.lastClickTime = now;
      this.clickCount++;
    });
  }

  trackScroll() {
    let lastScrollY = 0;
    let scrollDepth = 0;

    window.addEventListener('scroll', () => {
      const now = Date.now();
      if (now - this.lastScrollTime < this.scrollMinInterval) return; // 防抖

      const currentScrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentDepth = Math.round((currentScrollY / maxScroll) * 100);

      if (currentDepth > scrollDepth && currentDepth >= 25) { // 每25%记录一次
        scrollDepth = currentDepth;
        this.monitor.recordInteraction({
          type: 'scroll_depth',
          value: scrollDepth,
          target: { tagName: 'document' },
          interactionType: 'scroll',
          sessionId: this.sessionId
        });
        this.lastScrollTime = now;
      }

      lastScrollY = currentScrollY;
    });
  }

  trackReferrer() {
    const referrer = document.referrer;
    if (referrer) {
      this.monitor.recordInteraction({
        type: 'page_referrer',
        value: 1,
        target: { tagName: 'document' },
        interactionType: 'referrer',
        referrer: referrer,
        sessionId: this.sessionId
      });
    }
  }

  getElementInfo(element) {
    if (!element) return { tagName: 'unknown', className: '', id: '' };

    return {
      tagName: element.tagName || 'unknown',
      className: element.className || '',
      id: element.id || '',
      text: element.textContent?.substring(0, 50) || '',
      href: element.href || '',
      type: element.type || ''
    };
  }

  // 手动跟踪自定义事件
  trackCustomEvent(eventName, data = {}) {
    this.monitor.recordInteraction({
      type: 'custom_event',
      value: 1,
      target: { tagName: 'document' },
      interactionType: eventName,
      sessionId: this.sessionId,
      ...data
    });
  }
}