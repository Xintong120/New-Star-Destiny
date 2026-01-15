/**
 * 运限计算器相关类型定义
 *
 * Calculator类型：包含详细的计算数据（宫位名称、四化星等）
 */

/**
 * 大限信息
 */
export interface DecadalInfo {
  /** 大限索引（0-11） */
  index: number;
  /** 大限范围（虚岁） */
  range: [number, number];
  /** 大限天干 */
  heavenlyStem: string;
  /** 大限地支 */
  earthlyBranch: string;
  /** 大限宫位名称 */
  palaceName: string;
  /** 是否童限 */
  isChildhood: boolean;
  /** 大限四化星 */
  mutagen: {
    lu: string;
    quan: string;
    ke: string;
    ji: string;
  };
}

/**
 * 流年信息
 */
export interface YearlyInfo {
  /** 流年索引（0-11） */
  index: number;
  /** 流年年份 */
  year: number;
  /** 流年天干 */
  heavenlyStem: string;
  /** 流年地支 */
  earthlyBranch: string;
  /** 流年宫位名称数组 */
  palaceNames: string[];
  /** 流年四化星 */
  mutagen: {
    lu: string;
    quan: string;
    ke: string;
    ji: string;
  };
}

/**
 * 流月信息
 */
export interface MonthlyInfo {
  /** 流月索引（0-11） */
  index: number;
  /** 流月月份 */
  month: number;
  /** 流月天干 */
  heavenlyStem: string;
  /** 流月地支 */
  earthlyBranch: string;
  /** 流月宫位名称数组 */
  palaceNames: string[];
  /** 流月四化星 */
  mutagen: {
    lu: string;
    quan: string;
    ke: string;
    ji: string;
  };
}

/**
 * 流日信息
 */
export interface DailyInfo {
  /** 流日索引（0-11） */
  index: number;
  /** 流日日期 */
  day: number;
  /** 流日天干 */
  heavenlyStem: string;
  /** 流日地支 */
  earthlyBranch: string;
}

/**
 * 流时信息
 */
export interface HourlyInfo {
  /** 流时索引（0-11） */
  index: number;
  /** 时辰索引（0-12） */
  timeIndex: number;
  /** 流时天干 */
  heavenlyStem: string;
  /** 流时地支 */
  earthlyBranch: string;
}

/**
 * 完整运限信息
 */
export interface HoroscopeInfo {
  /** 目标日期（阳历） */
  targetDate: string;
  /** 虚岁 */
  nominalAge: number;
  /** 大限信息 */
  decadal: DecadalInfo;
  /** 流年信息 */
  yearly: YearlyInfo;
  /** 流月信息 */
  monthly: MonthlyInfo;
  /** 流日信息 */
  daily: DailyInfo;
  /** 流时信息 */
  hourly: HourlyInfo;
}
