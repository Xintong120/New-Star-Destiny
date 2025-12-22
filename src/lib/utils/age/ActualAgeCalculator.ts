import LunarDate from '../../../types/date/LunarDate';

/**
 * 实岁（周岁）计算器
 */
export class ActualAgeCalculator {
  /**
   * 计算实岁（周岁）
   *
   * @param birthday 农历生日
   * @param targetDate 农历目标日期
   * @returns 实岁
   */
  static CalculateActualAge(birthday: LunarDate, targetDate: LunarDate): number {
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