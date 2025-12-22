import { getZodiac, getHeavenlyStemAndEarthlyBranchBySolarDate } from 'lunar-lite';

/**
 * 生肖计算器
 */
export class ZodiacCalculator {
  /**
   * 根据阳历日期计算生肖
   * @param solarDate 阳历日期字符串或Date对象 (YYYY-M-D格式)
   * @returns 生肖名称
   */
  static getZodiacBySolarDate(solarDate: string | Date): string {
    const dateStr = typeof solarDate === 'string' ? solarDate :
      `${solarDate.getFullYear()}-${String(solarDate.getMonth() + 1).padStart(2, '0')}-${String(solarDate.getDate()).padStart(2, '0')}`;

    // 获取年干支信息
    const { yearly } = getHeavenlyStemAndEarthlyBranchBySolarDate(dateStr, 0, {
      year: 'exact' // 使用立春分界
    });

    // 根据地支计算生肖
    return getZodiac(yearly[1]);
  }

  /**
   * 根据年份计算生肖
   * @param year 年份
   * @returns 生肖名称
   */
  static getZodiacByYear(year: number): string {
    // 生肖周期为12年，以鼠年为基准
    const zodiacAnimals = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];

    // 计算从基准年份(1900年是鼠年)到目标年份的偏移
    const baseYear = 1900; // 1900年是鼠年
    const offset = (year - baseYear) % 12;

    // 处理负数偏移
    const index = offset < 0 ? offset + 12 : offset;

    return zodiacAnimals[index];
  }

  /**
   * 获取所有生肖名称列表
   * @returns 生肖名称数组
   */
  static getAllZodiacs(): string[] {
    return ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'];
  }

  /**
   * 根据生肖获取年份范围
   * @param zodiac 生肖名称
   * @param currentYear 当前年份（可选，默认为当前年份）
   * @returns 该生肖的年份列表
   */
  static getYearsByZodiac(zodiac: string, currentYear?: number): number[] {
    const zodiacAnimals = this.getAllZodiacs();
    const zodiacIndex = zodiacAnimals.indexOf(zodiac);

    if (zodiacIndex === -1) {
      throw new Error(`Invalid zodiac: ${zodiac}`);
    }

    const current = currentYear || new Date().getFullYear();
    const years: number[] = [];

    // 计算最近的生肖年份
    const offset = (current - 1900) % 12;
    const currentZodiacIndex = offset < 0 ? offset + 12 : offset;

    let targetYear = current - (currentZodiacIndex - zodiacIndex);

    // 获取前后几年的同生肖年份
    for (let i = -2; i <= 2; i++) {
      years.push(targetYear + i * 12);
    }

    return years.sort((a, b) => a - b);
  }
}
