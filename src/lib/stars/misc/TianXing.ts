/**
 * 天刑星曜位置计算模块
 *
 * 职责：
 * - 根据农历月份计算天刑的位置
 *
 * 算法说明：
 * 天刑从酉起正月，顺至生月便安之。
 * 从酉宫开始，顺时针数到出生月份对应的宫位。
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 天刑位置结果
 */
export interface TianXingPosition {
  /** 天刑索引 */
  tianXingIndex: number;
}

// ==================== 工具函数 ====================

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

/**
 * 标准化月份索引
 */
function NormalizeMonthIndex(lunarMonth: number): number {
  if (lunarMonth < 1 || lunarMonth > 12) {
    throw new Error(`无效的农历月份: ${lunarMonth}，应该在1-12之间`);
  }
  return lunarMonth - 1; // 转换为0-based索引
}

/**
 * 计算天刑星宫位索引
 * 从酉宫开始，顺数到月份位置
 */
function GetTianXingPalaceIndex(lunarMonth: number): number {
  // 酉宫索引 = 7，从酉宫顺数 (lunarMonth - 1) 步
  const youIndex = 7;
  const offset = NormalizeMonthIndex(lunarMonth);
  return FixIndex(youIndex + offset);
}

// ==================== 核心计算函数 ====================

/**
 * 获取天刑的索引
 *
 * @param lunarMonth 农历月份【1～12】
 * @returns 天刑索引
 */
export function GetTianXingIndex(lunarMonth: number): TianXingPosition {
  // 步骤1: 计算天刑星宫位索引
  const tianXingIndex = GetTianXingPalaceIndex(lunarMonth);

  return {
    tianXingIndex: tianXingIndex
  };
}

// ==================== 默认导出 ====================

export default GetTianXingIndex;
