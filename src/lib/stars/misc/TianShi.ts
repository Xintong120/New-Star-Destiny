/**
 * 天使星曜位置计算模块
 *
 * 职责：
 * - 天使星固定在疾厄宫
 *
 * 算法说明：
 * 天使星位置固定，始终位于疾厄宫
 * 疾厄宫在PalaceNames数组中的索引为5
 * 实际宫位索引 = (5 + 命宫索引) % 12
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 天使位置结果
 */
export interface TianShiPosition {
  /** 天使索引 */
  tianShiIndex: number;
}

// ==================== 工具函数 ====================

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

/**
 * 获取天使星宫位索引
 * 天使固定在疾厄宫，相对于命宫的位置
 *
 * @param soulIndex 命宫索引
 * @returns 天使宫位索引
 */
function GetTianShiPalaceIndex(soulIndex: number): number {
  // 疾厄宫在标准宫位名称中的索引为5
  const illnessPalaceNameIndex = 5;
  return FixIndex(illnessPalaceNameIndex + soulIndex);
}

// ==================== 核心计算函数 ====================

/**
 * 获取天使的索引
 *
 * @param soulIndex 命宫索引
 * @returns 天使索引
 */
export function GetTianShiIndex(soulIndex: number): TianShiPosition {
  // 步骤1: 计算天使星宫位索引
  const tianShiIndex = GetTianShiPalaceIndex(soulIndex);

  return {
    tianShiIndex: tianShiIndex
  };
}

// ==================== 默认导出 ====================

export default GetTianShiIndex;
