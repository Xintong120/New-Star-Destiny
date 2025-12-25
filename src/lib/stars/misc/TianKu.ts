/**
 * 天哭星曜位置计算模块
 *
 * 职责：
 * - 根据出生年支计算天哭的位置
 *
 * 算法说明：
 * 安天哭天虚诀：天哭天虚起午宫，午宫起子两分踪，
 * 哭逆行兮虚顺转，数到生年便停留。
 *
 * 算法解析：
 * 1. 从子宫顺数到生年支确定步数N
 * 2. 从午宫逆数N步确定天哭位置
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 天哭位置结果
 */
export interface TianKuPosition {
  /** 天哭索引 */
  tianKuIndex: number;
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
 * 计算天哭星宫位索引
 * 从子宫顺数到生年支确定步数，然后从午宫逆数同样步数
 */
function GetTianKuPalaceIndex(earthlyBranch: EarthlyBranchName): number {
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

  // 从午宫开始逆数 steps 步
  let resultIndex = 5; // 未宫索引 
  //因为午宫是开始的第一步
  for (let i = 0; i < steps; i++) {
    resultIndex = (resultIndex - 1 + 12) % 12;
  }

  return resultIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取天哭的索引
 *
 * @param earthlyBranch 生年支
 * @returns 天哭索引
 */
export function GetTianKuIndex(earthlyBranch: EarthlyBranchName): TianKuPosition {
  // 步骤1: 计算天哭星宫位索引
  const tianKuIndex = GetTianKuPalaceIndex(earthlyBranch);

  return {
    tianKuIndex: tianKuIndex
  };
}

// ==================== 默认导出 ====================

export default GetTianKuIndex;
