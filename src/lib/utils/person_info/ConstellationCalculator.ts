import { getSign } from 'lunar-lite';

/**
 * 星座计算器
 */
export class ConstellationCalculator {
  /**
   * 根据阳历日期计算星座
   * @param solarDate 阳历日期字符串或Date对象 (YYYY-M-D格式)
   * @returns 星座名称
   */
  static getConstellationBySolarDate(solarDate: string | Date): string {
    const dateStr = typeof solarDate === 'string' ? solarDate :
      `${solarDate.getFullYear()}-${String(solarDate.getMonth() + 1).padStart(2, '0')}-${String(solarDate.getDate()).padStart(2, '0')}`;

    return getSign(dateStr);
  }

  /**
   * 获取所有星座名称列表
   * @returns 星座名称数组
   */
  static getAllConstellations(): string[] {
    return [
      '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座',
      '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'
    ];
  }

  /**
   * 根据星座获取日期范围
   * @param constellation 星座名称
   * @returns 该星座的日期范围描述
   */
  static getDateRangeByConstellation(constellation: string): string {
    const dateRanges: Record<string, string> = {
      '白羊座': '3月21日-4月19日',
      '金牛座': '4月20日-5月20日',
      '双子座': '5月21日-6月21日',
      '巨蟹座': '6月22日-7月22日',
      '狮子座': '7月23日-8月22日',
      '处女座': '8月23日-9月22日',
      '天秤座': '9月23日-10月23日',
      '天蝎座': '10月24日-11月22日',
      '射手座': '11月23日-12月21日',
      '摩羯座': '12月22日-1月19日',
      '水瓶座': '1月20日-2月18日',
      '双鱼座': '2月19日-3月20日'
    };

    return dateRanges[constellation] || '未知';
  }

  /**
   * 根据月份和日期判断星座
   * @param month 月份 (1-12)
   * @param day 日期 (1-31)
   * @returns 星座名称
   */
  static getConstellationByMonthDay(month: number, day: number): string {
    // 星座分界日期
    const boundaries = [
      { start: [12, 22], end: [1, 19], name: '摩羯座' },
      { start: [1, 20], end: [2, 18], name: '水瓶座' },
      { start: [2, 19], end: [3, 20], name: '双鱼座' },
      { start: [3, 21], end: [4, 19], name: '白羊座' },
      { start: [4, 20], end: [5, 20], name: '金牛座' },
      { start: [5, 21], end: [6, 21], name: '双子座' },
      { start: [6, 22], end: [7, 22], name: '巨蟹座' },
      { start: [7, 23], end: [8, 22], name: '狮子座' },
      { start: [8, 23], end: [9, 22], name: '处女座' },
      { start: [9, 23], end: [10, 23], name: '天秤座' },
      { start: [10, 24], end: [11, 22], name: '天蝎座' },
      { start: [11, 23], end: [12, 21], name: '射手座' }
    ];

    // 处理跨年的摩羯座
    if ((month === 1 && day <= 19) || (month === 12 && day >= 22)) {
      return '摩羯座';
    }

    for (const boundary of boundaries) {
      const [startMonth, startDay] = boundary.start;
      const [endMonth, endDay] = boundary.end;

      if (month === startMonth && day >= startDay) {
        return boundary.name;
      }

      if (month === endMonth && day <= endDay) {
        return boundary.name;
      }

      // 处理月份范围内的日期
      if (month > startMonth && month < endMonth) {
        return boundary.name;
      }
    }

    return '未知';
  }

  /**
   * 获取星座的英文名称
   * @param chineseName 中文星座名称
   * @returns 英文星座名称
   */
  static getEnglishName(chineseName: string): string {
    const nameMap: Record<string, string> = {
      '白羊座': 'Aries',
      '金牛座': 'Taurus',
      '双子座': 'Gemini',
      '巨蟹座': 'Cancer',
      '狮子座': 'Leo',
      '处女座': 'Virgo',
      '天秤座': 'Libra',
      '天蝎座': 'Scorpio',
      '射手座': 'Sagittarius',
      '摩羯座': 'Capricorn',
      '水瓶座': 'Aquarius',
      '双鱼座': 'Pisces'
    };

    return nameMap[chineseName] || 'Unknown';
  }
}
