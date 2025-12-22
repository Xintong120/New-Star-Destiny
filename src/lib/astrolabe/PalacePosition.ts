/**
 * 紫微斗数宫位位置计算
 */

import { FixIndex } from './utils';

/**
 * 计算命宫位置
 *
 * 口诀：
 * 1. 月数从寅宫起，顺数至生月
 * 2. 时数从生月起，逆数至生时
 * 3. 最后落宫即为命宫
 *
 * @param lunarMonth 农历月份（1-12）
 * @param timeIndex 时辰索引（0-12）
 * @returns 命宫索引（0-11，0=寅宫）
 */
export function CalculateLifePalaceIndex(lunarMonth: number, timeIndex: number): number {
  // 将timeIndex转换为地支索引
  // timeIndex: 0=早子, 1=丑, 2=寅, ..., 11=亥, 12=晚子
  // 地支索引: 0=子, 1=丑, 2=寅, ..., 11=亥
  let earthlyBranchIndex: number;
  if (timeIndex === 0) {
    // 早子时：地支是子(0)
    earthlyBranchIndex = 0;
  } else if (timeIndex === 12) {
    // 晚子时：地支是子(0)
    earthlyBranchIndex = 0;
  } else {
    // 其他时辰：timeIndex直接对应地支索引
    earthlyBranchIndex = timeIndex;
  }

  // 命宫索引计算：
  // 1. 先将农历月份转成以寅为0的索引：lunarMonth + 1 - 2 = lunarMonth - 1
  // 2. 再减去时辰地支索引
  const monthIndex = FixIndex(lunarMonth - 1);  // 转成以寅为0的索引
  const soulIndex = FixIndex(monthIndex - earthlyBranchIndex);

  return soulIndex;
}

/**
 * 计算身宫位置
 *
 * 算法：身宫 = 农历月份 + 时辰地支索引
 *
 * @param lunarMonth 农历月份（1-12）
 * @param timeIndex 时辰索引（0-12）
 * @returns 身宫索引（0-11）
 */
export function CalculateBodyPalaceIndex(lunarMonth: number, timeIndex: number): number {
  // 将timeIndex转换为地支索引
  let earthlyBranchIndex: number;
  if (timeIndex === 0 || timeIndex === 12) {
    // 早子时和晚子时都是子(0)
    earthlyBranchIndex = 0;
  } else {
    // 其他时辰：timeIndex直接对应地支索引
    earthlyBranchIndex = timeIndex;
  }

  // 身宫索引计算：
  // 1. 先将农历月份转成以寅为0的索引：lunarMonth - 1
  // 2. 再加上时辰地支索引
  const monthIndex = FixIndex(lunarMonth - 1);  // 转成以寅为0的索引
  const bodyIndex = FixIndex(monthIndex + earthlyBranchIndex);

  return bodyIndex;
}