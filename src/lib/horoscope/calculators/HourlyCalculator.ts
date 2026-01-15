/**
 * 流时计算器
 */

import { HourNames } from './constants';
import type { HourlyInfo, HourInfo } from '../types';

export class HourlyCalculator {
  static CalculateHourly(
    ganZhi: [string, string],
    timeIndex: number
  ): HourlyInfo {
    const index = timeIndex;

    return {
      index,
      timeIndex,
      heavenlyStem: ganZhi[0],
      earthlyBranch: ganZhi[1],
    };
  }

  /**
   * 计算指定日期的流时
   */
  static GetHoursForDay(year: number, month: number, day: number): HourInfo[] {
    const hours: HourInfo[] = [];

    try {
      const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
      const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

      for (let i = 0; i < 12; i++) {
        hours.push({
          index: i,
          name: HourNames[i],
          heavenlyStem: heavenlyStems[i % 10],
          earthlyBranch: earthlyBranches[i],
          isCurrent: this.isCurrentHour(i)
        });
      }

      console.log('HourlyCalculator - 流时计算结果:', hours);
      return hours;
    } catch (error) {
      console.error('计算流时出错:', error);
      throw error;
    }
  }

  /**
   * 判断是否为当前流时
   */
  private static isCurrentHour(hourIndex: number): boolean {
    const currentHour = new Date().getHours();
    const timeIndex = Math.floor((currentHour + 1) / 2) % 12;
    return hourIndex === timeIndex;
  }
}
