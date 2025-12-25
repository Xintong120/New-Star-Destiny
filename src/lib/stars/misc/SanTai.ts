/**
 * 三台星曜位置计算模块
 *
 * 职责：
 * - 根据农历生日和左辅位置计算三台的位置
 *
 * 算法说明：
 * 安三台诀：
 * 由左辅之宫位起初一，顺行至生日安三台。
 *
 * 算法解析：
 * 1. 从左辅之宫作为1号顺数到出生日（农历）确定步数N
 * 2. 从左辅之宫位顺数N-1步确定三台位置
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 三台位置结果
 */
export interface SanTaiPosition {
  /** 三台索引 */
  sanTaiIndex: number;
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
 * 获取三台的索引
 *
 * @param lunarDay 农历生日【1～30】
 * @param zuoIndex 左辅宫位索引
 * @returns 三台索引
 */
export function GetSanTaiIndex(lunarDay: number, zuoIndex: number): SanTaiPosition {
  // 步骤1: 标准化输入
  const normalizedDay = NormalizeLunarDay(lunarDay);

  // 步骤2: 计算三台位置
  // 从左辅宫位顺数到生日确定步数N = normalizedDay
  // 从左辅宫位顺数N-1步确定三台位置
  const sanTaiIndex = FixIndex(zuoIndex + normalizedDay - 1);

  return {
    sanTaiIndex: sanTaiIndex
  };
}

// ==================== 默认导出 ====================

export default GetSanTaiIndex;