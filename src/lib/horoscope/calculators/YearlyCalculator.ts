/**
 * 流年计算器
 */

import { GanzhiCalculation } from '../../utils/ganzhi/GanzhiCalculation';
import type { YearlyInfo, YearInfo, DecadeInfo, IAstrolabe } from '../types';
import { FixEarthlyBranchIndex, CalculateYearlyPalaceNames, GetMutagen } from './utils';

/**
 * 流年计算器类
 */
export class YearlyCalculator {
  /**
   * 计算流年信息
   */
  static CalculateYearly(
    ganZhi: [string, string],
    year: number
  ): YearlyInfo {
    const index = FixEarthlyBranchIndex(ganZhi[1]);
    const palaceNames = CalculateYearlyPalaceNames(index);
    const mutagen = GetMutagen(ganZhi[0]);

    return {
      index,
      year,
      heavenlyStem: ganZhi[0],
      earthlyBranch: ganZhi[1],
      palaceNames,
      mutagen,
    };
  }

  /**
   * 根据大限计算流年列表
   */
  static GetYearsForDecade(astrolabe: IAstrolabe, decade: DecadeInfo): YearInfo[] {
    const years: YearInfo[] = [];

    try {
      // 获取出生年份
      const birthYear = this.GetBirthYear(astrolabe);
      if (!birthYear) {
        throw new Error('无法获取出生年份，无法计算流年');
      }

      // 固定使用：出生年 + 起运年龄 - 1
      const yearOffset = -1;
      const decadeStartYear = birthYear + decade.range[0] + yearOffset;

      console.log('流年计算详情:', {
        birthYear,
        decadeRange0: decade.range[0],
        yearOffset,
        decadeStartYear,
        calculation: `${birthYear} + ${decade.range[0]} + (${yearOffset}) = ${decadeStartYear}`
      });

      // 生成10个流年
      for (let i = 0; i < 10; i++) {
        const actualYear = decadeStartYear + i;
        const age = decade.range[0] + i;

        // 计算年干支
        const ganZhi = GanzhiCalculation.getYearlyGanZhi(actualYear);

        years.push({
          age,
          actualYear,
          heavenlyStem: ganZhi[0],
          earthlyBranch: ganZhi[1],
          index: i,
          isCurrent: this.isCurrentYear(actualYear),
          mutagen: GetMutagen(ganZhi[0])
        });
      }

      console.log('YearlyCalculator - 流年计算结果:', years);
      return years;
    } catch (error) {
      console.error('计算流年出错:', error);
      throw error;
    }
  }

  /**
   * 获取出生年份（使用农历年份）
   */
  private static GetBirthYear(astrolabe: IAstrolabe): number | null {
    try {
      const centerInfo = (astrolabe as any).centerInfo;
      if (centerInfo && centerInfo.lunarDate) {
        return parseInt(centerInfo.lunarDate.split('年')[0]);
      }
      return null;
    } catch {
      return null;
    }
  }

  /**
   * 判断是否为当前流年
   */
  private static isCurrentYear(year: number): boolean {
    return year === new Date().getFullYear();
  }
}
