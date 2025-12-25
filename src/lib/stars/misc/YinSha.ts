/**
 * 阴煞星曜位置计算模块
 *
 * 职责：
 * - 根据农历月份计算阴煞的位置
 *
 * 算法说明：
 * 正七月在寅，二八月在子，
 * 三九月在戍，四十月在申，
 * 五十一在午，六十二在辰。
 *
 * 按月份固定宫位：
 * - 正月、七月：寅宫
 * - 二月、八月：子宫
 * - 三月、九月：戌宫
 * - 四月、十月：申宫
 * - 五月、十一月：午宫
 * - 六月、十二月：辰宫
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 阴煞位置结果
 */
export interface YinShaPosition {
  /** 阴煞索引 */
  yinShaIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 月份到宫位的映射
 * 宫位索引：寅0卯1辰2巳3午4未5申6酉7戌8亥9子10丑11
 */
const MonthToPalaceIndex: Record<number, number> = {
  1: 0,   // 正月 -> 寅宫
  2: 10,  // 二月 -> 子宫
  3: 8,   // 三月 -> 戌宫
  4: 6,   // 四月 -> 申宫
  5: 4,   // 五月 -> 午宫
  6: 2,   // 六月 -> 辰宫
  7: 0,   // 七月 -> 寅宫
  8: 10,  // 八月 -> 子宫
  9: 8,   // 九月 -> 戌宫
  10: 6,  // 十月 -> 申宫
  11: 4,  // 十一月 -> 午宫
  12: 2   // 十二月 -> 辰宫
};

// ==================== 工具函数 ====================

/**
 * 标准化月份索引
 */
function NormalizeMonthIndex(lunarMonth: number): number {
  if (lunarMonth < 1 || lunarMonth > 12) {
    throw new Error(`无效的农历月份: ${lunarMonth}，应该在1-12之间`);
  }
  return lunarMonth;
}

/**
 * 计算阴煞星宫位索引
 * 根据月份固定宫位
 */
function GetYinShaPalaceIndex(lunarMonth: number): number {
  const normalizedMonth = NormalizeMonthIndex(lunarMonth);
  const palaceIndex = MonthToPalaceIndex[normalizedMonth];

  if (palaceIndex === undefined) {
    throw new Error(`未找到月份 ${normalizedMonth} 对应的阴煞宫位`);
  }

  return palaceIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取阴煞的索引
 *
 * @param lunarMonth 农历月份【1～12】
 * @returns 阴煞索引
 */
export function GetYinShaIndex(lunarMonth: number): YinShaPosition {
  // 步骤1: 计算阴煞星宫位索引
  const yinShaIndex = GetYinShaPalaceIndex(lunarMonth);

  return {
    yinShaIndex: yinShaIndex
  };
}

// ==================== 默认导出 ====================

export default GetYinShaIndex;
