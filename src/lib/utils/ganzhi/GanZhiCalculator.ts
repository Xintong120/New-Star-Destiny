import { getHeavenlyStemAndEarthlyBranchBySolarDate } from 'lunar-lite';
import { GanzhiBoundaryOptions } from '../../../types/date/GanzhiOptions';
import { GanZhiResult } from '../../../types/date/GanZhiResult';
import { GanzhiCalculation } from './GanzhiCalculation';
import { GanzhiStringUtils } from './GanzhiString';

/**
 * 天干地支计算器
 * 整合 lunar-lite 库和自定义计算逻辑
 */
export class GanZhiCalculator {
  /**
   * 获取指定日期的完整天干地支信息
   * @param targetDate 目标日期
   * @param timeIndex 时辰索引 (0-12)
   * @param options 配置选项
   * @returns 天干地支信息
   */
  static getGanZhi(
    targetDate: Date,
    timeIndex: number,
    options?: GanzhiBoundaryOptions
  ): GanZhiResult {
    // 使用 lunar-lite 库获取标准天干地支
    const ganZhi = this.getHeavenlyStemAndEarthlyBranch(targetDate, timeIndex, options);

    return {
      yearly: ganZhi.yearly,
      monthly: ganZhi.monthly,
      daily: ganZhi.daily,
      hourly: ganZhi.hourly
    };
  }

  /**
   * 根据阳历日期获取天干地支（使用 lunar-lite 库）
   * @param solarDate 阳历日期字符串或Date对象
   * @param timeIndex 时辰索引 0-12
   * @param options 配置选项
   * @returns 天干地支日期
   */
  static getHeavenlyStemAndEarthlyBranch(
    solarDate: string | Date,
    timeIndex: number,
    options?: GanzhiBoundaryOptions
  ): import('../../../types/date/HeavenlyStemAndEarthlyBranchDate').default {
    const dateStr = typeof solarDate === 'string' ? solarDate :
      `${solarDate.getFullYear()}-${String(solarDate.getMonth() + 1).padStart(2, '0')}-${String(solarDate.getDate()).padStart(2, '0')}`;

    return getHeavenlyStemAndEarthlyBranchBySolarDate(dateStr, timeIndex, options);
  }

  /**
   * 根据年份计算年干支（自定义算法）
   * @param year 公历年份
   * @returns [天干, 地支]
   */
  static getYearlyGanZhi(year: number): [string, string] {
    return GanzhiCalculation.getYearlyGanZhi(year);
  }

  /**
   * 根据年干和月份计算月干支（自定义算法）
   * @param yearGan 年天干
   * @param month 月份 (1-12)
   * @returns [天干, 地支]
   */
  static getMonthlyGanZhi(yearGan: string, month: number): [string, string] {
    return GanzhiCalculation.getMonthlyGanZhi(yearGan, month);
  }

  /**
   * 根据日期计算日干支（简化算法）
   * @param date 日期
   * @returns [天干, 地支]
   */
  static getDailyGanZhi(date: Date): [string, string] {
    return GanzhiCalculation.getDailyGanZhi(date);
  }

  /**
   * 根据日干和时辰计算时干支
   * @param dayGan 日天干
   * @param timeIndex 时辰索引 (0-12)
   * @returns [天干, 地支]
   */
  static getHourlyGanZhi(dayGan: string, timeIndex: number): [string, string] {
    return GanzhiCalculation.getHourlyGanZhi(dayGan, timeIndex);
  }

  /**
   * 将天干地支转换为中文字符串
   * @param ganZhi 天干地支数组
   * @returns 中文字符串，如"甲子"
   */
  static ganZhiToString(ganZhi: [string, string]): string {
    return GanzhiStringUtils.ganZhiToString(ganZhi);
  }

  /**
   * 批量转换天干地支为字符串
   * @param ganZhiResult 完整的天干地支结果
   * @returns 字符串格式的结果
   */
  static ganZhiResultToString(ganZhiResult: GanZhiResult) {
    return GanzhiStringUtils.ganZhiResultToString(ganZhiResult);
  }
}
