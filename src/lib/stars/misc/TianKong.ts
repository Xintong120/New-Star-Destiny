/**
 * 天空星曜位置计算模块
 *
 * 职责：
 * - 根据出生年支计算天空的位置
 *
 * 算法说明：
 * 安天空诀：生年支顺数的下一位
 *
 * 天空星位置 = 生年支的后一个地支
 * 地支顺序：zi chou yin mao chen si woo wei shen you xu hai
 * 如果生年支是zi，下一位是chou
 * 如果生年支是chou，下一位是yin
 * 依此类推
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 天空位置结果
 */
export interface TianKongPosition {
  /** 天空索引 */
  tianKongIndex: number;
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
 * 获取后一个地支
 */
function GetNextEarthlyBranch(earthlyBranch: EarthlyBranchName): EarthlyBranchName {
  const branches: EarthlyBranchName[] = ['zi', 'chou', 'yin', 'mao', 'chen', 'si', 'woo', 'wei', 'shen', 'you', 'xu', 'hai'];
  const currentIndex = branches.indexOf(earthlyBranch);
  const nextIndex = (currentIndex + 1) % 12;
  return branches[nextIndex];
}

/**
 * 计算天空星宫位索引
 * 天空在生年支的后一个地支位置
 */
function GetTianKongPalaceIndex(earthlyBranch: EarthlyBranchName): number {
  const normalizedBranch = NormalizeEarthlyBranch(earthlyBranch);
  const nextBranch = GetNextEarthlyBranch(normalizedBranch);
  return EarthlyBranchToPalaceIndex[nextBranch];
}

// ==================== 核心计算函数 ====================

/**
 * 获取天空的索引
 *
 * @param earthlyBranch 生年支
 * @returns 天空索引
 */
export function GetTianKongIndex(earthlyBranch: EarthlyBranchName): TianKongPosition {
  // 步骤1: 计算天空星宫位索引
  const tianKongIndex = GetTianKongPalaceIndex(earthlyBranch);

  return {
    tianKongIndex: tianKongIndex
  };
}

// ==================== 默认导出 ====================

export default GetTianKongIndex;
