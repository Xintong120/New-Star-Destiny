/**
 * 运限计算基础类型定义
 */

// 定义星曜信息
export interface Star {
  name: string;
  brightness?: string;
  mutagen?: string;
}

// 定义宫位接口
export interface Palace {
  name: string;
  heavenlyStem: string;
  earthlyBranch: string;
  isBodyPalace: boolean;
  majorStars?: Star[];
  minorStars?: Star[];
  miscStars?: string[];
}

// 定义命盘接口
export interface IAstrolabe {
  /** 阳历日期 */
  solarDate: string;
  /** 农历日期 */
  lunarDate: string;
  /** 四柱日期 */
  chineseDate: string;
  /** 性别 */
  gender: string;
  /** 生肖 */
  zodiac: string;
  /** 五行局 */
  fiveElementsClass: string;
  /** 命主 */
  soul: string;
  /** 身主 */
  body: string;
  /** 命宫地支 */
  earthlyBranchOfSoulPalace: string;
  /** 身宫地支 */
  earthlyBranchOfBodyPalace: string;
  /** 宫位数组 */
  palaces: Palace[];
  /** 四化星 */
  mutagen?: string[];
}

// 定义宫位接口（扩展基础宫位）
export interface IPalace extends Palace {
  decadal?: {
    range: [number, number];
    heavenlyStem: string;
    earthlyBranch: string;
  };
}

/**
 * 运限类型
 */
export type HoroscopeType = 'decadal' | 'yearly' | 'monthly' | 'daily' | 'hourly';
