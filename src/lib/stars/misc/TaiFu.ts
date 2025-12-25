/**
 * 台辅星曜位置计算模块
 *
 * 职责：
 * - 根据时辰计算台辅的位置
 *
 * 算法说明：
 * 台辅星从午宫起，顺至生时是贵乡。
 * 从午宫顺时针数到出生时辰对应的宫位。
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 台辅位置结果
 */
export interface TaiFuPosition {
  /** 台辅索引 */
  taiFuIndex: number;
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
 * 计算台辅星宫位索引
 * 从午宫开始，顺数到时辰位置
 */
function GetTaiFuPalaceIndex(timeIndex: number): number {
  // 午宫索引 = 4，从午宫顺数 timeIndex 步
  const wuIndex = 4;
  return FixIndex(wuIndex + timeIndex);
}

// ==================== 核心计算函数 ====================

/**
 * 获取台辅的索引
 *
 * @param timeIndex 时辰索引【0～12】
 * @returns 台辅索引
 */
export function GetTaiFuIndex(timeIndex: number): TaiFuPosition {
  // 步骤1: 标准化输入
  const normalizedTimeIndex = NormalizeTimeIndex(timeIndex);

  // 步骤2: 计算台辅星宫位索引
  const taiFuIndex = GetTaiFuPalaceIndex(normalizedTimeIndex);

  return {
    taiFuIndex: taiFuIndex
  };
}

// ==================== 默认导出 ====================

export default GetTaiFuIndex;
