/**
 * 紫微斗数五行局计算
 */

import { HeavenlyStemNames as HeavenlyStems, EarthlyBranchNames as EarthlyBranches } from '../utils/ganzhi/GanzhiConstants';

/**
 * 获取五行局
 *
 * 纳音五行计算取数巧记口诀：
 * - 甲乙丙丁一到五，子丑午未一来数，
 * - 寅卯申酉二上走，辰戌巳亥三为足。
 * - 干支相加多减五，五行木金水火土。
 *
 * 天干取数：甲乙→1, 丙丁→2, 戊己→3, 庚辛→4, 壬癸→5
 * 地支取数：子午丑未→1, 寅申卯酉→2, 辰戌巳亥→3
 *
 * @param lifePalaceHeavenlyStem 命宫天干
 * @param lifePalaceEarthlyBranch 命宫地支
 * @returns 五行局名称
 */
export function GetFiveElementsClass(
  lifePalaceHeavenlyStem: string,
  lifePalaceEarthlyBranch: string
): string {
  const fiveElementsTable = ['木三局', '金四局', '水二局', '火六局', '土五局'];

  // 天干取数：每两个天干一组，甲乙→1, 丙丁→2, 戊己→3, 庚辛→4, 壬癸→5
  const heavenlyStemIndex = HeavenlyStems.indexOf(lifePalaceHeavenlyStem);
  const heavenlyStemNumber = Math.floor(heavenlyStemIndex / 2) + 1;

  // 地支取数：子午丑未→1, 寅申卯酉→2, 辰戌巳亥→3
  const earthlyBranchIndex = EarthlyBranches.indexOf(lifePalaceEarthlyBranch);
  // 使用 fixIndex(index, 6) 将12地支映射到6个模式，然后除以2得到1、2、3
  const earthlyBranchNumber = Math.floor((earthlyBranchIndex % 6) / 2) + 1;

  // 干支数相加
  let sum = heavenlyStemNumber + earthlyBranchNumber;

  // 超过5者减去5
  while (sum > 5) {
    sum -= 5;
  }

  // 根据结果返回五行局
  return fiveElementsTable[sum - 1];
}