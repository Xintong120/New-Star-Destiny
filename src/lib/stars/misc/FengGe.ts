/**
 * 凤阁星曜位置计算模块
 *
 * 职责：
 * - 根据出生年支计算凤阁的位置
 *
 * 算法说明：
 * 安龙池凤阁诀：凤阁从戍宫起子，
 * 逆行至本生年支安之。
 *
 * 算法解析：
 * 1. 从子宫顺数到生年支确定步数N
 * 2. 从戍宫逆数N-1步确定凤阁位置
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 凤阁位置结果
 */
export interface FengGePosition {
  /** 凤阁索引 */
  fengGeIndex: number;
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
 * 计算凤阁星宫位索引
 * 从子宫顺数到生年支确定步数，然后从戍宫逆数同样步数-1
 */
function GetFengGePalaceIndex(earthlyBranch: EarthlyBranchName): number {
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

  // 从戍宫开始逆数 steps-1 步
  let resultIndex = 8; // 戍宫索引
  for (let i = 0; i < steps - 1; i++) {
    resultIndex = (resultIndex - 1 + 12) % 12;
  }

  return resultIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取凤阁的索引
 *
 * @param earthlyBranch 生年支
 * @returns 凤阁索引
 */
export function GetFengGeIndex(earthlyBranch: EarthlyBranchName): FengGePosition {
  // 步骤1: 计算凤阁星宫位索引
  const fengGeIndex = GetFengGePalaceIndex(earthlyBranch);

  return {
    fengGeIndex: fengGeIndex
  };
}

// ==================== 默认导出 ====================

export default GetFengGeIndex;