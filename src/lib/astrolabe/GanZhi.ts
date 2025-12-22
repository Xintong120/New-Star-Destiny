/**
 * 紫微斗数干支计算
 */

import { fixIndex, HEAVENLY_STEMS, EARTHLY_BRANCHES, TIGER_RULE } from './utils';
import type { LifePalaceInfo } from '../../types/astrolabe/LifePalaceInfo';
import type { GanZhiResult } from '../../types/date/GanZhiResult';

/**
 * 计算命宫天干地支
 *
 * @param lifePalaceIndex 命宫索引
 * @param yearGanZhi 年份干支
 * @returns 命宫信息
 */
export function calculateLifePalaceGanZhi(
  lifePalaceIndex: number,
  yearGanZhi: GanZhiResult
): LifePalaceInfo {
  // 命宫地支 = 命宫索引 + 寅索引(2)
  // 因为紫微斗数以寅宫为第一宫
  const yinIndex = 2; // 寅在地支中的索引（子=0, 丑=1, 寅=2）
  const earthlyBranchIndex = fixIndex(lifePalaceIndex + yinIndex);
  const earthlyBranch = EARTHLY_BRANCHES[earthlyBranchIndex];

  // 命宫天干的计算：使用五虎遁规则
  // 1. 先通过五虎遁得到寅宫的天干
  const yearStem = yearGanZhi.yearly[0];
  const yinStem = TIGER_RULE[yearStem];

  if (!yinStem) {
    throw new Error(`未找到年干 ${yearStem} 对应的五虎遁规则`);
  }

  // 2. 寅宫天干 + 命宫索引 = 命宫天干
  const yinStemIndex = HEAVENLY_STEMS.indexOf(yinStem);
  const heavenlyStemIndex = fixIndex(yinStemIndex + lifePalaceIndex, 10);
  const heavenlyStem = HEAVENLY_STEMS[heavenlyStemIndex];

  return {
    index: lifePalaceIndex,
    heavenlyStem,
    earthlyBranch
  };
}