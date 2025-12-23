/**
 * 紫微斗数宫位相关类型和计算
 */

import { FixIndex, HeavenlyStems, EarthlyBranches, PalaceNames } from './utils';
import type { LifePalaceInfo } from '../../types/astrolabe/LifePalaceInfo';
import type { PalaceStar } from '../../types/astrolabe/PalaceStar';
import type { Palace } from '../../types/astrolabe/Palace';
import { CalculateMajorStarDistribution } from '../stars/major';
import { CalculateMinorStarDistribution } from '../stars/minor';

/**
 * 将主星名称数组转换为宫位星曜对象数组
 *
 * @param starNames 主星名称数组
 * @returns 宫位星曜对象数组
 */
function ConvertMajorStarsToPalaceStars(starNames: string[]): PalaceStar[] {
  return starNames.map(name => ({
    name,
    brightness: '得' // 默认亮度，后续可以根据具体算法计算庙旺利陷
  }));
}

/**
 * 将辅星数据转换为宫位星曜对象数组
 *
 * @param minorStars 辅星数据数组
 * @returns 宫位星曜对象数组
 */
function ConvertMinorStarsToPalaceStars(minorStars: Array<{name: string, sihua?: string}>): PalaceStar[] {
  return minorStars.map(star => ({
    name: star.name,
    brightness: '得', // 辅星默认亮度
    mutagen: star.sihua // 四化信息
  }));
}

/**
 * 计算十二宫位的天干地支、主星和辅星分布
 *
 * @param lifePalaceInfo 命宫信息
 * @param soulIndex 命宫索引（0-11，0=寅宫）
 * @param bodyPalaceIndex 身宫索引（0-11，0=寅宫）
 * @param lunarDay 农历日期（1-30）
 * @param fiveElementsClass 五行局名称
 * @param yearlyHeavenlyStem 年干（如：'甲'）
 * @param yearlyEarthlyBranch 年支（如：'子'）
 * @param lunarMonth 农历月份（1-12）
 * @param timeIndex 时辰索引（0-12）
 * @returns 十二宫位数组（从寅宫开始）
 */
export function CalculateTwelvePalaces(
  lifePalaceInfo: LifePalaceInfo,
  soulIndex: number,
  bodyPalaceIndex: number,
  lunarDay?: number,
  fiveElementsClass?: string,
  yearlyHeavenlyStem?: string,
  yearlyEarthlyBranch?: string,
  lunarMonth?: number,
  timeIndex?: number
): Palace[] {
  const palaces: Palace[] = [];

  // 计算主星分布（如果提供了必要的参数）
  let majorStarDistribution: string[][] = [];
  if (lunarDay && fiveElementsClass) {
    majorStarDistribution = CalculateMajorStarDistribution(lunarDay, fiveElementsClass);
  }

  // 计算辅星分布（如果提供了必要的参数）
  let minorStarDistribution: Array<{name: string, sihua?: string}[]> = [];
  if (yearlyHeavenlyStem && yearlyEarthlyBranch && lunarMonth !== undefined && timeIndex !== undefined) {
    minorStarDistribution = CalculateMinorStarDistribution(
      yearlyHeavenlyStem,
      yearlyEarthlyBranch,
      lunarMonth,
      timeIndex
    );
  }

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

    // 获取该宫位的主星
    const majorStars = majorStarDistribution[i] || [];
    const majorStarsFormatted = ConvertMajorStarsToPalaceStars(majorStars);

    // 获取该宫位的辅星
    const minorStars = minorStarDistribution[i] || [];
    const minorStarsFormatted = ConvertMinorStarsToPalaceStars(minorStars);

    // 输出调试信息
    console.log(`宫位 ${i}: ${name}宫 (${heavenlyStem}${earthlyBranch}) - 主星: [${majorStarsFormatted.map(s => s.name).join(', ')}] - 辅星: [${minorStarsFormatted.map(s => s.name).join(', ')}]`);

    palaces.push({
      name,
      heavenlyStem,
      earthlyBranch,
      isBodyPalace: i === bodyPalaceIndex,
      majorStars: majorStarsFormatted,
      minorStars: minorStarsFormatted
    });
  }

  return palaces;
}
