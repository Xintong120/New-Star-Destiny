import { createApp } from 'vue';
import App from './App.vue';
import { initPerformanceMonitoring } from './lib/monitoring/index.js';
import './styles/main.css';

// 性能监控初始化
const performanceMonitor = initPerformanceMonitoring({
  // Google Analytics Measurement ID (生产环境)
  gaMeasurementId: import.meta.env.VITE_GA_MEASUREMENT_ID,

  // 开发环境启用面板和控制台输出
  enableDevPanel: import.meta.env.DEV,
  enableConsoleReporter: import.meta.env.DEV,

  // 其他配置
  maxRecords: 1000
});

// 创建Vue应用
const app = createApp(App);

// 在开发环境下将监控实例挂载到window，方便调试
if (import.meta.env.DEV) {
  window.performanceMonitor = performanceMonitor;
}

app.mount('#app');
