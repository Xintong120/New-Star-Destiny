/**
 * 龙池星曜位置计算模块
 *
 * 职责：
 * - 根据出生年支计算龙池的位置
 *
 * 算法说明：
 * 安龙池凤阁诀：龙池从辰宫起子，
 * 顺至本生年支安之。
 *
 * 算法解析：
 * 1. 从子宫顺数到生年支确定步数N
 * 2. 从辰宫顺数N-1步确定龙池位置
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 龙池位置结果
 */
export interface LongChiPosition {
  /** 龙池索引 */
  longChiIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 地支到宫位索引的映射
 * 宫位索引：yin0 mao1 chen2 si3 woo4 wei5 shen6 you7 xu8 hai9 zi10 chou11
 */
const EarthlyBranchToPalaceIndex: Record<EarthlyBranchName, number> = {
  'yin': 0, 'mao': 1, 'chen': 2, 'si': 3, 'woo': 4, 'wei': 5,
  'shen': 6, 'you': 7, 'xu': 8, 'hai': 9, 'zi': 10, 'chou': 11
};

// ==================== 工具函数 ====================

/**
 * 标准化地支名称
 */
function NormalizeEarthlyBranch(earthlyBranch: EarthlyBranchName): EarthlyBranchName {
  const validBranches: EarthlyBranchName[] = ['zi', 'chou', 'yin', 'mao', 'chen', 'si', 'woo', 'wei', 'shen', 'you', 'xu', 'hai'];
  if (!validBranches.includes(earthlyBranch)) {
    throw new Error(`无效的地支: ${earthlyBranch}`);
  }
  return earthlyBranch;
}

/**
 * 计算龙池星宫位索引
 * 从子宫顺数到生年支确定步数，然后从辰宫顺数同样步数-1
 */
function GetLongChiPalaceIndex(earthlyBranch: EarthlyBranchName): number {
  const normalizedBranch = NormalizeEarthlyBranch(earthlyBranch);
  const branches: EarthlyBranchName[] = ['zi', 'chou', 'yin', 'mao', 'chen', 'si', 'woo', 'wei', 'shen', 'you', 'xu', 'hai'];

  // 从子宫开始顺数，计算到生年支的步数（子=1，丑=2，...）
  let steps = 0;
  for (let i = 0; i < branches.length; i++) {
    if (branches[i] === normalizedBranch) {
      steps = i + 1; // 步数从1开始
      break;
    }
  }

  // 从辰宫开始顺数 steps-1 步
  let resultIndex = 2; // 辰宫索引
  for (let i = 0; i < steps - 1; i++) {
    resultIndex = (resultIndex + 1) % 12;
  }

  return resultIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取龙池的索引
 *
 * @param earthlyBranch 生年支
 * @returns 龙池索引
 */
export function GetLongChiIndex(earthlyBranch: EarthlyBranchName): LongChiPosition {
  // 步骤1: 计算龙池星宫位索引
  const longChiIndex = GetLongChiPalaceIndex(earthlyBranch);

  return {
    longChiIndex: longChiIndex
  };
}

// ==================== 默认导出 ====================

export default GetLongChiIndex;