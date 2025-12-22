import { solar2lunar } from 'lunar-lite';
import LunarDate from '../../../types/date/LunarDate';

/**
 * 阳历转农历转换器
 */
export class SolarToLunarConverter {
  /**
   * 阳历转农历
   * @param solarDate 阳历日期字符串或Date对象
   * @returns 农历日期信息
   */
  static solar2lunar(solarDate: string | Date): LunarDate {
    const dateStr = typeof solarDate === 'string' ? solarDate : 
      `${solarDate.getFullYear()}-${String(solarDate.getMonth() + 1).padStart(2, '0')}-${String(solarDate.getDate()).padStart(2, '0')}`;
    
    const result = solar2lunar(dateStr) as any;
    
    // 添加 toString 方法
    result.toString = function(includeTime?: boolean): string {
      const timeStr = includeTime ? ' (含时间)' : '';
      return `${this.lunarYear}年${this.lunarMonthName}${this.lunarDayName}${timeStr}`;
    };
    
    return result as LunarDate;
  }
}
