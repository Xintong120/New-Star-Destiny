/**
 * 运限计算工具函数
 */

import { EarthlyBranches, PalaceNames } from './constants';
import { MutagenMap } from '../../stars/shared-types';

/**
 * 修正地支索引（统一为0-11范围）
 */
export function FixEarthlyBranchIndex(earthlyBranch: string): number {
  const index = EarthlyBranches.indexOf(earthlyBranch);
  return index >= 0 ? index : 0;
}

/**
 * 获取四化星
 */
export function GetMutagen(heavenlyStem: string) {
  const mutagens = MutagenMap[heavenlyStem];
  if (!mutagens) {
    return {
      lu: '',
      quan: '',
      ke: '',
      ji: '',
    };
  }
  return {
    lu: mutagens[0],    // 禄星
    quan: mutagens[1],  // 权星
    ke: mutagens[2],    // 科星
    ji: mutagens[3],    // 忌星
  };
}

/**
 * 计算流年宫位名称
 *
 * 算法：从流年地支对应的宫位开始，依次排列十二宫
 */
export function CalculateYearlyPalaceNames(yearlyIndex: number): string[] {
  const names: string[] = [];
  for (let i = 0; i < 12; i++) {
    const palaceIndex = (yearlyIndex + i) % 12;
    names.push(PalaceNames[palaceIndex]);
  }
  return names;
}

/**
 * 计算流月宫位名称
 *
 * 算法：从流月地支对应的宫位开始，依次排列十二宫
 */
export function CalculateMonthlyPalaceNames(monthlyIndex: number): string[] {
  const names: string[] = [];
  for (let i = 0; i < 12; i++) {
    const palaceIndex = (monthlyIndex + i) % 12;
    names.push(PalaceNames[palaceIndex]);
  }
  return names;
}

/**
 * 从Date对象获取时辰索引
 */
export function GetTimeIndexFromDate(date: Date): number {
  const hour = date.getHours();
  // 23-1点为子时，1-3点为丑时...
  if (hour === 23 || hour === 0) return 0;
  return Math.floor((hour + 1) / 2);
}
