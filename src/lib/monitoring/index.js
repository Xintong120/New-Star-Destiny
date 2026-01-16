import { PerformanceMonitor } from './performance-monitor.js';
import { WebVitalsAdapter } from './web-vitals-adapter.js';
import { ErrorCollector } from './error-collector.js';
import { UserBehaviorTracker } from './user-behavior-tracker.js';
import { LifecycleMonitor } from './lifecycle-monitor.js';
import { Logger } from './logger.js';
import { GoogleAnalyticsReporter, ConsoleReporter, CompositeReporter } from './reporter.js';

/**
 * 初始化性能监控系统
 * @param {Object} options - 配置选项
 * @param {string} options.gaMeasurementId - Google Analytics Measurement ID
 * @param {boolean} options.enableDevPanel - 是否启用开发面板
 * @param {boolean} options.enableConsoleReporter - 是否启用控制台输出
 * @param {boolean} options.enableErrorCollection - 是否启用异常收集
 * @param {boolean} options.enableUserBehaviorTracking - 是否启用用户行为跟踪
 * @param {boolean} options.enableLifecycleMonitoring - 是否启用生命周期监控
 * @param {boolean} options.enableLogging - 是否启用日志收集
 * @param {number} options.maxRecords - 最大记录数
 * @param {string} options.storageKey - 本地存储键名
 * @returns {PerformanceMonitor} 监控实例
 */
export function initPerformanceMonitoring(options = {}) {
  // 创建上报器
  const reporters = [];

  // Google Analytics 上报器
  if (options.gaMeasurementId) {
    reporters.push(new GoogleAnalyticsReporter(options.gaMeasurementId));
  }

  // 开发环境控制台输出
  if (options.enableConsoleReporter !== false &&
      (process.env.NODE_ENV === 'development' || options.enableConsoleReporter)) {
    reporters.push(new ConsoleReporter());
  }

  // 复合上报器
  const reporter = reporters.length > 0 ? new CompositeReporter(reporters) : null;

  // 创建监控实例
  const monitor = new PerformanceMonitor({
    ...options,
    reporter,
    enableDevPanel: options.enableDevPanel !== false
  });

  // 初始化Web Vitals适配器
  const webVitals = new WebVitalsAdapter(monitor);
  webVitals.init();

  // 初始化异常收集器
  if (options.enableErrorCollection !== false) {
    const errorCollector = new ErrorCollector(monitor);
    errorCollector.init();
    monitor.errorCollector = errorCollector;
  }

  // 初始化用户行为跟踪器
  if (options.enableUserBehaviorTracking !== false) {
    const userBehaviorTracker = new UserBehaviorTracker(monitor);
    userBehaviorTracker.init();
    monitor.userBehaviorTracker = userBehaviorTracker;
  }

  // 初始化生命周期监控器
  if (options.enableLifecycleMonitoring !== false) {
    const lifecycleMonitor = new LifecycleMonitor(monitor);
    lifecycleMonitor.init();
    monitor.lifecycleMonitor = lifecycleMonitor;
  }

  // 初始化日志收集器
  if (options.enableLogging !== false) {
    const logger = new Logger(monitor);
    logger.init();
    monitor.logger = logger;
  }

  // 初始化开发面板 (只在开发环境下)
  if (options.enableDevPanel !== false && process.env.NODE_ENV === 'development') {
    // 动态导入DevPanel，只在开发环境加载
    import('./dev-panel.js').then(({ DevPanel }) => {
      const panel = new DevPanel(monitor);
      panel.init();

      // 将面板实例挂载到monitor上，方便调试
      monitor.devPanel = panel;
    }).catch(error => {
      console.warn('Failed to load DevPanel:', error);
    });
  }

  return monitor;
}

// 导出所有类，方便高级用法
export {
  PerformanceMonitor,
  WebVitalsAdapter,
  ErrorCollector,
  UserBehaviorTracker,
  LifecycleMonitor,
  Logger,
  GoogleAnalyticsReporter,
  ConsoleReporter,
  CompositeReporter
};

// 默认导出初始化函数
export default initPerformanceMonitoring;