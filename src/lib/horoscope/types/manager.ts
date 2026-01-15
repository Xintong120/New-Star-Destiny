/**
 * 运限管理器相关类型定义
 *
 * Manager类型：包含UI展示数据（名称、状态等）
 */

/**
 * 大限信息（管理器用）
 */
export interface DecadeInfo {
  /** 年龄范围 */
  range: [number, number];
  /** 天干 */
  heavenlyStem: string;
  /** 地支 */
  earthlyBranch: string;
  /** 大限索引 */
  index: number;
  /** 是否为当前大限 */
  isCurrent?: boolean;
}

/**
 * 流年信息（管理器用）
 */
export interface YearInfo {
  /** 年龄 */
  age: number;
  /** 实际年份 */
  actualYear: number;
  /** 天干 */
  heavenlyStem: string;
  /** 地支 */
  earthlyBranch: string;
  /** 流年索引 */
  index: number;
  /** 是否为当前流年 */
  isCurrent?: boolean;
  /** 流年四化星 */
  mutagen: {
    lu: string;
    quan: string;
    ke: string;
    ji: string;
  };
}

/**
 * 流月信息（管理器用）
 */
export interface MonthInfo {
  /** 月份索引 (0-11) */
  index: number;
  /** 月份名称 */
  name: string;
  /** 天干 */
  heavenlyStem: string;
  /** 地支 */
  earthlyBranch: string;
  /** 是否为当前流月 */
  isCurrent?: boolean;
}

/**
 * 流日信息（管理器用）
 */
export interface DayInfo {
  /** 日期索引 (0-29) */
  index: number;
  /** 日期名称 */
  name: string;
  /** 天干 */
  heavenlyStem: string;
  /** 地支 */
  earthlyBranch: string;
  /** 是否为当前流日 */
  isCurrent?: boolean;
}

/**
 * 流时信息（管理器用）
 */
export interface HourInfo {
  /** 时辰索引 (0-11) */
  index: number;
  /** 时辰名称 */
  name: string;
  /** 天干 */
  heavenlyStem: string;
  /** 地支 */
  earthlyBranch: string;
  /** 是否为当前流时 */
  isCurrent?: boolean;
}

/**
 * 运限选择状态
 */
export interface HoroscopeSelection {
  /** 选中的大限索引 */
  decadeIndex: number | null;
  /** 选中的流年索引 */
  yearIndex: number | null;
  /** 选中的流月索引 */
  monthIndex: number | null;
  /** 选中的流日索引 */
  dayIndex: number | null;
  /** 选中的流时索引 */
  hourIndex: number | null;
  /** 选中的年份 */
  selectedYear: number | null;
}

/**
 * 运限数据（管理器用）
 */
export interface HoroscopeDataManager {
  /** 所有大限 */
  decades: DecadeInfo[];
  /** 当前大限的流年 */
  years: YearInfo[];
  /** 当前流年的流月 */
  months: MonthInfo[];
  /** 当前流月的流日 */
  days: DayInfo[];
  /** 当前流日的流时 */
  hours: HourInfo[];
}
