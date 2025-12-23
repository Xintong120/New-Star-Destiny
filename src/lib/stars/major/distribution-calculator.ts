/**
 * Major star distribution calculation module
 */

import { ZiweiStarSequence, TianfuStarSequence } from './constants';
import type { MajorStarDistribution } from './types';
import { FixIndex } from './utils';
import { CalculateZiweiIndex } from './ziwei-calculator';
import { CalculateTianfuIndex } from './tianfu-calculator';

/**
 * 安紫微星系（6颗主星）
 *
 * 从紫微星位置开始，逆时针安星
 *
 * @param ziweiIndex 紫微星索引
 * @returns 星耀分布（12宫，每宫一个数组）
 */
function PlaceZiweiStars(ziweiIndex: number): MajorStarDistribution {
  const distribution: string[][] = Array.from({ length: 12 }, () => []);

  ZiweiStarSequence.forEach((starName, offset) => {
    if (starName !== '') {
      // 逆时针安星：索引减小
      const palaceIndex = FixIndex(ziweiIndex - offset);
      distribution[palaceIndex].push(starName);
    }
  });

  return distribution;
}

/**
 * 安天府星系（8颗主星）
 *
 * 从天府星位置开始，顺时针安星
 *
 * @param tianfuIndex 天府星索引
 * @param distribution 已有的星耀分布（会在原数组上添加）
 */
function PlaceTianfuStars(
  tianfuIndex: number,
  distribution: MajorStarDistribution
): void {
  TianfuStarSequence.forEach((starName, offset) => {
    if (starName !== '') {
      // 顺时针安星：索引增大
      const palaceIndex = FixIndex(tianfuIndex + offset);
      distribution[palaceIndex].push(starName);
    }
  });
}

/**
 * 计算14颗主星的宫位分布
 *
 * @param lunarDay 农历日期（1-30）
 * @param fiveElementsClass 五行局
 * @returns 12宫的主星分布（索引0=寅宫）
 *
 * @example
 * ```typescript
 * const distribution = calculateMajorStarDistribution(20, '火六局');
 * // distribution[0] = ['天同', '天梁']  // 寅宫有天同、天梁
 * // distribution[5] = ['紫微', '破军']  // 未宫有紫微、破军
 * ```
 */
export function CalculateMajorStarDistribution(
  lunarDay: number,
  fiveElementsClass: string
): MajorStarDistribution {
  // 1. 计算紫微星和天府星位置
  const ziweiIndex = CalculateZiweiIndex(lunarDay, fiveElementsClass);
  const tianfuIndex = CalculateTianfuIndex(ziweiIndex);

  // 2. 安紫微星系（逆时针）
  const distribution = PlaceZiweiStars(ziweiIndex);
  // 3. 安天府星系（顺时针）
  PlaceTianfuStars(tianfuIndex, distribution);

  return distribution;
}
