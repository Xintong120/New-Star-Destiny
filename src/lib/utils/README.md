# 工具函数模块

包含以下功能：

## 目录结构

```
src/lib/utils/
├── date/                    # 日期相关工具
│   ├── DateFormatter.ts     # 日期格式化工具
│   ├── SolarToLunarConverter.ts # 阳历转农历转换器
│   └── LunarToSolarConverter.ts # 农历转阳历转换器
├── ganzhi/                  # 天干地支相关工具
│   ├── GanzhiAnalysis.ts    # 分析工具（阴阳属性、距离计算）
│   ├── GanzhiCalculation.ts # 计算工具（年月日时干支）
│   ├── GanzhiConstants.ts   # 常量定义
│   ├── GanzhiString.ts      # 字符串处理
│   ├── GanzhiValidation.ts  # 验证工具
│   └── GanZhiCalculator.ts  # 主集成类
├── age/                     # 年龄和运限工具
│   ├── AgeCalculation.ts    # 基础年龄计算（虚岁、实岁）
│   ├── AgeLimit.ts          # 小限计算
│   ├── DecadalLimit.ts      # 大限计算
│   ├── ChildhoodLimit.ts    # 童限计算
│   └── HoroscopeInfo.ts     # 运限信息整合
├── person_info/             # 个人信息工具
│   ├── ZodiacCalculator.ts  # 生肖计算器
│   ├── ConstellationCalculator.ts # 星座计算器
│   ├── FiveElementsCalculator.ts # 五行计算器
│   └── index.ts             # 个人信息工具导出
├── index.ts                 # 统一导出索引
└── README.md               # 本文档
```

## 功能说明

### 日期转换
#### **阳历转农历**

将公历日期转换为农历日期信息

```mermaid

```
#### **农历转阳历**

将农历日期转换为公历日期

```mermaid

```
#### **日期格式化**

标准化日期字符串处理

```mermaid

```
### 干支计算
#### **年干支**：

根据出生年份计算年干支

```mermaid

```
#### **月干支**

根据年干支和农历月份计算月干支

```mermaid

```
#### **日干支**

根据阳历日期计算日干支

```mermaid

```
#### **时干支**

根据日干支和出生时辰计算时干支

```mermaid

```
### 干支分析
#### **阴阳属性分析**

判断干支的阴阳属性

```mermaid

```
#### **距离计算**

计算两个干支之间的距离

```mermaid

```
#### **五行属性**

干支对应的五行属性分析

```mermaid

```
### 年龄计算
#### **虚岁计算**

传统虚岁年龄计算

```mermaid
graph TD
    A[NominalAgeCalculator 类] --> B[CalculateNominalAge 方法]

    B --> C[输入参数验证]
    C --> D{计算方法?}

    D -->|birthday| E[生日界限计算]
    D -->|natural| F[自然年界限计算]

    E --> G[基础年龄 = 目标年 - 生日年]
    F --> G

    E --> H{是否过生日?}
    H -->|月份大于生日月| I[年龄 +1]
    H -->|月份等于生日月| J{日期 >= 生日日?}
    J -->|是| I
    J -->|否| K[年龄不变]

    F --> L[年龄 +1]

    I --> M[确保最小年龄 1]
    K --> M
    L --> M
    G --> M

    M --> N[返回虚岁]

    subgraph "虚岁计算逻辑"
        G
        H
        I
        J
        K
        L
        M
    end

    subgraph "输入参数"
        O[birthday: LunarDate<br/>targetDate: LunarDate<br/>method?: AgeCalculationMethod]
    end

    subgraph "输出结果"
        N
    end

    B -.-> O
    N -.-> P[虚岁结果]

```

#### **实岁计算**

实际年龄计算

```mermaid
graph TD
    A[ActualAgeCalculator 类] --> B[CalculateActualAge 方法]

    B --> C[输入参数验证]
    C --> D[基础年龄 = 目标年 - 生日年]

    D --> E{是否过生日?}
    E -->|月份小于生日月| F[年龄 -1]
    E -->|月份等于生日月| G{日期 < 生日日?}
    G -->|是| F
    G -->|否| H[年龄不变]

    F --> I[确保最小年龄 0]
    H --> I

    I --> J[返回实岁]

    subgraph "实岁计算逻辑"
        D
        E
        F
        G
        H
        I
    end

    subgraph "输入参数"
        K[birthday: LunarDate<br/>targetDate: LunarDate]
    end

    subgraph "输出结果"
        J
    end

    B -.-> K
    J -.-> L[实岁结果]

```
#### **小限计算**

十年小限的计算和分析

```mermaid
graph TD
    A[AgeLimit 类] --> B[getAgeStartIndex 方法]
    A --> C[getAgePalaceIndex 方法]
    A --> D[fixIndex 方法]
    A --> E[fixEarthlyBranchIndex 方法]

    B --> F[输入出生年地支]
    F --> G{地支所属三合局?}

    G -->|寅午戌 火局| H[返回辰宫索引]
    G -->|申子辰 水局| I[返回戌宫索引]
    G -->|巳酉丑 金局| J[返回未宫索引]
    G -->|亥卯未 木局| K[返回丑宫索引]
    G -->|无效地支| L[返回-1]

    C --> M[输入参数: 出生年地支/性别/虚岁]
    M --> N[调用getAgeStartIndex获取起始宫位索引]
    N --> B
    N --> O{起始索引有效?}
    O -->|无效| P[抛出错误]
    O -->|有效| Q[确定旋转方向]

    Q -->|男| R[顺时针]
    Q -->|女| S[逆时针]

    R --> T[计算年龄偏移]
    S --> T
    T --> U[计算最终宫位索引]
    U --> V[返回宫位索引]

    D --> W[索引循环修正]
    E --> X[地支转宫位索引]

    subgraph "三合局判断"
        G
        H
        I
        J
        K
    end

    subgraph "性别方向逻辑"
        Q
        R
        S
    end

    subgraph "索引计算"
        T
        U
        W
        X
    end

    subgraph "输入参数"
        Y["birthYearBranch: string\ngender: '男'或'女'\nnominalAge: number"]
        Z[birthYearBranch: string]
    end

    subgraph "输出结果"
        V
        L
    end

    B -.-> Z
    C -.-> Y
    V -.-> AA[小限宫位索引]
    L -.-> BB[起始宫位索引]

```

#### **大限计算**

十年大限的计算和分析

```mermaid

```

#### **童限计算**

儿童时期运限计算

```mermaid

```

### 个人信息计算
#### **生肖计算**：根据阳历日期或年份计算生肖
```mermaid

```
#### **星座计算**：根据阳历日期计算西方星座
```mermaid

```
#### **生肖年份查询**：根据生肖查询对应年份范围
```mermaid

```
#### **星座日期范围**：查询各个星座的日期范围
```mermaid

```
### 运限分析
- **完整的运限信息整合**：综合年龄、大限、小限等信息
- **运限预测**：基于紫微斗数理论的运限预测

### 字符串处理
- **干支转字符串**：将干支对象转换为可读字符串
- **批量转换**：批量处理干支字符串转换

### 验证工具
- **干支有效性验证**：验证干支数据的正确性
- **日期格式验证**：验证输入日期的格式正确性
