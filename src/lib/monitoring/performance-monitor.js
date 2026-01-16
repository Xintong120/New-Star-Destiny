export class PerformanceMonitor {
  constructor(options = {}) {
    this.options = {
      enableDevPanel: process.env.NODE_ENV === 'development',
      storageKey: 'performance-data',
      maxRecords: 1000,
      ...options
    };

    this.interactions = [];
    this.storage = options.storage || new LocalStorage();
    this.reporter = options.reporter;

    this.init();
  }

  init() {
    this.loadPersistedData();
    this.initINPMonitoring();
    this.initWebVitals();

    if (this.options.enableDevPanel) {
      this.initDevPanel();
    }
  }

  initINPMonitoring() {
    // 使用Event Timing API监听用户交互
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'event' && entry.duration > 0) {
            // 计算INP (简化版)
            const inp = this.calculateINP(entry);
            if (inp > 0) {
              this.recordInteraction({
                type: 'inp',
                value: inp,
                target: this.getElementInfo(entry.target),
                interactionType: entry.name,
                timestamp: entry.startTime
              });
            }
          }
        }
      });

      observer.observe({ entryTypes: ['event'] });
    }
  }

  calculateINP(entry) {
    // 简化的INP计算逻辑
    // 实际应该使用更复杂的算法考虑多个帧
    return entry.duration;
  }

  initWebVitals() {
    // Web Vitals将在adapter中初始化
  }

  recordInteraction(data) {
    const interaction = {
      id: Date.now() + Math.random(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      ...data
    };

    this.interactions.push(interaction);

    // 限制内存中的记录数量
    if (this.interactions.length > this.options.maxRecords) {
      this.interactions = this.interactions.slice(-this.options.maxRecords);
    }

    this.persistData();

    // 上报数据
    if (this.reporter) {
      this.reporter.report(interaction);
    }
  }

  getElementInfo(element) {
    if (!element) return { tagName: 'unknown', className: '', id: '' };

    return {
      tagName: element.tagName || 'unknown',
      className: element.className || '',
      id: element.id || '',
      text: element.textContent?.substring(0, 50) || ''
    };
  }

  persistData() {
    this.storage.save(this.options.storageKey, this.interactions);
  }

  loadPersistedData() {
    this.interactions = this.storage.load(this.options.storageKey) || [];
  }

  initDevPanel() {
    // 将在单独的文件中实现
  }

  // 获取统计数据
  getStats() {
    const inpValues = this.interactions.filter(i => i.type === 'inp').map(i => i.value);
    const fidValues = this.interactions.filter(i => i.type === 'fid').map(i => i.value);
    const clsValues = this.interactions.filter(i => i.type === 'cls').map(i => i.value);

    return {
      totalInteractions: this.interactions.length,
      inp: {
        count: inpValues.length,
        avg: inpValues.length > 0 ? inpValues.reduce((a,b)=>a+b,0)/inpValues.length : 0,
        max: inpValues.length > 0 ? Math.max(...inpValues) : 0,
        p75: this.calculatePercentile(inpValues, 75),
        p95: this.calculatePercentile(inpValues, 95)
      },
      fid: {
        count: fidValues.length,
        avg: fidValues.length > 0 ? fidValues.reduce((a,b)=>a+b,0)/fidValues.length : 0,
        max: fidValues.length > 0 ? Math.max(...fidValues) : 0
      },
      cls: {
        count: clsValues.length,
        avg: clsValues.length > 0 ? clsValues.reduce((a,b)=>a+b,0)/clsValues.length : 0,
        max: clsValues.length > 0 ? Math.max(...clsValues) : 0
      }
    };
  }

  calculatePercentile(values, percentile) {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a,b) => a - b);
    const index = (percentile / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const weight = index % 1;

    if (upper >= sorted.length) return sorted[sorted.length - 1];
    return sorted[lower] * (1 - weight) + sorted[upper] * weight;
  }

  // 导出数据
  exportData() {
    const dataStr = JSON.stringify(this.interactions, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `performance-data-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

  // 清空数据
  clearData() {
    this.interactions = [];
    this.storage.clear(this.options.storageKey);
  }
}

// 简单的本地存储实现
class LocalStorage {
  save(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save performance data:', e);
    }
  }

  load(key) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.warn('Failed to load performance data:', e);
      return null;
    }
  }

  clear(key) {
    localStorage.removeItem(key);
  }
}