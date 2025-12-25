/**
 * 封诰星曜位置计算模块
 *
 * 职责：
 * - 根据时辰计算封诰的位置
 *
 * 算法说明：
 * 封诰寅宫来起子，顺到生时是贵方。
 * 从寅宫顺时针数到出生时辰对应的宫位。
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 封诰位置结果
 */
export interface FengGaoPosition {
  /** 封诰索引 */
  fengGaoIndex: number;
}

// ==================== 工具函数 ====================

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

/**
 * 标准化时辰索引
 */
function NormalizeTimeIndex(timeIndex: number): number {
  if (timeIndex < 0 || timeIndex > 12) {
    throw new Error(`无效的时辰索引: ${timeIndex}，应该在0-12之间`);
  }
  // 晚子时（12）转换为子时（0）
  return timeIndex === 12 ? 0 : timeIndex;
}

/**
 * 计算封诰星宫位索引
 * 从寅宫开始，顺数到时辰位置
 */
function GetFengGaoPalaceIndex(timeIndex: number): number {
  // 寅宫索引 = 0，从寅宫顺数 timeIndex 步
  const yinIndex = 0;
  return FixIndex(yinIndex + timeIndex);
}

// ==================== 核心计算函数 ====================

/**
 * 获取封诰的索引
 *
 * @param timeIndex 时辰索引【0～12】
 * @returns 封诰索引
 */
export function GetFengGaoIndex(timeIndex: number): FengGaoPosition {
  // 步骤1: 标准化输入
  const normalizedTimeIndex = NormalizeTimeIndex(timeIndex);

  // 步骤2: 计算封诰星宫位索引
  const fengGaoIndex = GetFengGaoPalaceIndex(normalizedTimeIndex);

  return {
    fengGaoIndex: fengGaoIndex
  };
}

// ==================== 默认导出 ====================

export default GetFengGaoIndex;
