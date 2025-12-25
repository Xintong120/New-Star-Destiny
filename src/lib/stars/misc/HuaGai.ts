/**
 * 华盖星曜位置计算模块
 *
 * 职责：
 * - 根据出生年支计算华盖的位置
 *
 * 算法说明：
 * 安华盖诀：子辰申年在辰，丑巳酉年在丑，寅午戍年在戍，卯未亥年在未。
 *
 * 按年支分组固定宫位：
 * - 子、辰、申年：辰宫
 * - 丑、巳、酉年：丑宫
 * - 寅、午、戌年：戌宫
 * - 卯、未、亥年：未宫
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 华盖位置结果
 */
export interface HuaGaiPosition {
  /** 华盖索引 */
  huaGaiIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 年支到华盖宫位的映射
 * 宫位索引：寅0卯1辰2巳3午4未5申6酉7戌8亥9子10丑11
 */
const EarthlyBranchToHuaGai: Record<string, number> = {
  // 子辰申年：辰宫
  '子': 2,   // 辰宫
  '辰': 2,   // 辰宫
  '申': 2,   // 辰宫

  // 丑巳酉年：丑宫
  '丑': 11,  // 丑宫
  '巳': 11,  // 丑宫
  '酉': 11,  // 丑宫

  // 寅午戍年：戌宫
  '寅': 8,   // 戌宫
  '午': 8,   // 戌宫
  '戌': 8,   // 戌宫

  // 卯未亥年：未宫
  '卯': 5,   // 未宫
  '未': 5,   // 未宫
  '亥': 5    // 未宫
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
 * 计算华盖星宫位索引
 * 根据年支返回宫位索引
 */
function GetHuaGaiPalaceIndex(earthlyBranch: string): number {
  const normalizedBranch = NormalizeEarthlyBranch(earthlyBranch);
  const palaceIndex = EarthlyBranchToHuaGai[normalizedBranch];

  if (palaceIndex === undefined) {
    throw new Error(`未找到地支 ${normalizedBranch} 对应的华盖宫位`);
  }

  return palaceIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取华盖的索引
 *
 * @param earthlyBranch 生年支（如：'子'）
 * @returns 华盖索引
 */
export function GetHuaGaiIndex(earthlyBranch: string): HuaGaiPosition {
  // 步骤1: 计算华盖星宫位索引
  const huaGaiIndex = GetHuaGaiPalaceIndex(earthlyBranch);

  return {
    huaGaiIndex: huaGaiIndex
  };
}

// ==================== 默认导出 ====================

export default GetHuaGaiIndex;