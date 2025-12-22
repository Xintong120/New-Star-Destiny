import { lunar2solar } from 'lunar-lite';

/**
 * 农历转阳历转换器
 */
export class LunarToSolarConverter {
  /**
   * 农历转阳历
   * @param lunarDateStr 农历日期字符串 (YYYY-M-D格式)
   * @param isLeapMonth 是否为闰月
   * @returns 阳历日期对象
   */
  static lunar2solar(lunarDateStr: string, isLeapMonth: boolean = false): Date {
    const result = lunar2solar(lunarDateStr, isLeapMonth);

    if (!result) {
      throw new Error(`Invalid lunar date: ${lunarDateStr}`);
    }

    // lunar-lite 返回的是 SolarDate 对象，转换为标准 Date 对象
    const solarResult = result as any;
    return new Date(solarResult.year, solarResult.month - 1, solarResult.day);
  }

  /**
   * 农历转阳历 (返回日期字符串)
   * @param lunarDateStr 农历日期字符串 (YYYY-M-D格式)
   * @param isLeapMonth 是否为闰月
   * @returns 阳历日期字符串 (YYYY-MM-DD格式)
   */
  static lunar2solarString(lunarDateStr: string, isLeapMonth: boolean = false): string {
    const solarDate = this.lunar2solar(lunarDateStr, isLeapMonth);
    return `${solarDate.getFullYear()}-${String(solarDate.getMonth() + 1).padStart(2, '0')}-${String(solarDate.getDate()).padStart(2, '0')}`;
  }
}
