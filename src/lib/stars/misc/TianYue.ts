/**
 * 天月星曜位置计算模块
 *
 * 职责：
 * - 根据农历月份计算天月的位置
 *
 * 算法说明：
 * 一犬二蛇三在龙，四虎五羊六兔宫。
 * 七猪八羊九在虎，十马冬犬腊寅中。
 *
 * 按月份对应生肖宫位：
 * - 正月：犬（戌宫）
 * - 二月：蛇（巳宫）
 * - 三月：龙（辰宫）
 * - 四月：虎（寅宫）
 * - 五月：羊（未宫）
 * - 六月：兔（卯宫）
 * - 七月：猪（亥宫）
 * - 八月：羊（未宫）
 * - 九月：虎（寅宫）
 * - 十月：马（午宫）
 * - 冬月：犬（戌宫）
 * - 腊月：寅（寅宫）
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 天月位置结果
 */
export interface TianYuePosition {
  /** 天月索引 */
  tianYueIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 月份到宫位的映射（基于生肖）
 * 宫位索引：寅0卯1辰2巳3午4未5申6酉7戌8亥9子10丑11
 */
const MonthToPalaceIndex: Record<number, number> = {
  1: 8,   // 正月 -> 戌宫（犬）
  2: 3,   // 二月 -> 巳宫（蛇）
  3: 2,   // 三月 -> 辰宫（龙）
  4: 0,   // 四月 -> 寅宫（虎）
  5: 5,   // 五月 -> 未宫（羊）
  6: 1,   // 六月 -> 卯宫（兔）
  7: 9,   // 七月 -> 亥宫（猪）
  8: 5,   // 八月 -> 未宫（羊）
  9: 0,   // 九月 -> 寅宫（虎）
  10: 4,  // 十月 -> 午宫（马）
  11: 8,  // 冬月 -> 戌宫（犬）
  12: 0   // 腊月 -> 寅宫（寅）
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
 * 计算天月星宫位索引
 * 根据月份对应生肖宫位
 */
function GetTianYuePalaceIndex(lunarMonth: number): number {
  const normalizedMonth = NormalizeMonthIndex(lunarMonth);
  const palaceIndex = MonthToPalaceIndex[normalizedMonth];

  if (palaceIndex === undefined) {
    throw new Error(`未找到月份 ${normalizedMonth} 对应的天月宫位`);
  }

  return palaceIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取天月的索引
 *
 * @param lunarMonth 农历月份【1～12】
 * @returns 天月索引
 */
export function GetTianYueIndex(lunarMonth: number): TianYuePosition {
  // 步骤1: 计算天月星宫位索引
  const tianYueIndex = GetTianYuePalaceIndex(lunarMonth);

  return {
    tianYueIndex: tianYueIndex
  };
}

// ==================== 默认导出 ====================

export default GetTianYueIndex;
