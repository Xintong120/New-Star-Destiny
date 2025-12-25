/**
 * 辅星亮度计算模块
 *
 * 提供辅星的庙旺得利平不陷亮度查询
 *
 * 注意：
 * - 并非所有辅星都有亮度数据
 * - 原版只有6个辅星有亮度：文昌、文曲、火星、铃星、擎羊、陀罗
 * - 其他辅星（左辅、右弼、天魁、天钺、禄存、天马、地空、地劫等）无亮度数据
 */

import type { Brightness } from '../mutagen/types';

/**
 * 辅星亮度映射表
 *
 * 数组索引对应宫位地支：
 * 索引 0-11 对应 寅、卯、辰、巳、午、未、申、酉、戌、亥、子、丑
 *
 * 亮度值：
 * - 庙 (miao): 最强
 * - 旺 (wang): 很强
 * - 得 (de): 较强
 * - 利 (li): 中等
 * - 平 (ping): 一般
 * - 不 (bu): 较弱
 * - 陷 (xian): 最弱
 * - '' (空): 无特定亮度
 */
const MinorStarBrightnessMap: Record<string, Brightness[]> = {
  // 文昌：辰戌为庙，其他按规律分布
  '文昌': ['陷', '利', '得', '庙', '陷', '利', '得', '庙', '陷', '利', '得', '庙'],

  // 文曲：巳亥为庙，其他按规律分布
  '文曲': ['平', '旺', '得', '庙', '陷', '旺', '得', '庙', '陷', '旺', '得', '庙'],

  // 火星：寅午戌为庙，按3宫一循环
  '火星': ['庙', '利', '陷', '得', '庙', '利', '陷', '得', '庙', '利', '陷', '得'],

  // 铃星：卯未亥为庙，按3宫一循环
  '铃星': ['庙', '利', '陷', '得', '庙', '利', '陷', '得', '庙', '利', '陷', '得'],

  // 擎羊：陷庙相间，子午寅申辰戌为空
  '擎羊': ['', '陷', '庙', '', '陷', '庙', '', '陷', '庙', '', '陷', '庙'],

  // 陀罗：陷庙相间，与擎羊错开
  '陀罗': ['陷', '', '庙', '陷', '', '庙', '陷', '', '庙', '陷', '', '庙'],
};

/**
 * 获取辅星的亮度
 *
 * @param starName 辅星名称
 * @param palaceIndex 宫位索引（0-11，从寅宫开始）
 * @returns 亮度值，如果该辅星无亮度数据则返回空字符串
 *
 * @example
 * ```typescript
 * const brightness = GetMinorStarBrightness('文昌', 3); // '庙'
 * const brightness2 = GetMinorStarBrightness('左辅', 0); // '' (左辅无亮度数据)
 * ```
 */
export function GetMinorStarBrightness(
  starName: string,
  palaceIndex: number
): Brightness {
  // 检查是否有该星的亮度数据
  const brightnessArray = MinorStarBrightnessMap[starName];

  if (!brightnessArray) {
    return '';
  }

  // 确保索引在有效范围内
  const safeIndex = ((palaceIndex % 12) + 12) % 12;

  return brightnessArray[safeIndex] || '';
}

/**
 * 检查辅星是否有亮度数据
 *
 * @param starName 辅星名称
 * @returns 是否有亮度数据
 *
 * @example
 * ```typescript
 * HasMinorStarBrightness('文昌'); // true
 * HasMinorStarBrightness('左辅'); // false
 * ```
 */
export function HasMinorStarBrightness(starName: string): boolean {
  return starName in MinorStarBrightnessMap;
}

/**
 * 获取所有有亮度数据的辅星列表
 *
 * @returns 有亮度数据的辅星名称数组
 */
export function GetMinorStarsWithBrightness(): string[] {
  return Object.keys(MinorStarBrightnessMap);
}

/**
 * 获取辅星在所有宫位的亮度分布
 *
 * @param starName 辅星名称
 * @returns 12个宫位的亮度数组，如果该辅星无亮度数据则返回null
 *
 * @example
 * ```typescript
 * const distribution = GetMinorStarBrightnessDistribution('文昌');
 * // ['陷', '利', '得', '庙', '陷', '利', '得', '庙', '陷', '利', '得', '庙']
 * ```
 */
export function GetMinorStarBrightnessDistribution(
  starName: string
): Brightness[] | null {
  return MinorStarBrightnessMap[starName] || null;
}

/**
 * 获取辅星亮度信息（用于调试和文档）
 */
export function GetMinorStarBrightnessInfo() {
  return {
    description: '辅星亮度计算模块',
    brightnessLevels: ['庙', '旺', '得', '利', '平', '不', '陷'],
    supportedStars: Object.keys(MinorStarBrightnessMap),
    totalSupportedStars: Object.keys(MinorStarBrightnessMap).length
  };
}
