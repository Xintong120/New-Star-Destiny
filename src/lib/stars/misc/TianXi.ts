/**
 * 天喜星曜位置计算模块
 *
 * 职责：
 * - 根据出生年支计算天喜的位置
 *
 * 算法说明：
 * 安红鸾天喜诀：卯上起子逆数之，
 * 数到当生太岁支。
 * 坐守此宫红鸾位，对宫天喜不差移。
 *
 * 算法解析：
 * 1. 从子宫顺数到生年支确定步数N
 * 2. 从卯宫逆数N-1步确定红鸾位置
 * 3. 红鸾宫位的index+6,就是天喜的宫位
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 天喜位置结果
 */
export interface TianXiPosition {
  /** 天喜索引 */
  tianXiIndex: number;
}

// ==================== 工具函数 ====================

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

/**
 * 计算天喜星宫位索引
 * 天喜在红鸾的对宫，即红鸾位置 + 6
 *
 * @param hongLuanIndex 红鸾宫位索引
 * @returns 天喜宫位索引
 */
function GetTianXiPalaceIndex(hongLuanIndex: number): number {
  return FixIndex(hongLuanIndex + 6);
}

// ==================== 核心计算函数 ====================

/**
 * 获取天喜的索引
 *
 * @param hongLuanIndex 红鸾宫位索引
 * @returns 天喜索引
 */
export function GetTianXiIndex(hongLuanIndex: number): TianXiPosition {
  // 步骤1: 计算天喜星宫位索引
  const tianXiIndex = GetTianXiPalaceIndex(hongLuanIndex);

  return {
    tianXiIndex: tianXiIndex
  };
}

// ==================== 默认导出 ====================

export default GetTianXiIndex;