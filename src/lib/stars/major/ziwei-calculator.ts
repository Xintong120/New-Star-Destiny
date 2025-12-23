/**
 * Ziwei star calculation module
 */

import { FiveElementsValues } from './constants';
import { FixIndex } from './utils';

/**
 * 查找能被五行局整除的最小偏移量
 *
 * 这是紫微星定位算法的核心步骤
 *
 * @param lunarDay 农历日期（1-30）
 * @param fiveElementsValue 五行局数值（2-6）
 * @returns { quotient: 商, offset: 偏移量 }
 */
function FindDivisibleOffset(
  lunarDay: number,
  fiveElementsValue: number
): { quotient: number; offset: number } {
  let offset = 0;
  let quotient: number;
  let remainder: number;

  // 持续增加偏移量，直到(日期+偏移量)能被五行局整除
  do {
    const divisor = lunarDay + offset;
    quotient = Math.floor(divisor / fiveElementsValue);
    remainder = divisor % fiveElementsValue;

    if (remainder !== 0) {
      offset++;
    }
  } while (remainder !== 0);

  return { quotient, offset };
}

/**
 * 根据商数和偏移量计算紫微星位置
 *
 * 规则：
 * - 商数决定基础位置（从寅宫开始）
 * - 偏移量为偶数：顺时针移动
 * - 偏移量为奇数：逆时针移动
 *
 * @param quotient 商数
 * @param offset 偏移量
 * @returns 紫微星索引（0-11，0=寅宫）
 */
function CalculateZiweiPosition(quotient: number, offset: number): number {
  // 将商数转换为12宫索引
  const baseIndex = quotient % 12;

  // 从寅宫（索引0）开始数到商数位置（减1因为索引从0开始）
  let ziweiIndex = baseIndex - 1;

  // 根据偏移量的奇偶性调整位置
  if (offset % 2 === 0) {
    // 偶数：顺时针移动
    ziweiIndex += offset;
  } else {
    // 奇数：逆时针移动
    ziweiIndex -= offset;
  }

  return FixIndex(ziweiIndex);
}

/**
 * 计算紫微星所在宫位索引
 *
 * 起紫微星诀算法：
 * - 六五四三二，酉午亥辰丑
 * - 局数除日数，商数宫前走
 * - 若见数无余，便要起虎口
 * - 日数小於局，还直宫中守
 *
 * 举例：
 * - 例一：27日出生木三局，3除27=9，从寅进9格，在戌安紫微
 * - 例二：13日出生火六局，需加5才能整除，18÷6=3，从寅进3格为辰，
 *         添加数5为奇数，逆回5宫，在亥安紫微
 * - 例三：6日出生土五局，需加4才能整除，10÷5=2，从寅进2格为卯，
 *         添加数4为偶数，顺行4格，在未安紫微
 *
 * @param lunarDay 农历日期（1-30）
 * @param fiveElementsClass 五行局名称
 * @returns 紫微星索引（0-11，0=寅宫）
 */
export function CalculateZiweiIndex(
  lunarDay: number,
  fiveElementsClass: string
): number {
  // 1. 获取五行局数值
  const fiveElementsValue = FiveElementsValues[fiveElementsClass];
  if (!fiveElementsValue) {
    throw new Error(`无效的五行局: ${fiveElementsClass}`);
  }

  // 2. 查找能整除的偏移量
  const { quotient, offset } = FindDivisibleOffset(lunarDay, fiveElementsValue);

  // 3. 根据商数和偏移量计算紫微星位置
  const ziweiIndex = CalculateZiweiPosition(quotient, offset);

  return ziweiIndex;
}
