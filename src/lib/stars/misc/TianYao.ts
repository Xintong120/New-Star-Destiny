/**
 * 天姚星曜位置计算模块
 *
 * 职责：
 * - 根据农历月份计算天姚的位置
 *
 * 算法说明：
 * 天姚丑宫起正月，顺到生月即停留。
 * 从丑宫开始，顺时针数到出生月份对应的宫位。
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 天姚位置结果
 */
export interface TianYaoPosition {
  /** 天姚索引 */
  tianYaoIndex: number;
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
 * 计算天姚星宫位索引
 * 从丑宫开始，顺数到月份位置
 */
function GetTianYaoPalaceIndex(lunarMonth: number): number {
  // 丑宫索引 = 11，从丑宫顺数 (lunarMonth - 1) 步
  const chouIndex = 11;
  const offset = NormalizeMonthIndex(lunarMonth);
  return FixIndex(chouIndex + offset);
}

// ==================== 核心计算函数 ====================

/**
 * 获取天姚的索引
 *
 * @param lunarMonth 农历月份【1～12】
 * @returns 天姚索引
 */
export function GetTianYaoIndex(lunarMonth: number): TianYaoPosition {
  // 步骤1: 计算天姚星宫位索引
  const tianYaoIndex = GetTianYaoPalaceIndex(lunarMonth);

  return {
    tianYaoIndex: tianYaoIndex
  };
}

// ==================== 默认导出 ====================

export default GetTianYaoIndex;
