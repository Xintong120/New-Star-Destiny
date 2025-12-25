# 辅星计算模块 (Minor Stars Calculator)

紫微斗数辅星位置计算模块，包含9个主要的辅星计算器。

## 目录结构

```
src/lib/stars/minor/
├── types.ts                 # 类型定义
├── index.ts                 # 统一导出
├── KuiYue.ts               # 天魁天钺计算器
├── ZuoYou.ts               # 左辅右弼计算器
├── ChangQu.ts              # 文昌文曲计算器
├── GuGua.ts                # 孤辰寡宿计算器
├── HuoLing.ts              # 火星铃星计算器
├── KongJie.ts              # 地空地劫计算器
├── LuYangTuoMa.ts          # 禄羊陀马计算器
├── BrightnessCalculator.ts # 辅星亮度计算器
├── PeachBlossomStars.ts    # 桃花星系计算器
├── DoctorTwelve.ts         # 博士十二神计算器
└── README.md               # 模块说明
```

## 文件说明

### 核心类型定义
- **`types.ts`** - 辅星计算相关类型定义
  - `HeavenlyStemName` - 天干名称类型
  - `EarthlyBranchName` - 地支名称类型

### 统一导出
- **`index.ts`** - 模块统一导出文件
  - 导出所有类型和计算函数
  - 支持按需导入和整体导入

### 辅星计算器

#### 天魁天钺系列
- **`KuiYue.ts`** - 天魁天钺位置计算
  - 根据天干计算天魁天钺星曜位置
  - 返回天魁和天钺的宫位索引

#### 文昌文曲系列
- **`ChangQu.ts`** - 文昌文曲位置计算
  - 根据时辰计算文昌文曲位置（按时支）
  - 根据天干计算流昌流曲位置（大限/流年用）
  - 返回文昌和文曲的宫位索引

#### 左辅右弼系列
- **`ZuoYou.ts`** - 左辅右弼位置计算
  - 根据农历月份计算左辅右弼位置
  - 辰上顺正寻左辅，戌上逆正右弼当
  - 返回左辅和右弼的宫位索引

#### 火星铃星系列
- **`HuoLing.ts`** - 火星铃星位置计算
  - 根据农历月份计算火星铃星位置
  - 火星从卯宫顺数，铃星从酉宫逆数
  - 返回火星和铃星的宫位索引

#### 地空地劫系列
- **`KongJie.ts`** - 地空地劫位置计算
  - 根据年干计算地空地劫位置
  - 地空从亥宫逆数，地劫从巳宫顺数
  - 返回地空和地劫的宫位索引

#### 孤辰寡宿系列
- **`GuGua.ts`** - 孤辰寡宿位置计算
  - 根据年支计算孤辰寡宿位置
  - 基于地支三合局分组规律
  - 返回孤辰和寡宿的宫位索引

#### 禄羊陀马系列
- **`LuYangTuoMa.ts`** - 禄羊陀马位置计算
  - 根据年支计算禄存、羊刃、陀罗、火星位置
  - 禄存按天干禄位计算，羊刃为对宫
  - 返回四星的宫位索引

#### 辅星亮度系列
- **`BrightnessCalculator.ts`** - 辅星亮度计算
  - 提供辅星的庙旺得利平不陷亮度查询
  - 仅6个辅星有亮度数据：文昌、文曲、火星、铃星、擎羊、陀罗
  - 其他辅星（左辅、右弼、天魁、天钺、禄存、天马、地空、地劫等）无亮度数据
  - 返回亮度值或空字符串
  - `GetMinorStarBrightness()`: 获取单个辅星亮度
  - `HasMinorStarBrightness()`: 检查辅星是否有亮度数据
  - `GetMinorStarsWithBrightness()`: 获取所有有亮度数据的辅星列表
  - `GetMinorStarBrightnessDistribution()`: 获取辅星在所有宫位的亮度分布

#### 桃花星系列
- **`PeachBlossomStars.ts`** - 桃花星位置计算
  - 根据年支计算桃花星位置
  - 从卯宫开始顺数计算
  - 返回桃花星的宫位索引

#### 博士系列
- **`DoctorTwelve.ts`** - 博士十二神位置计算
  - 根据时支计算博士位置
  - 从寅宫开始顺数计算
  - 返回博士的宫位索引

## 使用方法

### 整体导入
```typescript
import { GetKuiYueIndex, GetZuoYouIndex } from '@/lib/stars/minor';
```

### 按需导入
```typescript
import { GetKuiYueIndex } from '@/lib/stars/minor/KuiYue';
import { GetZuoYouIndex } from '@/lib/stars/minor/ZuoYou';
```

### 类型导入
```typescript
import type { KuiYuePosition, ZuoYouPosition } from '@/lib/stars/minor';
```

## 计算结果

所有计算器返回的都是宫位索引（0-11），对应12宫位置：
- 0: 子宫, 1: 丑宫, 2: 寅宫, 3: 卯宫, 4: 辰宫, 5: 巳宫
- 6: 午宫, 7: 未宫, 8: 申宫, 9: 酉宫, 10: 戌宫, 11: 亥宫

## 核心算法流程

```
输入参数 (天干/地支/月份/时辰)
    ↓
参数验证 + 类型转换
    ↓
GetKuiYueIndex → 天魁天钺位置 (天干)
GetZuoYouIndex → 左辅右弼位置 (农历月份)
GetChangQuIndex → 文昌文曲位置 (时辰)
GetGuGuaIndex → 孤辰寡宿位置 (年支)
GetHuoLingIndex → 火星铃星位置 (农历月份)
GetKongJieIndex → 地空地劫位置 (年干)
GetLuYangTuoMaIndex → 禄羊陀马位置 (年支)
GetPeachBlossomIndex → 桃花星位置 (年支)
GetDoctorTwelveIndex → 博士位置 (时支)
    ↓
返回宫位索引 (0-11) → 完整辅星分布
```

