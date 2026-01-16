# 性能监控系统

这是一个用于监控Web应用性能的完整解决方案，特别是针对Google Core Web Vitals指标的实时监控。

## 功能特性

### 已实现功能
- **Core Web Vitals监控**: INP、CLS、LCP、FCP、TTFB
- **Google Analytics 4上报**: 自动发送性能数据到GA4
- **开发面板**: 实时性能数据可视化面板
- **本地存储**: 持久化性能数据
- **控制台输出**: 开发时性能指标实时显示
- **生产环境优化**: 开发工具自动排除在生产构建之外

### 监控指标

| 指标 | 描述 | 良好阈值 | 需要改进阈值 |
|------|------|----------|--------------|
| **INP** | 首次输入延迟 | ≤200ms | ≤500ms |
| **CLS** | 累积布局偏移 | ≤0.1 | ≤0.25 |
| **LCP** | 最大内容绘制 | ≤2500ms | ≤4000ms |
| **FCP** | 首次内容绘制 | ≤1800ms | ≤3000ms |
| **TTFB** | 首字节时间 | ≤800ms | ≤1800ms |

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
├── index.js              # 主入口，初始化逻辑
├── performance-monitor.js # 核心监控类
├── web-vitals-adapter.js # Web Vitals适配器
├── reporter.js          # 上报器 (GA4 + 控制台)
├── dev-panel.js         # 开发面板 (仅开发环境)
└── README.md            # 说明文档
```

## 技术实现

- **Web Vitals库**: 使用Google官方web-vitals库
- **动态导入**: 生产构建自动排除开发工具
- **复合上报器**: 支持多渠道数据上报
- **本地存储**: IndexedDB兼容的存储方案

## 数据结构

```typescript
interface PerformanceData {
  type: 'inp' | 'cls' | 'lcp' | 'fcp' | 'ttfb';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  target: {
    tagName: string;
    className: string;
    id: string;
    text: string;
  };
  timestamp: number;
  url: string;
  id: string;
}
```

## 扩展开发

### 添加新的监控指标

```javascript
// 在web-vitals-adapter.js中添加
onCustomMetric((metric) => {
  this.monitor.recordInteraction({
    type: 'custom',
    value: metric.value,
    // ...
  });
});
```

### 添加新的上报渠道

```javascript
// 在reporter.js中实现新上报器
export class CustomReporter {
  report(data) {
    // 自定义上报逻辑
  }
}
```

## 注意事项

1. **生产环境**: 确保配置正确的GA4 Measurement ID
2. **隐私保护**: 所有数据收集符合隐私政策
3. **性能影响**: 监控系统本身对应用性能的影响极小(< 1KB)
4. **浏览器兼容**: 支持所有现代浏览器

## 故障排除

### 常见问题

**Q: 开发面板不显示**
A: 确认在开发环境运行 (`npm run dev`)

**Q: GA4数据不显示**
A: 检查Measurement ID配置，等待24小时数据处理

**Q: 控制台无输出**
A: 检查浏览器是否支持Performance API

## 贡献指南

1. 遵循现有代码风格
2. 添加必要的测试
3. 更新此README文档
4. 提交PR前进行构建测试

---

**最后更新**: 2026-01-16