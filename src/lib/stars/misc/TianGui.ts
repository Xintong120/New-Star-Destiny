/**
 * 天贵星曜位置计算模块
 *
 * 职责：
 * - 根据农历生日和文曲位置计算天贵的位置
 *
 * 算法说明：
 * 安恩光天贵诀：
 * 由文曲之宫位起初一，顺行至生日再退一步起天贵。
 *
 * 算法解析：
 * 1. 从文曲之宫作为1号顺数到出生日（农历）确定步数N
 * 2. 从文曲之宫位顺数N-2步确定天贵位置
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 天贵位置结果
 */
export interface TianGuiPosition {
  /** 天贵索引 */
  tianGuiIndex: number;
}

// ==================== 工具函数 ====================

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

/**
 * 标准化农历日
 */
function NormalizeLunarDay(lunarDay: number): number {
  if (lunarDay < 1 || lunarDay > 30) {
    throw new Error(`无效的农历日: ${lunarDay}，应该在1-30之间`);
  }
  return lunarDay;
}

// ==================== 核心计算函数 ====================

/**
 * 获取天贵的索引
 *
 * @param lunarDay 农历生日【1～30】
 * @param quIndex 文曲宫位索引
 * @returns 天贵索引
 */
export function GetTianGuiIndex(lunarDay: number, quIndex: number): TianGuiPosition {
  // 步骤1: 标准化输入
  const normalizedDay = NormalizeLunarDay(lunarDay);

  // 步骤2: 计算天贵位置
  // 从文曲宫位顺数到生日确定步数N = normalizedDay
  // 从文曲宫位顺数N-2步确定天贵位置
  const tianGuiIndex = FixIndex(quIndex + normalizedDay - 2);

  return {
    tianGuiIndex: tianGuiIndex
  };
}

// ==================== 默认导出 ====================

export default GetTianGuiIndex;