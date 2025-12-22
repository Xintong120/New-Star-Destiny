/**
 * 紫微斗数宫位相关类型和计算
 */

import { FixIndex, HeavenlyStems, EarthlyBranches, PalaceNames } from './utils';
import type { LifePalaceInfo } from '../../types/astrolabe/LifePalaceInfo';
import type { PalaceStar } from '../../types/astrolabe/PalaceStar';
import type { Palace } from '../../types/astrolabe/Palace';

/**
 * 计算十二宫位的天干地支
 *
 * @param lifePalaceInfo 命宫信息
 * @param soulIndex 命宫索引（0-11，0=寅宫）
 * @param bodyPalaceIndex 身宫索引（0-11，0=寅宫）
 * @returns 十二宫位数组（从寅宫开始）
 */
export function CalculateTwelvePalaces(
  lifePalaceInfo: LifePalaceInfo,
  soulIndex: number,
  bodyPalaceIndex: number
): Palace[] {
  const palaces: Palace[] = [];

  for (let i = 0; i < 12; i++) {
    // 地支：固定从寅宫（索引2）开始顺时针排列
    const earthlyBranchIndex = FixIndex(2 + i);
    const earthlyBranch = EarthlyBranches[earthlyBranchIndex];

    // 天干计算：先推算寅宫天干，再顺序递增
    // 寅宫天干 = 命宫天干 - 命宫位置
    const lifeStemIndex = HeavenlyStems.indexOf(lifePalaceInfo.heavenlyStem);
    const heavenlyStemIndex = FixIndex(lifeStemIndex - soulIndex + i, 10);
    const heavenlyStem = HeavenlyStems[heavenlyStemIndex];

    // 宫位名称：根据命宫位置旋转
    // 如果命宫在索引6（申宫），那么索引6应该叫"命宫"
    // nameIndex = (i - soulIndex + 12) % 12
    const nameIndex = FixIndex(i - soulIndex);
    const name = PalaceNames[nameIndex];

    palaces.push({
      name,
      heavenlyStem,
      earthlyBranch,
      isBodyPalace: i === bodyPalaceIndex,
      majorStars: [],
      minorStars: []
    });
  }

  return palaces;
}