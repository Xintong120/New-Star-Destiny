export class GoogleAnalyticsReporter {
  constructor(measurementId) {
    this.measurementId = measurementId;
    this.isInitialized = false;
    this.initGA();
  }

  initGA() {
    if (this.isInitialized || !this.measurementId) return;

    // 检查是否已经加载了GA
    if (window.gtag) {
      this.isInitialized = true;
      return;
    }

    // 动态加载Google Analytics
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
    script.onload = () => {
      this.isInitialized = true;
      this.configureGA();
    };
    script.onerror = () => {
      console.warn('Failed to load Google Analytics');
    };

    document.head.appendChild(script);

    // 初始化gtag
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    this.configureGA();
  }

  configureGA() {
    if (window.gtag) {
      gtag('js', new Date());
      gtag('config', this.measurementId, {
        // 自定义参数
        custom_map: {
          'metric_rating': 'metric_rating',
          'metric_value': 'metric_value',
          'metric_type': 'metric_type'
        }
      });
    }
  }

  report(data) {
    if (!this.isInitialized || !window.gtag) {
      console.warn('Google Analytics not initialized, skipping report');
      return;
    }

    try {
      // 发送自定义事件到GA4
      gtag('event', `web_vitals_${data.type}`, {
        event_category: 'Web Vitals',
        event_label: data.target?.tagName || 'unknown',
        value: Math.round(data.value),
        custom_parameters: {
          metric_rating: data.rating || 'unknown',
          metric_value: data.value,
          metric_type: data.type,
          interaction_type: data.interactionType || 'unknown',
          page_url: data.url,
          timestamp: data.timestamp
        }
      });

      // 开发环境下输出日志
      if (process.env.NODE_ENV === 'development') {
        console.log(`[GA Report] ${data.type}: ${data.value} (${data.rating})`);
      }
    } catch (error) {
      console.error('Failed to report to Google Analytics:', error);
    }
  }

  // 批量上报
  reportBatch(interactions) {
    interactions.forEach(interaction => {
      this.report(interaction);
    });
  }

  // 检查GA是否可用
  isAvailable() {
    return this.isInitialized && window.gtag;
  }
}

// 开发环境控制台上报器
export class ConsoleReporter {
  report(data) {
    const emoji = this.getRatingEmoji(data.rating);
    console.log(
      `%c${emoji} [${data.type.toUpperCase()}] ${data.value}${this.getUnit(data.type)} (${data.rating})`,
      this.getLogStyle(data.rating),
      {
        target: data.target,
        url: data.url,
        timestamp: new Date(data.timestamp).toLocaleString()
      }
    );
  }

  getRatingEmoji(rating) {
    switch (rating) {
      case 'good': return '✅';
      case 'needs-improvement': return '⚠️';
      case 'poor': return '❌';
      default: return '❓';
    }
  }

  getUnit(type) {
    switch (type) {
      case 'cls': return '';
      case 'inp':
      case 'fid':
      case 'lcp':
      case 'fcp':
      case 'ttfb': return 'ms';
      default: return '';
    }
  }

  getLogStyle(rating) {
    switch (rating) {
      case 'good': return 'color: #4CAF50; font-weight: bold;';
      case 'needs-improvement': return 'color: #FF9800; font-weight: bold;';
      case 'poor': return 'color: #F44336; font-weight: bold;';
      default: return 'color: #9E9E9E; font-weight: bold;';
    }
  }
}

// 复合上报器 - 同时上报到多个地方
export class CompositeReporter {
  constructor(reporters = []) {
    this.reporters = reporters;
  }

  addReporter(reporter) {
    this.reporters.push(reporter);
  }

  report(data) {
    this.reporters.forEach(reporter => {
      try {
        reporter.report(data);
      } catch (error) {
        console.error('Reporter error:', error);
      }
    });
  }

  reportBatch(interactions) {
    this.reporters.forEach(reporter => {
      try {
        if (reporter.reportBatch) {
          reporter.reportBatch(interactions);
        } else {
          interactions.forEach(data => reporter.report(data));
        }
      } catch (error) {
        console.error('Batch reporter error:', error);
      }
    });
  }
}