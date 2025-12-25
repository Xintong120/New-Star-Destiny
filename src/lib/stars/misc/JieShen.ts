/**
 * 解神星曜位置计算模块
 *
 * 职责：
 * - 根据农历月份计算解神的位置
 *
 * 算法说明：
 * 正二在申三四在戍，
 * 五六在子七八在寅。
 * 九十月坐於辰宫，
 * 十一十二在午宫。
 *
 * 按月份范围固定宫位：
 * - 正月、二月：申宫
 * - 三月、四月：戌宫
 * - 五月、六月：子宫
 * - 七月、八月：寅宫
 * - 九月、十月：辰宫
 * - 十一月、十二月：午宫
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 解神位置结果
 */
export interface JieShenPosition {
  /** 解神索引 */
  jieShenIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 月份到宫位的映射
 * 宫位索引：寅0卯1辰2巳3午4未5申6酉7戌8亥9子10丑11
 */
const MonthToPalaceIndex: Record<number, number> = {
  1: 6,   // 正月 -> 申宫
  2: 6,   // 二月 -> 申宫
  3: 8,   // 三月 -> 戌宫
  4: 8,   // 四月 -> 戌宫
  5: 10,  // 五月 -> 子宫
  6: 10,  // 六月 -> 子宫
  7: 0,   // 七月 -> 寅宫
  8: 0,   // 八月 -> 寅宫
  9: 2,   // 九月 -> 辰宫
  10: 2,  // 十月 -> 辰宫
  11: 4,  // 十一月 -> 午宫
  12: 4   // 十二月 -> 午宫
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
 * 计算解神星宫位索引
 * 根据月份范围固定宫位
 */
function GetJieShenPalaceIndex(lunarMonth: number): number {
  const normalizedMonth = NormalizeMonthIndex(lunarMonth);
  const palaceIndex = MonthToPalaceIndex[normalizedMonth];

  if (palaceIndex === undefined) {
    throw new Error(`未找到月份 ${normalizedMonth} 对应的解神宫位`);
  }

  return palaceIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取解神的索引
 *
 * @param lunarMonth 农历月份【1～12】
 * @returns 解神索引
 */
export function GetJieShenIndex(lunarMonth: number): JieShenPosition {
  // 步骤1: 计算解神星宫位索引
  const jieShenIndex = GetJieShenPalaceIndex(lunarMonth);

  return {
    jieShenIndex: jieShenIndex
  };
}

// ==================== 默认导出 ====================

export default GetJieShenIndex;
