// 使用本地安装的web-vitals包 (npm install web-vitals)
// 注意：FID已被INP替代，不再需要getFID
import { onCLS, onLCP, onFCP, onTTFB, onINP } from 'web-vitals';

export class WebVitalsAdapter {
  constructor(monitor) {
    this.monitor = monitor;
  }

  init() {
    try {
      // 创建统一的报告函数
      const reportMetric = (metric) => {
        // web-vitals返回的metric对象包含: {name, value, rating, delta, id, entries}
        this.monitor.recordInteraction({
          type: metric.name.toLowerCase(), // 'cls', 'fid', 'lcp', etc.
          value: metric.value,
          rating: metric.rating,
          target: { tagName: 'document', id: 'page' },
          interactionType: 'page',
          id: metric.id // 用于标识唯一页面加载
        });
      };

      // 初始化各个指标监控
      // FID已被INP替代，不再单独监控
      onCLS(reportMetric);
      onLCP(reportMetric);
      onFCP(reportMetric);
      onTTFB(reportMetric);

      // INP 监控 (包含了FID的功能)
      onINP(reportMetric);

      console.log('Web Vitals monitoring initialized');
    } catch (error) {
      console.warn('Failed to initialize web-vitals:', error);
    }
  }

  getRating(metricName, value) {
    // Core Web Vitals 评分标准
    const thresholds = {
      cls: { good: 0.1, poor: 0.25 },
      fid: { good: 100, poor: 300 },
      lcp: { good: 2500, poor: 4000 },
      fcp: { good: 1800, poor: 3000 },
      ttfb: { good: 800, poor: 1800 },
      inp: { good: 200, poor: 500 }
    };

    const t = thresholds[metricName.toLowerCase()];
    if (!t) return 'unknown';

    if (value <= t.good) return 'good';
    if (value <= t.poor) return 'needs-improvement';
    return 'poor';
  }

  // 获取性能评分
  getRating(value, thresholds) {
    if (value <= thresholds.good) return 'good';
    if (value <= thresholds.needsImprovement) return 'needs-improvement';
    return 'poor';
  }
}

// Core Web Vitals 阈值定义
export const CORE_WEB_VITALS_THRESHOLDS = {
  inp: {
    good: 200,      // <= 200ms
    needsImprovement: 500  // <= 500ms
  },
  fid: {
    good: 100,
    needsImprovement: 300
  },
  cls: {
    good: 0.1,      // <= 0.1
    needsImprovement: 0.25
  },
  lcp: {
    good: 2500,     // <= 2.5s
    needsImprovement: 4000
  },
  fcp: {
    good: 1800,     // <= 1.8s
    needsImprovement: 3000
  },
  ttfb: {
    good: 800,      // <= 800ms
    needsImprovement: 1800
  }
};