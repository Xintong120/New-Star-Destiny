/**
 * 咸池星曜位置计算模块
 *
 * 职责：
 * - 根据出生年支计算咸池的位置
 *
 * 算法说明：
 * 安咸池诀：子辰申年在酉，丑巳酉年在午，寅午戍年在卯，卯未亥年在子。
 *
 * 按年支分组固定宫位：
 * - 子、辰、申年：酉宫
 * - 丑、巳、酉年：午宫
 * - 寅、午、戌年：卯宫
 * - 卯、未、亥年：子宫
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 咸池位置结果
 */
export interface XianChiPosition {
  /** 咸池索引 */
  xianChiIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 年支到咸池宫位的映射
 * 宫位索引：寅0卯1辰2巳3午4未5申6酉7戌8亥9子10丑11
 */
const EarthlyBranchToXianChi: Record<string, number> = {
  // 子辰申年：酉宫
  '子': 7,   // 酉宫
  '辰': 7,   // 酉宫
  '申': 7,   // 酉宫

  // 丑巳酉年：午宫
  '丑': 4,   // 午宫
  '巳': 4,   // 午宫
  '酉': 4,   // 午宫

  // 寅午戍年：卯宫
  '寅': 1,   // 卯宫
  '午': 1,   // 卯宫
  '戌': 1,   // 卯宫

  // 卯未亥年：子宫
  '卯': 10,  // 子宫
  '未': 10,  // 子宫
  '亥': 10   // 子宫
};

// ==================== 工具函数 ====================

/**
 * 标准化地支名称
 */
function NormalizeEarthlyBranch(earthlyBranch: string): string {
  const validBranches: string[] = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  if (!validBranches.includes(earthlyBranch)) {
    throw new Error(`无效的地支: ${earthlyBranch}`);
  }
  return earthlyBranch;
}

/**
 * 计算咸池星宫位索引
 * 根据年支返回宫位索引
 */
function GetXianChiPalaceIndex(earthlyBranch: string): number {
  const normalizedBranch = NormalizeEarthlyBranch(earthlyBranch);
  const palaceIndex = EarthlyBranchToXianChi[normalizedBranch];

  if (palaceIndex === undefined) {
    throw new Error(`未找到地支 ${normalizedBranch} 对应的咸池宫位`);
  }

  return palaceIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取咸池的索引
 *
 * @param earthlyBranch 生年支（如：'子'）
 * @returns 咸池索引
 */
export function GetXianChiIndex(earthlyBranch: string): XianChiPosition {
  // 步骤1: 计算咸池星宫位索引
  const xianChiIndex = GetXianChiPalaceIndex(earthlyBranch);

  return {
    xianChiIndex: xianChiIndex
  };
}

// ==================== 默认导出 ====================

export default GetXianChiIndex;