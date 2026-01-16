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
          'metric_type': 'metric_type',
          'error_type': 'error_type',
          'session_id': 'session_id',
          'interaction_type': 'interaction_type',
          'element_tag': 'element_tag',
          'page_duration': 'page_duration'
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
      // 根据数据类型确定事件类别和名称
      const eventConfig = this.getEventConfig(data);

      // 发送自定义事件到GA4
      gtag('event', eventConfig.name, {
        event_category: eventConfig.category,
        event_label: data.target?.tagName || 'unknown',
        value: Math.round(data.value) || 1,
        custom_parameters: {
          metric_rating: data.rating || 'unknown',
          metric_value: data.value,
          metric_type: data.type,
          interaction_type: data.interactionType || 'unknown',
          page_url: data.url,
          timestamp: data.timestamp,
          session_id: data.sessionId,
          error_type: data.error?.type,
          element_tag: data.target?.tagName,
          page_duration: data.duration
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

  getEventConfig(data) {
    const type = data.type;

    // Web Vitals
    if (['inp', 'cls', 'lcp', 'fcp', 'ttfb', 'fid'].includes(type)) {
      return {
        name: `web_vitals_${type}`,
        category: 'Web Vitals'
      };
    }

    // 异常
    if (type === 'error') {
      return {
        name: 'javascript_error',
        category: 'Errors'
      };
    }

    // 用户行为
    if (['page_view', 'page_leave', 'page_return', 'user_click', 'scroll_depth', 'page_referrer'].includes(type)) {
      return {
        name: `user_${type.replace('_', '_')}`,
        category: 'User Behavior'
      };
    }

    // 生命周期和网络
    if (['dns_lookup', 'tcp_connect', 'ssl_handshake', 'request_response', 'response_download',
         'page_load_time', 'dom_parsing', 'dom_content_loaded', 'resource_load',
         'xhr_request', 'fetch_request'].includes(type)) {
      return {
        name: `performance_${type}`,
        category: 'Performance'
      };
    }

    // 日志
    if (type === 'log') {
      return {
        name: `log_${data.interactionType}`,
        category: 'Logs'
      };
    }

    // 默认
    return {
      name: `custom_${type}`,
      category: 'Custom'
    };
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
      case 'error':
      case 'page_view':
      case 'page_leave':
      case 'page_return':
      case 'user_click':
      case 'scroll_depth':
      case 'page_referrer':
      case 'log': return '';
      case 'inp':
      case 'fid':
      case 'lcp':
      case 'fcp':
      case 'ttfb':
      case 'dns_lookup':
      case 'tcp_connect':
      case 'ssl_handshake':
      case 'request_response':
      case 'response_download':
      case 'page_load_time':
      case 'dom_parsing':
      case 'dom_content_loaded':
      case 'resource_load':
      case 'xhr_request':
      case 'fetch_request': return 'ms';
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