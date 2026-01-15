/**
 * 运限管理器
 *
 * 职责：
 * - 管理运限选择状态
 * - 生成大限、流年、流月、流日、流时列表
 */

import { MonthNames, DayNames, HourNames } from '../calculators/constants';
import { DecadalCalculator } from '../calculators/DecadalCalculator';
import { YearlyCalculator } from '../calculators/YearlyCalculator';
import { MonthlyCalculator } from '../calculators/MonthlyCalculator';
import { DailyCalculator } from '../calculators/DailyCalculator';
import { HourlyCalculator } from '../calculators/HourlyCalculator';
import type {
  DecadeInfo,
  YearInfo,
  MonthInfo,
  DayInfo,
  HourInfo,
  HoroscopeSelection,
  HoroscopeDataManager,
  IAstrolabe
} from '../types';

/**
 * 运限管理器类
 */
export class HoroscopeManager {
  /**
   * 时辰名称数组
   */
  static readonly HourNames = HourNames;

  /**
   * 计算所有大限
   */
  static calculateDecades(astrolabe: IAstrolabe): DecadeInfo[] {
    return DecadalCalculator.GetDecadesList(astrolabe);
  }

  /**
   * 计算指定大限的流年（向后兼容，默认使用方法1）
   */
  static calculateYears(astrolabe: IAstrolabe, decade: DecadeInfo): YearInfo[] {
    return YearlyCalculator.GetYearsForDecade(astrolabe, decade);
  }

  /**
   * 计算指定年份的流月（向后兼容，使用准确算法）
   */
  static calculateMonths(year: number): MonthInfo[] {
    return MonthlyCalculator.GetMonthsForYear(year);
  }

  /**
   * 计算指定月份的流日
   */
  static calculateDays(year: number, month: number): DayInfo[] {
    return DailyCalculator.GetDaysForMonth(year, month);
  }

  /**
   * 计算指定日期的流时
   */
  static calculateHours(year: number, month: number, day: number): HourInfo[] {
    return HourlyCalculator.GetHoursForDay(year, month, day);
  }





  /**
   * 判断是否为当前流时
   */
  private static isCurrentHour(hourIndex: number): boolean {
    const currentHour = new Date().getHours();
    const timeIndex = Math.floor((currentHour + 1) / 2) % 12;
    return hourIndex === timeIndex;
  }

  /**
   * 生成默认流时
   */
  private static GenerateDefaultHours(): HourInfo[] {
    const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

    return this.HourNames.map((name, index) => ({
      index,
      name,
      heavenlyStem: heavenlyStems[index % 10],
      earthlyBranch: earthlyBranches[index],
    }));
  }
}

// ==================== 函数式API ====================

/**
 * 计算所有大限
 */
export function CalculateDecades(astrolabe: IAstrolabe): DecadeInfo[] {
  return HoroscopeManager.calculateDecades(astrolabe);
}

/**
 * 计算流年
 */
export function CalculateYears(astrolabe: IAstrolabe, decade: DecadeInfo): YearInfo[] {
  return HoroscopeManager.calculateYears(astrolabe, decade);
}

/**
 * 计算流月
 */
export function CalculateMonths(year: number): MonthInfo[] {
  return HoroscopeManager.calculateMonths(year);
}

/**
 * 计算流日
 */
export function CalculateDays(year: number, month: number): DayInfo[] {
  return HoroscopeManager.calculateDays(year, month);
}

/**
 * 计算流时
 */
export function CalculateHours(year: number, month: number, day: number): HourInfo[] {
  return HoroscopeManager.calculateHours(year, month, day);
}

/**
 * 根据大限计算流年列表
 */
export function CalculateYearsForDecade(astrolabe: IAstrolabe, decade: DecadeInfo): YearInfo[] {
  return YearlyCalculator.GetYearsForDecade(astrolabe, decade);
}

/**
 * 根据年份计算流月列表（准确算法）
 */
export function CalculateMonthsForYear(year: number): MonthInfo[] {
  return MonthlyCalculator.GetMonthsForYear(year);
}
