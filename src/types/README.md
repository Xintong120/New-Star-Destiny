# 类型定义

这个目录用于存放 TypeScript 类型定义文件，按照功能模块组织。

## 文件结构说明

### 根级别文件

- **`Person.ts`** - 个人信息接口定义
  - `PersonInfo`: 包含姓名、性别、生日时间等基本信息，以及计算后的五行局、四柱、生肖等衍生信息

- **`index.ts`** - 类型统一导出文件
  - 导出所有子模块的类型，方便统一导入

### astrolabe/ - 紫微斗数相关类型

- **`LifePalaceInfo.ts`** - 命宫计算结果类型
  - `LifePalaceInfo`: 命宫索引、天干、地支信息

- **`PalaceStar.ts`** - 宫位星曜信息类型
  - `PalaceStar`: 星曜名称、亮度、四化等信息

- **`SoulAndBodyInfo.ts`** - 命主身主信息类型
  - `SoulAndBodyInfo`: 命主、身主、身宫索引

- **`Palace.ts`** - 宫位接口类型
  - `Palace`: 宫位名称、天干地支、是否身宫、主星、辅星等完整信息

- **`index.ts`** - astrolabe 类型统一导出

### date/ - 日期相关类型

- **`DateOptions.ts`** - 日期配置选项
  - `DateOptions`: 阳历/农历日期类型选择

- **`GanzhiOptions.ts`** - 天干地支分界选项
  - `GanzhiBoundaryOptions`: 年月分界的精确/正常模式

- **`GanZhiResult.ts`** - 天干地支计算结果
  - `GanZhiResult`: 年月日时干支数组

- **`HeavenlyStemAndEarthlyBranchDate.ts`** - 天干地支日期接口
  - `HeavenlyStemAndEarthlyBranchDate`: 完整的干支日期结构

- **`LunarDate.ts`** - 农历日期接口
  - `LunarDate`: 农历年月日信息

- **`index.ts`** - date 类型统一导出

### age/ - 年龄相关类型

- **`AgeTypes.ts`** - 年龄计算相关类型
  - `AgeCalculationMethod`: 年龄计算方法
  - `DecadalMethod`: 大限计算方法
  - `HoroscopeInfo`: 流年信息类型

## 使用方式

```typescript
// 统一导入所有类型
import type { PersonInfo, Palace, GanZhiResult } from '../types';

// 或从具体模块导入
import type { LifePalaceInfo } from '../types/astrolabe';
import type { DateOptions } from '../types/date';
