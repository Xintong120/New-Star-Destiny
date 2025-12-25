/**
 * 恩光星曜位置计算模块
 *
 * 职责：
 * - 根据农历生日和文昌位置计算恩光的位置
 *
 * 算法说明：
 * 安恩光天贵诀：
 * 由文昌之宫位起初一，顺行至生日再退一步起恩光。
 *
 * 算法解析：
 * 1. 从文昌之宫作为1号顺数到出生日（农历）确定步数N
 * 2. 从文昌之宫位顺数N-2步确定恩光位置
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 恩光位置结果
 */
export interface EnGuangPosition {
  /** 恩光索引 */
  enGuangIndex: number;
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
 * 获取恩光的索引
 *
 * @param lunarDay 农历生日【1～30】
 * @param changIndex 文昌宫位索引
 * @returns 恩光索引
 */
export function GetEnGuangIndex(lunarDay: number, changIndex: number): EnGuangPosition {
  // 步骤1: 标准化输入
  const normalizedDay = NormalizeLunarDay(lunarDay);

  // 步骤2: 计算恩光位置
  // 从文昌宫位顺数到生日确定步数N = normalizedDay
  // 从文昌宫位顺数N-2步确定恩光位置
  const enGuangIndex = FixIndex(changIndex + normalizedDay - 2);

  return {
    enGuangIndex: enGuangIndex
  };
}

// ==================== 默认导出 ====================

export default GetEnGuangIndex;