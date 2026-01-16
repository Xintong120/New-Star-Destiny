export class Logger {
  constructor(monitor) {
    this.monitor = monitor;
    this.logs = [];
    this.maxLogs = 1000; // 本地缓冲最大日志数
    this.flushInterval = 30000; // 30秒自动上报
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;

    // 加载持久化日志
    this.loadPersistedLogs();

    // 设置自动上报间隔
    this.startAutoFlush();

    // 监听页面卸载时强制上报
    window.addEventListener('beforeunload', () => {
      this.flush();
    });

    console.log('Logger initialized');
  }

  log(level, message, extra = {}) {
    const logEntry = {
      id: Date.now() + Math.random(),
      level: level,
      message: message,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...extra
    };

    this.logs.push(logEntry);

    // 限制内存中的日志数量
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // 持久化存储
    this.persistLogs();

    // 立即上报错误级别日志
    if (level === 'error' || level === 'fatal') {
      this.flushLog(logEntry);
    }

    // 开发环境控制台输出
    if (process.env.NODE_ENV === 'development') {
      console.log(`[${level.toUpperCase()}] ${message}`, extra);
    }
  }

  info(message, extra = {}) {
    this.log('info', message, extra);
  }

  warn(message, extra = {}) {
    this.log('warn', message, extra);
  }

  error(message, extra = {}) {
    this.log('error', message, extra);
  }

  fatal(message, extra = {}) {
    this.log('fatal', message, extra);
  }

  // 手动刷新日志（上报所有缓冲日志）
  flush() {
    if (this.logs.length === 0) return;

    const logsToFlush = [...this.logs];
    this.logs = [];

    logsToFlush.forEach(logEntry => {
      this.flushLog(logEntry);
    });

    // 清空持久化存储
    this.clearPersistedLogs();
  }

  flushLog(logEntry) {
    // 通过性能监控器上报
    this.monitor.recordInteraction({
      type: 'log',
      value: 1,
      rating: this.getLogRating(logEntry.level),
      target: { tagName: 'logger' },
      interactionType: logEntry.level,
      log: logEntry
    });
  }

  getLogRating(level) {
    switch (level) {
      case 'info': return 'good';
      case 'warn': return 'needs-improvement';
      case 'error': return 'poor';
      case 'fatal': return 'poor';
      default: return 'unknown';
    }
  }

  startAutoFlush() {
    setInterval(() => {
      this.flush();
    }, this.flushInterval);
  }

  persistLogs() {
    try {
      localStorage.setItem('performance-logs', JSON.stringify(this.logs));
    } catch (e) {
      console.warn('Failed to persist logs:', e);
    }
  }

  loadPersistedLogs() {
    try {
      const persisted = localStorage.getItem('performance-logs');
      if (persisted) {
        this.logs = JSON.parse(persisted);
      }
    } catch (e) {
      console.warn('Failed to load persisted logs:', e);
    }
  }

  clearPersistedLogs() {
    localStorage.removeItem('performance-logs');
  }

  // 获取当前缓冲日志
  getLogs() {
    return [...this.logs];
  }

  // 清空日志
  clear() {
    this.logs = [];
    this.clearPersistedLogs();
  }

  // 导出日志
  exportLogs() {
    const dataStr = JSON.stringify(this.logs, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `logs-${Date.now()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  }
}