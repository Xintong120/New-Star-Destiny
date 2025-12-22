import LunarDate from '../../../types/date/LunarDate';
import { AgeCalculationMethod } from '../../../types/age/AgeTypes';

/**
 * 基础年龄计算工具
 */
export class AgeCalculation {
  /**
   * 计算虚岁
   *
   * @param birthday 农历生日
   * @param targetDate 农历目标日期
   * @param method 计算方法：'birthday' 生日界限 | 'natural' 自然年界限
   * @returns 虚岁
   */
  static calculateNominalAge(
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

  /**
   * 计算实岁（周岁）
   *
   * @param birthday 农历生日
   * @param targetDate 农历目标日期
   * @returns 实岁
   */
  static calculateActualAge(birthday: LunarDate, targetDate: LunarDate): number {
    let actualAge = targetDate.lunarYear - birthday.lunarYear;

    // 如果还没过生日，实岁减1
    if (
      targetDate.lunarMonth < birthday.lunarMonth ||
      (targetDate.lunarMonth === birthday.lunarMonth && targetDate.lunarDay < birthday.lunarDay)
    ) {
      actualAge -= 1;
    }

    return Math.max(0, actualAge);
  }
}
