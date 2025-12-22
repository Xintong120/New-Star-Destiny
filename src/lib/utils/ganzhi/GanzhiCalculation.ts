import { HeavenlyStemNames, EarthlyBranchNames } from './GanzhiConstants';

/**
 * 天干地支计算工具
 */
export class GanzhiCalculation {
  /**
   * 根据年份计算年干支
   * @param year 公历年份
   * @returns [天干, 地支]
   */
  static getYearlyGanZhi(year: number): [string, string] {
    // 1864年为甲子年，以此为基准计算
    const baseYear = 1864;
    const yearIndex = (year - baseYear) % 60;

    const ganIndex = yearIndex % 10;
    const zhiIndex = yearIndex % 12;

    return [
      HeavenlyStemNames[ganIndex],
      EarthlyBranchNames[zhiIndex]
    ];
  }

  /**
   * 根据年干和月份计算月干支
   * @param yearGan 年天干
   * @param month 月份 (1-12)
   * @returns [天干, 地支]
   */
  static getMonthlyGanZhi(yearGan: string, month: number): [string, string] {
    const yearGanIndex = HeavenlyStemNames.indexOf(yearGan);

    // 月干计算公式: (年干索引 * 2 + 月份) % 10
    const monthGanIndex = (yearGanIndex * 2 + month) % 10;

    // 月支计算: 正月建寅，月支从寅开始
    const monthZhiIndex = (month + 1) % 12; // 正月为寅(2)，所以+1

    return [
      HeavenlyStemNames[monthGanIndex],
      EarthlyBranchNames[monthZhiIndex]
    ];
  }

  /**
   * 根据日期计算日干支（简化算法）
   * @param date 日期
   * @returns [天干, 地支]
   */
  static getDailyGanZhi(date: Date): [string, string] {
    // 使用简化的日干支计算
    // 以1900年1月31日为甲子日基准
    const baseDate = new Date(1900, 0, 31);
    const daysDiff = Math.floor((date.getTime() - baseDate.getTime()) / (24 * 60 * 60 * 1000));

    const dayIndex = daysDiff % 60;
    const ganIndex = dayIndex % 10;
    const zhiIndex = dayIndex % 12;

    return [
      HeavenlyStemNames[ganIndex >= 0 ? ganIndex : ganIndex + 10],
      EarthlyBranchNames[zhiIndex >= 0 ? zhiIndex : zhiIndex + 12]
    ];
  }

  /**
   * 根据日干和时辰计算时干支
   * @param dayGan 日天干
   * @param timeIndex 时辰索引 (0-12)
   * @returns [天干, 地支]
   */
  static getHourlyGanZhi(dayGan: string, timeIndex: number): [string, string] {
    const dayGanIndex = HeavenlyStemNames.indexOf(dayGan);

    // 时干计算公式: (日干索引 * 2 + 时辰索引) % 10
    const hourGanIndex = (dayGanIndex * 2 + timeIndex) % 10;

    // 时支直接对应时辰索引（但要处理晚子时的情况）
    const hourZhiIndex = timeIndex === 12 ? 0 : timeIndex; // 晚子时(12)对应子时(0)

    return [
      HeavenlyStemNames[hourGanIndex],
      EarthlyBranchNames[hourZhiIndex]
    ];
  }
}
