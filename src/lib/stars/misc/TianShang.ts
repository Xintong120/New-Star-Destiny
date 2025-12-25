/**
 * 天伤星曜位置计算模块
 *
 * 职责：
 * - 天伤星固定在仆役宫
 *
 * 算法说明：
 * 天伤星位置固定，始终位于仆役宫
 * 仆役宫在PalaceNames数组中的索引为7
 * 实际宫位索引 = (7 + 命宫索引) % 12
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 天伤位置结果
 */
export interface TianShangPosition {
  /** 天伤索引 */
  tianShangIndex: number;
}

// ==================== 工具函数 ====================

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

/**
 * 获取天伤星宫位索引
 * 天伤固定在仆役宫，相对于命宫的位置
 *
 * @param soulIndex 命宫索引
 * @returns 天伤宫位索引
 */
function GetTianShangPalaceIndex(soulIndex: number): number {
  // 仆役宫在标准宫位名称中的索引为7
  const servantPalaceNameIndex = 7;
  return FixIndex(servantPalaceNameIndex + soulIndex);
}

// ==================== 核心计算函数 ====================

/**
 * 获取天伤的索引
 *
 * @param soulIndex 命宫索引
 * @returns 天伤索引
 */
export function GetTianShangIndex(soulIndex: number): TianShangPosition {
  // 步骤1: 计算天伤星宫位索引
  const tianShangIndex = GetTianShangPalaceIndex(soulIndex);

  return {
    tianShangIndex: tianShangIndex
  };
}

// ==================== 默认导出 ====================

export default GetTianShangIndex;
