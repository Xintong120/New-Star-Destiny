export class DevPanel {
  constructor(monitor) {
    this.monitor = monitor;
    this.panel = null;
    this.isVisible = true;
    this.isMinimized = false;
  }

  init() {
    this.createPanel();
    this.updateDisplay();

    // 每秒更新显示
    this.updateInterval = setInterval(() => this.updateDisplay(), 1000);

    // 页面卸载时清理
    window.addEventListener('beforeunload', () => this.cleanup());
  }

  createPanel() {
    this.panel = document.createElement('div');
    this.panel.id = 'performance-dev-panel';
    this.panel.innerHTML = `
      <div class="perf-panel-header">
        <h3>Performance Monitor</h3>
        <div class="perf-controls">
          <button class="perf-minimize">_</button>
          <button class="perf-toggle">Hide</button>
        </div>
      </div>
      <div class="perf-content">
        <div class="perf-metrics">
          <div class="metric">
            <span class="label">Total Records:</span>
            <span class="value" id="interactions-count">0</span>
          </div>
          <div class="metric">
            <span class="label">JS Errors:</span>
            <span class="value" id="errors-count">0</span>
          </div>
          <div class="metric">
            <span class="label">User Clicks:</span>
            <span class="value" id="clicks-count">0</span>
          </div>
          <div class="metric">
            <span class="label">Page Duration:</span>
            <span class="value" id="page-duration">0s</span>
          </div>
        </div>
        <div class="perf-core-vitals">
          <div class="vital">
            <span class="label">INP:</span>
            <span class="value" id="inp-value">-</span>
          </div>
          <div class="vital">
            <span class="label">CLS:</span>
            <span class="value" id="cls-value">-</span>
          </div>
          <div class="vital">
            <span class="label">LCP:</span>
            <span class="value" id="lcp-value">-</span>
          </div>
        </div>
        <div class="perf-network">
          <div class="metric">
            <span class="label">DNS:</span>
            <span class="value" id="dns-time">0ms</span>
          </div>
          <div class="metric">
            <span class="label">TCP:</span>
            <span class="value" id="tcp-time">0ms</span>
          </div>
          <div class="metric">
            <span class="label">Page Load:</span>
            <span class="value" id="load-time">0ms</span>
          </div>
        </div>
        <div class="perf-actions">
          <button class="perf-export">Export</button>
          <button class="perf-clear">Clear</button>
        </div>
      </div>
    `;

    // 添加样式
    const style = document.createElement('style');
    style.textContent = this.getPanelStyles();
    document.head.appendChild(style);

    // 添加事件监听
    this.setupEventListeners();

    document.body.appendChild(this.panel);
  }

  setupEventListeners() {
    const header = this.panel.querySelector('.perf-panel-header');
    const minimizeBtn = this.panel.querySelector('.perf-minimize');
    const toggleBtn = this.panel.querySelector('.perf-toggle');
    const exportBtn = this.panel.querySelector('.perf-export');
    const clearBtn = this.panel.querySelector('.perf-clear');

    // 拖拽功能
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      const rect = this.panel.getBoundingClientRect();
      startLeft = rect.left;
      startTop = rect.top;
      this.panel.style.cursor = 'move';
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;

      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;

      this.panel.style.left = Math.max(0, startLeft + deltaX) + 'px';
      this.panel.style.top = Math.max(0, startTop + deltaY) + 'px';
      this.panel.style.right = 'auto';
    });

    document.addEventListener('mouseup', () => {
      isDragging = false;
      this.panel.style.cursor = 'default';
    });

    // 控制按钮
    minimizeBtn.addEventListener('click', () => this.minimize());
    toggleBtn.addEventListener('click', () => this.toggle());
    exportBtn.addEventListener('click', () => this.monitor.exportData());
    clearBtn.addEventListener('click', () => this.clearData());
  }

  updateDisplay() {
    const stats = this.monitor.getStats();

    // 更新基本指标
    this.updateElement('interactions-count', stats.totalInteractions);

    // 错误计数
    const errorCount = this.monitor.interactions.filter(i => i.type === 'error').length;
    this.updateElement('errors-count', errorCount);

    // 点击计数
    const clickCount = this.monitor.interactions.filter(i => i.type === 'user_click').length;
    this.updateElement('clicks-count', clickCount);

    // 页面停留时间
    const pageLeave = this.getLatestMetric('page_leave');
    const duration = pageLeave ? Math.round(pageLeave.value / 1000) + 's' : '0s';
    this.updateElement('page-duration', duration);

    // 更新Core Web Vitals
    const latestINP = this.getLatestMetric('inp');
    const latestCLS = this.getLatestMetric('cls');
    const latestLCP = this.getLatestMetric('lcp');

    this.updateElement('inp-value', latestINP ? Math.round(latestINP.value) + 'ms' : '-', latestINP?.value, 'inp');
    this.updateElement('cls-value', latestCLS ? latestCLS.value.toFixed(3) : '-', latestCLS?.value, 'cls');
    this.updateElement('lcp-value', latestLCP ? Math.round(latestLCP.value) + 'ms' : '-', latestLCP?.value, 'lcp');

    // 网络指标
    const dnsTime = this.getLatestMetric('dns_lookup');
    const tcpTime = this.getLatestMetric('tcp_connect');
    const loadTime = this.getLatestMetric('page_load_time');

    this.updateElement('dns-time', dnsTime ? Math.round(dnsTime.value) + 'ms' : '0ms');
    this.updateElement('tcp-time', tcpTime ? Math.round(tcpTime.value) + 'ms' : '0ms');
    this.updateElement('load-time', loadTime ? Math.round(loadTime.value) + 'ms' : '0ms');
  }

  updateElement(id, text, value, metricType) {
    const element = document.getElementById(id);
    if (!element) return;

    element.textContent = text;

    // 移除旧的rating类
    element.classList.remove('good', 'needs-improvement', 'poor');

    // 添加新的rating类
    if (value !== undefined && metricType) {
      const rating = this.getRating(value, metricType);
      if (rating) {
        element.classList.add(rating);
      }
    }
  }

  getLatestMetric(type) {
    const metrics = this.monitor.interactions.filter(i => i.type === type);
    return metrics.length > 0 ? metrics[metrics.length - 1] : null;
  }

  getRating(value, type) {
    const thresholds = {
      inp: { good: 200, poor: 500 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      lcp: { good: 2500, poor: 4000 }
    };

    const t = thresholds[type];
    if (!t) return null;

    if (value <= t.good) return 'good';
    if (value <= t.poor) return 'needs-improvement';
    return 'poor';
  }

  minimize() {
    this.isMinimized = !this.isMinimized;
    const content = this.panel.querySelector('.perf-content');

    if (this.isMinimized) {
      content.style.display = 'none';
      this.panel.querySelector('.perf-minimize').textContent = '+';
    } else {
      content.style.display = 'block';
      this.panel.querySelector('.perf-minimize').textContent = '_';
    }
  }

  toggle() {
    this.isVisible = !this.isVisible;
    this.panel.style.display = this.isVisible ? 'block' : 'none';
  }

  clearData() {
    if (confirm('确定要清空所有性能数据吗？')) {
      this.monitor.clearData();
      this.updateDisplay();
    }
  }

  cleanup() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
    if (this.panel && this.panel.parentNode) {
      this.panel.parentNode.removeChild(this.panel);
    }
  }

  getPanelStyles() {
    return `
      #performance-dev-panel {
        position: fixed;
        top: 10px;
        right: 10px;
        width: 280px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, 'Courier New', monospace;
        font-size: 12px;
        border-radius: 8px;
        z-index: 9999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        user-select: none;
      }

      .perf-panel-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 12px;
        border-bottom: 1px solid #333;
        cursor: move;
      }

      .perf-panel-header h3 {
        margin: 0;
        font-size: 14px;
        font-weight: bold;
      }

      .perf-controls {
        display: flex;
        gap: 4px;
      }

      .perf-minimize, .perf-toggle, .perf-export, .perf-clear {
        background: #007bff;
        border: none;
        color: white;
        padding: 2px 6px;
        border-radius: 3px;
        cursor: pointer;
        font-size: 11px;
        line-height: 1;
      }

      .perf-minimize:hover, .perf-toggle:hover, .perf-export:hover, .perf-clear:hover {
        background: #0056b3;
      }

      .perf-content {
        padding: 12px;
      }

      .perf-metrics, .perf-core-vitals, .perf-network {
        margin-bottom: 12px;
      }

      .metric, .vital {
        display: flex;
        justify-content: space-between;
        margin-bottom: 4px;
      }

      .label {
        color: #ccc;
      }

      .value {
        font-weight: bold;
        color: #4CAF50;
      }

      .value.good { color: #4CAF50; }
      .value.needs-improvement { color: #FF9800; }
      .value.poor { color: #F44336; }

      .perf-actions {
        display: flex;
        gap: 8px;
      }

      .perf-export, .perf-clear {
        flex: 1;
        padding: 6px;
        font-size: 12px;
      }
    `;
  }
}