# 运限计算模块

## 文件结构

### types/
- `base.ts` - 基础类型定义（命盘、宫位、星曜接口）
- `calculator.ts` - 计算器相关类型（大限、流年、流月等信息接口）
- `analyzer.ts` - 分析器相关类型（运限分析结果接口）
- `manager.ts` - 管理器相关类型（运限选择、列表管理接口）
- `index.ts` - 类型统一导出文件

### calculators/
- `constants.ts` - 常量定义（天干、地支、宫位名称等）
- `utils.ts` - 工具函数（修正索引、四化星获取等）
- `DecadalCalculator.ts` - 大限计算器
- `YearlyCalculator.ts` - 流年计算器
- `MonthlyCalculator.ts` - 流月计算器
- `DailyCalculator.ts` - 流日计算器
- `HourlyCalculator.ts` - 流时计算器
- `index.ts` - 主计算器入口（HoroscopeCalculator类）

### managers/
- `index.ts` - 运限管理器（HoroscopeManager类，提供列表管理功能）

### 根目录
- `index.ts` - 模块统一导出文件
- `README.md` - 模块说明文档
