/**
 * 运限分析器相关类型定义
 */

/**
 * 运限数据
 */
export interface HoroscopeData {
  type: import('./base').HoroscopeType;
  lifePalaceIndex: number;
  data: {
    heavenlyStem: string;
    earthlyBranch: string;
    originalHeavenlyStem?: string;
    originalEarthlyBranch?: string;
    mutagen?: string[];
    stars?: any[];
    palaceNames?: string[];
  };
  surroundedPalaces?: any;
}

/**
 * 运限分析结果
 */
export interface HoroscopeAnalysis {
  /** 运限命宫索引 */
  lifePalaceIndex: number;
  /** 运限三方四正索引 */
  surroundedIndices: number[];
  /** 运限宫位名称 */
  palaceNames: string[];
  /** 是否顺行 */
  isShunXing: boolean;
  /** 步进方向 */
  stepDirection: number;
}

/**
 * 大限分析结果
 */
export interface DecadalAnalysis extends HoroscopeAnalysis {
  /** 大限索引 */
  decadeIndex: number;
  /** 大限天干地支 */
  ganZhi: string;
}

/**
 * 流年分析结果
 */
export interface YearlyAnalysis extends HoroscopeAnalysis {
  /** 流年年份 */
  year: number;
  /** 流年天干地支 */
  ganZhi: string;
}

/**
 * 流月分析结果
 */
export interface MonthlyAnalysis extends HoroscopeAnalysis {
  /** 流月索引 (0-11) */
  monthIndex: number;
  /** 基于寅宫起正月的计算规则 */
  baseOnYinPalace: boolean;
}
