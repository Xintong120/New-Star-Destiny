/**
 * 蜚廉星曜位置计算模块
 *
 * 职责：
 * - 根据出生年支计算蜚廉的位置
 *
 * 算法说明：
 * 安蜚廉诀：子丑寅年在申酉戍，卯辰巳年在巳午未，
 * 午未申年在寅卯辰，酉戍亥年在亥子丑。
 *
 * 按年支固定宫位：
 * - 子年：申宫
 * - 丑年：酉宫
 * - 寅年：戌宫
 * - 卯年：巳宫
 * - 辰年：午宫
 * - 巳年：未宫
 * - 午年：寅宫
 * - 未年：卯宫
 * - 申年：辰宫
 * - 酉年：亥宫
 * - 戌年：子宫
 * - 亥年：丑宫
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 蜚廉位置结果
 */
export interface FeiLianPosition {
  /** 蜚廉索引 */
  feiLianIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 年支到蜚廉宫位的映射
 * 宫位索引：寅0卯1辰2巳3午4未5申6酉7戌8亥9子10丑11
 */
const EarthlyBranchToFeiLian: Record<string, number> = {
  '子': 6,   // 申宫
  '丑': 7,   // 酉宫
  '寅': 8,   // 戌宫
  '卯': 3,   // 巳宫
  '辰': 4,   // 午宫
  '巳': 5,   // 未宫
  '午': 0,   // 寅宫
  '未': 1,   // 卯宫
  '申': 2,   // 辰宫
  '酉': 9,   // 亥宫
  '戌': 10,  // 子宫
  '亥': 11   // 丑宫
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
 * 计算蜚廉星宫位索引
 * 根据年支返回宫位索引
 */
function GetFeiLianPalaceIndex(earthlyBranch: string): number {
  const normalizedBranch = NormalizeEarthlyBranch(earthlyBranch);
  const palaceIndex = EarthlyBranchToFeiLian[normalizedBranch];

  if (palaceIndex === undefined) {
    throw new Error(`未找到地支 ${normalizedBranch} 对应的蜚廉宫位`);
  }

  return palaceIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取蜚廉的索引
 *
 * @param earthlyBranch 生年支（如：'子'）
 * @returns 蜚廉索引
 */
export function GetFeiLianIndex(earthlyBranch: string): FeiLianPosition {
  // 步骤1: 计算蜚廉星宫位索引
  const feiLianIndex = GetFeiLianPalaceIndex(earthlyBranch);

  return {
    feiLianIndex: feiLianIndex
  };
}

// ==================== 默认导出 ====================

export default GetFeiLianIndex;