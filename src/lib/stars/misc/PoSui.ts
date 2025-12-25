/**
 * 破碎星曜位置计算模块
 *
 * 职责：
 * - 根据出生年支计算破碎的位置
 *
 * 算法说明：
 * 安破碎诀：子午卯酉年安巳宫，寅申巳亥年安酉宫，辰戍丑未年安丑宫。
 *
 * 按年支分组固定宫位：
 * - 子、午、卯、酉年：巳宫
 * - 寅、申、巳、亥年：酉宫
 * - 辰、戌、丑、未年：丑宫
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 破碎位置结果
 */
export interface PoSuiPosition {
  /** 破碎索引 */
  poSuiIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 年支到破碎宫位的映射
 * 宫位索引：寅0卯1辰2巳3午4未5申6酉7戌8亥9子10丑11
 */
const EarthlyBranchToPoSui: Record<string, number> = {
  // 子午卯酉年：巳宫
  '子': 3,   // 巳宫
  '午': 3,   // 巳宫
  '卯': 3,   // 巳宫
  '酉': 3,   // 巳宫

  // 寅申巳亥年：酉宫
  '寅': 7,   // 酉宫
  '申': 7,   // 酉宫
  '巳': 7,   // 酉宫
  '亥': 7,   // 酉宫

  // 辰戍丑未年：丑宫
  '辰': 11,  // 丑宫
  '戌': 11,  // 丑宫
  '丑': 11,  // 丑宫
  '未': 11   // 丑宫
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
 * 计算破碎星宫位索引
 * 根据年支返回宫位索引
 */
function GetPoSuiPalaceIndex(earthlyBranch: string): number {
  const normalizedBranch = NormalizeEarthlyBranch(earthlyBranch);
  const palaceIndex = EarthlyBranchToPoSui[normalizedBranch];

  if (palaceIndex === undefined) {
    throw new Error(`未找到地支 ${normalizedBranch} 对应的破碎宫位`);
  }

  return palaceIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取破碎的索引
 *
 * @param earthlyBranch 生年支（如：'子'）
 * @returns 破碎索引
 */
export function GetPoSuiIndex(earthlyBranch: string): PoSuiPosition {
  // 步骤1: 计算破碎星宫位索引
  const poSuiIndex = GetPoSuiPalaceIndex(earthlyBranch);

  return {
    poSuiIndex: poSuiIndex
  };
}

// ==================== 默认导出 ====================

export default GetPoSuiIndex;