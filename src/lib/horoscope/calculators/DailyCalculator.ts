/**
 * 流日计算器
 */

import { DayNames } from './constants';
import type { DailyInfo, DayInfo } from '../types';
import { FixEarthlyBranchIndex } from './utils';

export class DailyCalculator {
  static CalculateDaily(
    ganZhi: [string, string],
    day: number
  ): DailyInfo {
    const index = FixEarthlyBranchIndex(ganZhi[1]);

    return {
      index,
      day,
      heavenlyStem: ganZhi[0],
      earthlyBranch: ganZhi[1],
    };
  }

  /**
   * 计算指定年月的流日
   */
  static GetDaysForMonth(year: number, month: number): DayInfo[] {
    const days: DayInfo[] = [];

    try {
      // 获取该月的天数
      const daysInMonth = new Date(year, month, 0).getDate();
      const maxDays = Math.min(daysInMonth, 30); // 最多显示30天

      for (let i = 0; i < maxDays; i++) {
        days.push({
          index: i,
          name: DayNames[i] || `第${i + 1}日`,
          heavenlyStem: this.getHeavenlyStem(i),
          earthlyBranch: this.getEarthlyBranch(i),
          isCurrent: this.isCurrentDay(year, month, i + 1)
        });
      }

      console.log('DailyCalculator - 流日计算结果:', days);
      return days;
    } catch (error) {
      console.error('计算流日出错:', error);
      throw error;
    }
  }

  /**
   * 判断是否为当前流日
   */
  private static isCurrentDay(year: number, month: number, day: number): boolean {
    const now = new Date();
    return year === now.getFullYear() &&
           month === now.getMonth() + 1 &&
           day === now.getDate();
  }

  /**
   * 获取天干
   */
  private static getHeavenlyStem(index: number): string {
    const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
    return heavenlyStems[index % 10];
  }

  /**
   * 获取地支
   */
  private static getEarthlyBranch(index: number): string {
    const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
    return earthlyBranches[index % 12];
  }
}
