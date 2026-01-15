/**
 * 运限计算器主入口
 *
 * 职责：
 * - 计算指定日期的完整运限信息
 * - 大限（10年一限）
 * - 流年（按年变化）
 * - 流月（按月变化）
 * - 流日（按日变化）
 * - 流时（按时辰变化）
 */

import { SolarToLunarConverter, GanzhiCalculation, NominalAgeCalculator } from '../../utils';
import { GetTimeIndexFromDate } from './utils';
import { DecadalCalculator } from './DecadalCalculator';
import { YearlyCalculator } from './YearlyCalculator';
import { MonthlyCalculator } from './MonthlyCalculator';
import { DailyCalculator } from './DailyCalculator';
import { HourlyCalculator } from './HourlyCalculator';
import { HoroscopeFlowingStarsCalculator } from './HoroscopeFlowingStarsCalculator';
import type {
  IAstrolabe,
  HoroscopeInfo
} from '../types';

// ==================== 运限计算器 ====================

/**
 * 运限计算器类
 */
export class HoroscopeCalculator {
  /**
   * 计算完整的运限信息
   *
   * @param astrolabe 命盘对象
   * @param targetDate 目标日期（阳历，默认当前日期）
   * @param timeIndex 时辰索引（可选）
   * @returns 完整运限信息
   */
  static calculate(
    astrolabe: IAstrolabe,
    targetDate: string | Date = new Date(),
    timeIndex?: number
  ): HoroscopeInfo {
    // 1. 转换日期为字符串格式
    const targetDateStr = typeof targetDate === 'string'
      ? targetDate
      : targetDate.toISOString().split('T')[0];

    // 2. 转换为农历
    const birthdayLunar = SolarToLunarConverter.solar2lunar(astrolabe.solarDate);
    const targetLunar = SolarToLunarConverter.solar2lunar(targetDateStr);

    // 3. 获取目标日期的天干地支
    const targetDateObj = new Date(targetDateStr);
    const ganZhi = GanzhiCalculation.getDailyGanZhi(targetDateObj);

    // 4. 计算虚岁
    const nominalAge = NominalAgeCalculator.CalculateNominalAge(birthdayLunar, targetLunar);

    // 5. 计算大限
    const decades = DecadalCalculator.GetAllDecades(astrolabe);
    const decadal = decades.find(d => nominalAge >= d.range[0] && nominalAge <= d.range[1]);
    if (!decadal) {
      throw new Error(`无法找到年龄 ${nominalAge} 对应的大限`);
    }

    // 6. 计算流年
    const yearly = YearlyCalculator.CalculateYearly(ganZhi, targetLunar.lunarYear);

    // 7. 计算流月
    const monthly = MonthlyCalculator.CalculateMonthly(ganZhi, targetLunar.lunarMonth);

    // 8. 计算流日
    const daily = DailyCalculator.CalculateDaily(ganZhi, targetLunar.lunarDay);

    // 9. 计算流时
    const hourly = HourlyCalculator.CalculateHourly(
      ganZhi,
      timeIndex !== undefined ? timeIndex : GetTimeIndexFromDate(targetDateObj)
    );

    return {
      targetDate: targetDateStr,
      nominalAge,
      decadal,
      yearly,
      monthly,
      daily,
      hourly,
    };
  }

  /**
   * 获取所有大限信息
   *
   * @param astrolabe 命盘对象
   * @returns 大限数组（12个大限）
   */
  static GetDecades(astrolabe: IAstrolabe) {
    return DecadalCalculator.GetAllDecades(astrolabe);
  }
}

// ==================== 函数式API ====================

/**
 * 获取指定日期的运限信息（便捷方法）
 */
export function GetHoroscopeAtDate(
  astrolabe: IAstrolabe,
  date: string | Date = new Date(),
  timeIndex?: number
): HoroscopeInfo {
  return HoroscopeCalculator.calculate(astrolabe, date, timeIndex);
}

/**
 * 获取当前时刻的运限信息（便捷方法）
 */
export function GetCurrentHoroscope(astrolabe: IAstrolabe): HoroscopeInfo {
  return GetHoroscopeAtDate(astrolabe);
}

/**
 * 获取所有大限信息（便捷方法）
 */
export function GetAllDecades(astrolabe: IAstrolabe) {
  return HoroscopeCalculator.GetDecades(astrolabe);
}

// 导出流动星计算器
export { HoroscopeFlowingStarsCalculator };
