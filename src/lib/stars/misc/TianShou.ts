/**
 * 天寿星曜位置计算模块
 *
 * 职责：
 * - 根据出生年支和身宫计算天寿的位置
 *
 * 算法说明：
 * 安天才天寿诀：天寿由身宫起子，顺行至本生年支安之。
 *
 * 算法解析：
 * 1. 从子宫顺数到生年支确定步数N
 * 2. 从身宫顺数N-1步确定天寿位置
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 天寿位置结果
 */
export interface TianShouPosition {
  /** 天寿索引 */
  tianShouIndex: number;
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
 * 计算天寿星宫位索引
 * 从身宫顺数N-1步
 */
function GetTianShouPalaceIndex(bodyIndex: number, earthlyBranch: string): number {
  const steps = GetStepsToEarthlyBranch(earthlyBranch);
  return FixIndex(bodyIndex + steps - 1);
}

// ==================== 核心计算函数 ====================

/**
 * 获取天寿的索引
 *
 * @param bodyIndex 身宫索引
 * @param earthlyBranch 生年支（如：'子'）
 * @returns 天寿索引
 */
export function GetTianShouIndex(bodyIndex: number, earthlyBranch: string): TianShouPosition {
  // 步骤1: 计算天寿星宫位索引
  const tianShouIndex = GetTianShouPalaceIndex(bodyIndex, earthlyBranch);

  return {
    tianShouIndex: tianShouIndex
  };
}

// ==================== 默认导出 ====================

export default GetTianShouIndex;