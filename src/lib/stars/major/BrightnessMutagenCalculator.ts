/**
 * 主星亮度计算模块
 *
 * 职责：
 * - 计算主星的庙旺平陷亮度
 * - 提供主星亮度查询功能
 */

import type { Brightness } from '../mutagen/types';
import { BrightnessMap } from './constants';
import { FixIndex } from './utils';

// ==================== 核心功能 ====================

/**
 * 获取主星的亮度
 *
 * @param starName 主星名称
 * @param palaceIndex 宫位索引（0-11，0=寅宫）
 * @returns 亮度
 *
 * @example
 * ```typescript
 * const brightness = GetMajorStarBrightness('紫微', 4);  // 返回 '庙'
 * ```
 */
export function GetMajorStarBrightness(starName: string, palaceIndex: number): Brightness {
  const brightnessArray = BrightnessMap[starName];

  if (!brightnessArray) {
    return '';
  }

  const index = FixIndex(palaceIndex);
  return brightnessArray[index] || '';
}

/**
 * 检查主星是否有亮度数据
 *
 * @param starName 主星名称
 * @returns 是否有亮度数据
 */
export function HasMajorStarBrightness(starName: string): boolean {
  return starName in BrightnessMap;
}

/**
 * 获取所有有亮度数据的主星列表
 *
 * @returns 有亮度数据的主星名称数组
 */
export function GetMajorStarsWithBrightness(): string[] {
  return Object.keys(BrightnessMap);
}

/**
 * 获取主星在所有宫位的亮度分布
 *
 * @param starName 主星名称
 * @returns 12个宫位的亮度数组
 */
export function GetMajorStarBrightnessDistribution(starName: string): Brightness[] | null {
  return BrightnessMap[starName] || null;
}

/**
 * 获取主星亮度模块信息（用于调试和文档）
 */
export function GetMajorStarBrightnessInfo() {
  return {
    description: '主星亮度计算模块',
    brightnessLevels: ['庙', '旺', '得', '利', '平', '不', '陷'],
    supportedStars: Object.keys(BrightnessMap),
    totalSupportedStars: Object.keys(BrightnessMap).length
  };
}