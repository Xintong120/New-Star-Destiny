# 主星计算模块 (Major Stars Calculation Module)

紫微斗数14颗主星（紫微星系 + 天府星系）计算模块

## 目录结构

```
src/lib/stars/major/
├── constants.ts              # 常量定义（五行局映射、星耀序列）
├── types.ts                  # 类型定义（主星分布结果类型）
├── utils.ts                  # 工具函数（索引循环修正）
├── ziwei-calculator.ts       # 紫微星定位计算器
├── tianfu-calculator.ts      # 天府星定位计算器
├── distribution-calculator.ts # 主星分布计算器
├── index.ts                  # 统一导出接口
└── README.md                 # 模块文档
```

## 文件作用说明

### **constants.ts** - 常量定义
- `FiveElementsValues`: 五行局数值映射表（水二局=2，木三局=3等）
- `ZiweiStarSequence`: 紫微星系6颗主星的排列顺序
- `TianfuStarSequence`: 天府星系8颗主星的排列顺序

### **types.ts** - 类型定义
- `MajorStarDistribution`: 主星分布结果类型（12宫位数组，每个宫位包含星曜名称数组）

### **utils.ts** - 工具函数
- `FixIndex`: 修正索引到0-11范围内（12宫循环），用于紫微斗数宫位计算

### **ziwei-calculator.ts** - 紫微星定位计算器
- `CalculateZiweiIndex`: 计算紫微星在12宫中的位置索引
- 核心算法：根据农历日期和五行局计算紫微星起始位置

### **tianfu-calculator.ts** - 天府星定位计算器
- `CalculateTianfuIndex`: 计算天府星在12宫中的位置索引
- 算法规则：天府星与紫微星相对（相差6宫）

### **distribution-calculator.ts** - 主星分布计算器
- `CalculateMajorStarDistribution`: 计算14颗主星在12宫的完整分布
- `PlaceZiweiStars`: 安置紫微星系主星（逆时针分布）
- `PlaceTianfuStars`: 安置天府星系主星（顺时针分布）

### **index.ts** - 统一导出接口
- 导出所有类型、常量、工具函数和计算器
- `GetMajorStarInfo`: 获取模块信息和元数据

## 核心算法流程

```
农历日期 + 五行局
    ↓
CalculateZiweiIndex → 紫微星位置
    ↓
CalculateTianfuIndex → 天府星位置
    ↓
PlaceZiweiStars + PlaceTianfuStars
    ↓
CalculateMajorStarDistribution → 完整主星分布
```

## 主星列表

### 紫微星系（6颗，逆时针分布）
1. 紫微 (Ziwei) - 帝王星，紫微垣之主
2. 天机 (Tianji) - 智慧星，谋略运筹
3. 太阳 (Taiyang) - 光明星，事业成就
4. 武曲 (Wuqu) - 财富星，财运亨通
5. 天同 (Tiantong) - 和谐星，人际关系
6. 廉贞 (Lianzhen) - 才华星，艺术创造

### 天府星系（8颗，顺时针分布）
1. 天府 (Tianfu) - 宰相星，紫微垣辅弼
2. 太阴 (Taiyin) - 月亮星，柔美内敛
3. 贪狼 (Tanlang) - 桃花星，魅力异性缘
4. 巨门 (Jumen) - 口舌星，表达沟通
5. 天相 (Tianxiang) - 贵人星，帮扶助力
6. 天梁 (Tianliang) - 栋梁星，稳重可靠
7. 七杀 (Qisha) - 权柄星，权威决断
8. 破军 (PoJun) - 冲锋星，行动力强
