import LunarDate from '../../../types/date/LunarDate';
import { AgeCalculationMethod } from '../../../types/age/AgeTypes';

/**
 * 虚岁计算器
 */
export class NominalAgeCalculator {
  /**
   * 计算虚岁
   *
   * @param birthday 农历生日
   * @param targetDate 农历目标日期
   * @param method 计算方法：'birthday' 生日界限 | 'natural' 自然年界限
   * @returns 虚岁
   */
  static CalculateNominalAge(
    birthday: LunarDate,
    targetDate: LunarDate,
    method: AgeCalculationMethod = 'natural'
  ): number {
    let nominalAge = targetDate.lunarYear - birthday.lunarYear;

    if (method === 'birthday') {
      // 生日界限计算：过了生日才算增加一岁
      if (
        targetDate.lunarMonth > birthday.lunarMonth ||
        (targetDate.lunarMonth === birthday.lunarMonth && targetDate.lunarDay >= birthday.lunarDay)
      ) {
        nominalAge += 1;
      }
    } else {
      // 自然年界限计算：跨年就算增加一岁
      nominalAge += 1;
    }

    return Math.max(1, nominalAge); // 虚岁最小为1岁
  }
}