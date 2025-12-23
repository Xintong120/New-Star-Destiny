/**
 * 火星铃星星曜位置计算模块
 *
 * 职责：
 * - 根据年支和时辰计算火星铃星的位置
 *
 * 算法说明：
 * 口诀：申子辰人寅戌扬，寅午戌人丑卯方。巳酉丑人卯戌位，亥卯未人酉戌房。
 *
 * 步骤：
 * 1. 根据年支确定火星铃星的起始宫位
 * 2. 从起始宫位按时辰顺数计算最终位置
 */

import type { EarthlyBranchName } from './types';

// ==================== 类型定义 ====================

/**
 * 火星铃星位置结果
 */
export interface HuoLingPosition {
  /** 火星索引 */
  huoIndex: number;
  /** 铃星索引 */
  lingIndex: number;
}

/**
 * 年支分组到火星铃星起始位置的映射
 * 口诀：申子辰人寅戌扬，寅午戌人丑卯方。巳酉丑人卯戌位，亥卯未人酉戌房。
 *
 * 宫位索引对照: 寅0,卯1,辰2,巳3,午4,未5,申6,酉7,戌8,亥9,子10,丑11
 */
const EarthlyBranchToHuoLingStart: Record<string, {huoStart: number, lingStart: number}> = {
  // 申子辰年：火星起寅宫，铃星起戌宫
  '申': { huoStart: 0, lingStart: 8 },  // 寅宫=0, 戌宫=8
  '子': { huoStart: 0, lingStart: 8 },
  '辰': { huoStart: 0, lingStart: 8 },

  // 寅午戌年：火星起丑宫，铃星起卯宫
  '寅': { huoStart: 11, lingStart: 1 }, // 丑宫=11, 卯宫=1
  '午': { huoStart: 11, lingStart: 1 },
  '戌': { huoStart: 11, lingStart: 1 },

  // 巳酉丑年：火星起卯宫，铃星起戌宫
  '巳': { huoStart: 1, lingStart: 8 },  // 卯宫=1, 戌宫=8
  '酉': { huoStart: 1, lingStart: 8 },
  '丑': { huoStart: 1, lingStart: 8 },

  // 亥卯未年：火星起酉宫，铃星起戌宫
  '亥': { huoStart: 7, lingStart: 8 },  // 酉宫=7, 戌宫=8
  '卯': { huoStart: 7, lingStart: 8 },
  '未': { huoStart: 7, lingStart: 8 }
};

// ==================== 工具函数 ====================

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

/**
 * 计算顺时针星曜位置
 */
function CalculateForwardStarIndex(startIndex: number, offset: number): number {
  return FixIndex(startIndex + offset);
}

/**
 * 计算逆时针星曜位置
 */
function CalculateReverseStarIndex(startIndex: number, offset: number): number {
  return FixIndex(startIndex - offset);
}

// ==================== 核心计算函数 ====================

/**
 * 获取火星铃星的索引
 *
 * @param yearlyEarthlyBranch 年支（如：'辰'）
 * @param timeIndex 时辰索引（0-12，0=子时，12=晚子时）
 * @returns 火星、铃星索引
 */
export function GetHuoLingIndex(yearlyEarthlyBranch: string, timeIndex: number): HuoLingPosition {
  // 标准化时辰索引（晚子时12转换为子时0）
  const normalizedTimeIndex = timeIndex === 12 ? 0 : timeIndex;

  if (normalizedTimeIndex < 0 || normalizedTimeIndex > 11) {
    throw new Error(`无效的时辰索引: ${timeIndex}，应该在0-12之间`);
  }

  // 根据年支获取起始位置
  const startPositions = EarthlyBranchToHuoLingStart[yearlyEarthlyBranch];
  if (!startPositions) {
    throw new Error(`无效的年支: ${yearlyEarthlyBranch}`);
  }

  // 从起始位置按时辰顺数计算最终位置
  const huoIndex = CalculateForwardStarIndex(startPositions.huoStart, normalizedTimeIndex);
  const lingIndex = CalculateForwardStarIndex(startPositions.lingStart, normalizedTimeIndex);

  return { huoIndex, lingIndex };
}

// ==================== 默认导出 ====================

export default GetHuoLingIndex;
