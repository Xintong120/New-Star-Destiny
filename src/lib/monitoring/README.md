# 前端监控体系

这是一个完整的前端监控解决方案，基于Google Core Web Vitals和用户行为分析，支持GitHub Pages等静态部署环境，通过GA4进行数据上报和分析。

## 功能特性

### 已实现功能
- **Core Web Vitals监控**: INP、CLS、LCP、FCP、TTFB实时收集
- **异常监控**: JS错误、Promise拒绝、网络请求失败自动捕获
- **用户行为跟踪**: PV/UV、点击事件、页面停留时间、滚动深度、页面来源
- **生命周期监控**: PerformanceTiming数据收集、HTTP请求测速
- **日志系统**: 全局日志API、本地缓冲自动上报
- **Google Analytics 4上报**: 多数据类型自动映射为GA4事件
- **开发面板**: 实时可视化面板显示所有监控数据
- **本地存储**: IndexedDB兼容的持久化存储
- **控制台输出**: 开发环境彩色日志输出
- **生产环境优化**: 开发工具自动排除，压缩包体积

### 监控指标

| 指标 | 描述 | 良好阈值 | 需要改进阈值 |
|------|------|----------|--------------|
| **INP** | 首次输入延迟 | ≤200ms | ≤500ms |
| **CLS** | 累积布局偏移 | ≤0.1 | ≤0.25 |
| **LCP** | 最大内容绘制 | ≤2500ms | ≤4000ms |
| **FCP** | 首次内容绘制 | ≤1800ms | ≤3000ms |
| **TTFB** | 首字节时间 | ≤800ms | ≤1800ms |
| **DNS时间** | 域名解析耗时 | ≤100ms | ≤200ms |
| **TCP连接** | TCP握手耗时 | ≤100ms | ≤200ms |
| **页面加载** | 完整页面加载时间 | ≤3000ms | ≤5000ms |

## 快速开始

### 1. 环境配置

在 `.env` 文件中配置Google Analytics:

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. 应用初始化

在 `src/main.js` 中已自动初始化，无需额外配置。

### 3. 开发环境

开发时会自动显示性能监控面板，位于右上角。

## 使用方法

### 开发环境功能

```javascript
// 访问全局监控实例
window.performanceMonitor

// 获取统计数据
window.performanceMonitor.getStats()

// 导出性能数据
window.performanceMonitor.exportData()

// 清空数据
window.performanceMonitor.clearData()
```

### 生产环境

生产环境自动上报数据到Google Analytics，无需额外操作。

## 架构设计

```
src/lib/monitoring/
├── index.js                 # 主入口，初始化和配置所有模块
├── performance-monitor.js   # 核心监控类，数据收集和存储
├── error-collector.js       # 异常监控模块，捕获JS错误和网络异常
├── user-behavior-tracker.js # 用户行为跟踪模块，PV/UV/点击/停留时间
├── lifecycle-monitor.js     # 生命周期监控模块，Performance API数据收集
├── logger.js               # 日志收集模块，全局API和本地缓冲
├── web-vitals-adapter.js   # Web Vitals适配器，官方库集成
├── reporter.js            # 上报器，GA4事件映射和控制台输出
├── dev-panel.js           # 开发面板，实时数据可视化
└── README.md              # 说明文档
```

## 技术实现

- **Web Vitals库**: 集成Google官方web-vitals库，自动收集Core Web Vitals指标
- **异常监听**: 通过window.onerror、unhandledrejection、资源加载错误事件捕获异常
- **用户行为跟踪**: 监听visibilitychange、click、scroll等DOM事件，生成sessionId跟踪用户路径
- **网络监控**: 使用PerformanceObserver监听资源加载，劫持XMLHttpRequest/Fetch API测速
- **日志系统**: 提供全局logger API，支持info/warn/error级别，localStorage缓冲
- **GA4事件映射**: 自动将监控数据转换为GA4自定义事件，支持实时分析
- **动态导入**: 开发面板等工具仅开发环境加载，生产构建自动tree-shaking
- **复合上报器**: 支持GA4、控制台等多渠道同步上报
- **本地存储**: localStorage持久化数据，支持离线队列和恢复

## 数据结构

```typescript
interface PerformanceData {
  id: string;
  type: 'inp' | 'cls' | 'lcp' | 'fcp' | 'ttfb' | 'error' | 'page_view' | 'user_click' | 'dns_lookup' | 'tcp_connect' | 'log' | string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  target: {
    tagName: string;
    className?: string;
    id?: string;
    text?: string;
    href?: string;
    type?: string;
  };
  interactionType?: string;
  timestamp: number;
  url: string;
  userAgent: string;
  sessionId?: string;
  error?: {
    message: string;
    stack?: string;
    type: string;
  };
  log?: {
    level: 'info' | 'warn' | 'error' | 'fatal';
    message: string;
  };
  [key: string]: any; // 扩展字段
}
```

## 模块详细说明

### index.js - 主入口模块
**功能**: 系统初始化和配置管理
**实现方式**:
- 提供`initPerformanceMonitoring(options)`函数，支持配置各模块开关
- 按条件初始化ErrorCollector、UserBehaviorTracker、LifecycleMonitor、Logger模块
- 集成WebVitalsAdapter初始化Core Web Vitals监控
- 支持GA4配置和开发面板动态加载

### performance-monitor.js - 核心监控类
**功能**: 数据收集、存储和管理
**实现方式**:
- `recordInteraction(data)`: 统一数据记录接口
- 本地存储管理，支持数据持久化和清理
- 统计计算（INP平均值、最大值、百分位数等）
- 导出功能，支持JSON格式数据导出

### error-collector.js - 异常监控模块
**功能**: 捕获和上报各类JavaScript异常
**实现方式**:
- `window.onerror`: 监听同步JS错误，收集错误信息、堆栈、位置
- `unhandledrejection`: 捕获未处理的Promise拒绝
- 资源加载错误监听: 捕获图片、脚本等资源加载失败
- XMLHttpRequest/Fetch劫持: 监听网络请求错误（4xx/5xx状态码）
- 数据格式化后通过`monitor.recordInteraction`上报

### user-behavior-tracker.js - 用户行为跟踪模块
**功能**: 跟踪用户在页面中的行为模式
**实现方式**:
- 页面可见性监听: 记录PV、页面返回、离开时间
- 点击事件监听: 捕获用户点击，记录元素信息和位置
- 滚动深度跟踪: 每25%滚动深度记录一次
- 页面来源记录: 存储document.referrer信息
- SessionId生成: 使用时间戳+随机数标识用户会话
- 提供`trackCustomEvent()`API支持自定义事件

### lifecycle-monitor.js - 生命周期监控模块
**功能**: 收集页面加载和网络性能数据
**实现方式**:
- PerformanceTiming API: 收集DNS查询、TCP连接、SSL握手时间
- 页面加载时间计算: DOM解析时间、内容加载时间
- PerformanceObserver: 监听资源加载性能（图片、脚本等）
- XMLHttpRequest劫持: 记录XHR请求耗时和状态
- Fetch API劫持: 记录Fetch请求性能数据

### logger.js - 日志收集模块
**功能**: 提供全局日志API和本地缓冲上报
**实现方式**:
- 提供`log(level, message, extra)`核心方法
- 便捷方法: `info()`, `warn()`, `error()`, `fatal()`
- 本地存储缓冲: 自动保存到localStorage，容量限制1000条
- 自动上报: 30秒间隔批量上报，非error级别日志立即上报
- 页面卸载强制上报: beforeunload事件触发数据发送

### web-vitals-adapter.js - Web Vitals适配器
**功能**: 集成Google Web Vitals官方库
**实现方式**:
- 使用`onCLS`、`onLCP`、`onFCP`、`onTTFB`、`onINP`监听器
- 数据标准化: 转换为统一格式后通过monitor.recordInteraction上报
- 评分标准: 基于Google官方阈值计算good/needs-improvement/poor

### reporter.js - 上报器模块
**功能**: 数据上报到GA4和控制台
**实现方式**:
- GoogleAnalyticsReporter: 动态加载GA4脚本，配置自定义参数
- 事件映射: 根据数据类型自动转换为合适的GA4事件名称和类别
- ConsoleReporter: 彩色控制台输出，支持不同级别颜色区分
- CompositeReporter: 支持多上报器同时工作

### dev-panel.js - 开发面板模块
**功能**: 实时数据显示和调试工具
**实现方式**:
- DOM创建面板: 使用HTML字符串构建面板结构
- 实时更新: 每秒刷新显示最新统计数据
- 拖拽功能: 实现面板位置调整
- 控制按钮: 最小化、隐藏、导出、清空数据功能
- 样式系统: 内嵌CSS，支持不同数据类型的颜色标识

## 扩展开发

### 添加新的监控指标

```javascript
// 在任意模块中添加新指标收集
this.monitor.recordInteraction({
  type: 'custom_metric',
  value: calculatedValue,
  target: { tagName: 'custom' },
  interactionType: 'metric'
});
```

### 添加新的上报渠道

```javascript
// 在reporter.js中实现新上报器
export class SentryReporter {
  constructor(dsn) {
    this.dsn = dsn;
    // 初始化Sentry SDK
  }

  report(data) {
    // Sentry上报逻辑
    if (data.type === 'error') {
      Sentry.captureException(new Error(data.error.message));
    }
  }
}
```

### 自定义埋点

```javascript
// 使用内置API
window.performanceMonitor.userBehaviorTracker.trackCustomEvent('button_click', {
  buttonId: 'submit',
  page: 'checkout'
});

// 或使用Logger
window.performanceMonitor.logger.info('User completed purchase', {
  amount: 99.99,
  currency: 'USD'
});
```

## 配置选项

```javascript
initPerformanceMonitoring({
  gaMeasurementId: 'G-XXXXXXXXXX',        // GA4 Measurement ID
  enableDevPanel: true,                   // 开发面板 (仅开发环境)
  enableConsoleReporter: true,           // 控制台输出 (仅开发环境)
  enableErrorCollection: true,           // 异常监控
  enableUserBehaviorTracking: true,      // 用户行为跟踪
  enableLifecycleMonitoring: true,       // 生命周期监控
  enableLogging: true,                   // 日志系统
  maxRecords: 1000                       // 本地存储最大记录数
});
```

## 注意事项

1. **生产环境**: 确保配置正确的GA4 Measurement ID，数据24小时后在GA4生效
2. **隐私保护**: 收集的数据不包含敏感个人信息，符合GDPR要求
3. **性能影响**: 监控系统本身对应用性能的影响极小(< 2KB gzipped)
4. **浏览器兼容**: 支持所有现代浏览器，不支持IE11以下版本
5. **数据存储**: 本地存储容量限制，自动清理过期数据
6. **GitHub Pages**: 无服务器依赖，完全静态部署友好

## 故障排除

### 常见问题

**Q: 开发面板不显示**
A: 确认在开发环境运行 (`npm run dev`)，检查控制台是否有加载错误

**Q: GA4数据不显示**
A: 检查Measurement ID配置正确，等待24小时数据处理，确保网络正常

**Q: 控制台无输出**
A: 检查浏览器是否支持Performance API，确认enableConsoleReporter为true

**Q: 异常数据未收集**
A: 检查浏览器控制台权限，确认Content Security Policy不阻止脚本错误监听

**Q: 用户行为数据为空**
A: 检查页面是否有CSP限制事件监听，确认用户未禁用JavaScript

**Q: 网络监控数据缺失**
A: 检查是否使用了跨域请求，确认Fetch/XMLHttpRequest被正确劫持

## 贡献指南

1. 遵循现有代码风格
2. 添加必要的测试
3. 更新此README文档
4. 提交PR前进行构建测试

---

**最后更新**: 2026-01-16