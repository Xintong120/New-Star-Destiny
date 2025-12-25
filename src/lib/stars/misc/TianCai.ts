/**
 * 天才星曜位置计算模块
 *
 * 职责：
 * - 根据出生年支和命宫计算天才的位置
 *
 * 算法说明：
 * 安天才天寿诀：天才由命宫起子，顺行至本生年支安之。
 *
 * 算法解析：
 * 1. 从子宫顺数到生年支确定步数N
 * 2. 从命宫顺数N-1步确定天才位置
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 天才位置结果
 */
export interface TianCaiPosition {
  /** 天才索引 */
  tianCaiIndex: number;
}

// ==================== 工具函数 ====================

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

/**
 * 计算从子宫到生年支的步数
 */
function GetStepsToEarthlyBranch(earthlyBranch: string): number {
  const branches: string[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];

  // 从子宫开始顺数，计算到生年支的步数（子=1，丑=2，...）
  for (let i = 0; i < branches.length; i++) {
    if (branches[i] === earthlyBranch) {
      return i + 1; // 步数从1开始
    }
  }

  throw new Error(`无效的地支: ${earthlyBranch}`);
}

/**
 * 计算天才星宫位索引
 * 从命宫顺数N-1步
 */
function GetTianCaiPalaceIndex(soulIndex: number, earthlyBranch: string): number {
  const steps = GetStepsToEarthlyBranch(earthlyBranch);
  return FixIndex(soulIndex + steps - 1);
}

// ==================== 核心计算函数 ====================

/**
 * 获取天才的索引
 *
 * @param soulIndex 命宫索引
 * @param earthlyBranch 生年支（如：'子'）
 * @returns 天才索引
 */
export function GetTianCaiIndex(soulIndex: number, earthlyBranch: string): TianCaiPosition {
  // 步骤1: 计算天才星宫位索引
  const tianCaiIndex = GetTianCaiPalaceIndex(soulIndex, earthlyBranch);

  return {
    tianCaiIndex: tianCaiIndex
  };
}

// ==================== 默认导出 ====================

export default GetTianCaiIndex;