/**
 * 流月计算器
 */

import { MonthNames } from './constants';
import type { MonthlyInfo, MonthInfo } from '../types';
import { FixEarthlyBranchIndex, CalculateMonthlyPalaceNames, GetMutagen } from './utils';

export class MonthlyCalculator {
  static CalculateMonthly(
    ganZhi: [string, string],
    month: number
  ): MonthlyInfo {
    const index = FixEarthlyBranchIndex(ganZhi[1]);
    const palaceNames = CalculateMonthlyPalaceNames(index);
    const mutagen = GetMutagen(ganZhi[0]);

    return {
      index,
      month,
      heavenlyStem: ganZhi[0],
      earthlyBranch: ganZhi[1],
      palaceNames,
      mutagen,
    };
  }

  /**
   * 根据年份计算流月列表（准确算法）
   */
  static GetMonthsForYear(year: number): MonthInfo[] {
    const months: MonthInfo[] = [];

    try {
      // 使用准确的月干支计算算法（基于年份）
      for (let i = 0; i < 12; i++) {
        // 计算年索引（从1864年开始）
        const yearIndex = (year - 1864) % 60;
        const yearGanIndex = yearIndex % 10;

        // 月干计算：(年干 * 2 + 月索引 + 1) % 10
        const monthGanIndex = (yearGanIndex * 2 + i + 1) % 10;
        const monthZhiIndex = (i + 2) % 12; // 月支固定偏移

        // 确保索引在有效范围内
        const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

        const gan = heavenlyStems[monthGanIndex >= 0 ? monthGanIndex % 10 : (monthGanIndex + 10) % 10];
        const zhi = earthlyBranches[monthZhiIndex >= 0 ? monthZhiIndex % 12 : (monthZhiIndex + 12) % 12];

        months.push({
          index: i,
          name: MonthNames[i],
          heavenlyStem: gan,
          earthlyBranch: zhi,
          isCurrent: this.isCurrentMonth(year, i + 1)
        });
      }

      console.log('MonthlyCalculator - 流月计算结果（准确算法）:', months);
      return months;
    } catch (error) {
      console.error('计算流月出错:', error);
      throw error;
    }
  }

  /**
   * 判断是否为当前流月
   */
  private static isCurrentMonth(year: number, month: number): boolean {
    const now = new Date();
    return year === now.getFullYear() && month === now.getMonth() + 1;
  }
}
