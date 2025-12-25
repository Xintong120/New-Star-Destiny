/**
 * 截空星曜位置计算模块
 *
 * 职责：
 * - 根据出生年份天干计算截空的位置
 *
 * 算法说明：
 * 甲己之年申酉，
 * 乙庚之年午未，
 * 丙辛之年辰巳，
 * 丁壬之年寅卯，
 * 戊癸之年子丑。
 *
 * 按年干固定宫位（两个宫位）：
 * - 甲、己年：申宫、酉宫
 * - 乙、庚年：午宫、未宫
 * - 丙、辛年：辰宫、巳宫
 * - 丁、壬年：寅宫、卯宫
 * - 戊、癸年：子宫、丑宫
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 截空位置结果
 */
export interface JieKongPosition {
  /** 截空索引 */
  jieKongIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 年干到宫位的映射
 * 宫位索引：寅0卯1辰2巳3午4未5申6酉7戌8亥9子10丑11
 */
const HeavenlyStemToPalaceIndex: Record<HeavenlyStemName, number> = {
  '甲': 6,   // 申宫
  '乙': 4,   // 午宫
  '丙': 2,   // 辰宫
  '丁': 0,   // 寅宫
  '戊': 10,  // 子宫
  '己': 7,   // 酉宫
  '庚': 5,   // 未宫
  '辛': 3,   // 巳宫
  '壬': 1,   // 卯宫
  '癸': 11   // 丑宫
};

// ==================== 工具函数 ====================

/**
 * 标准化天干名称
 */
function NormalizeHeavenlyStem(heavenlyStem: HeavenlyStemName): HeavenlyStemName {
  const validStems: HeavenlyStemName[] = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
  if (!validStems.includes(heavenlyStem)) {
    throw new Error(`无效的天干: ${heavenlyStem}`);
  }
  return heavenlyStem;
}

/**
 * 计算截空星宫位索引
 * 根据年干返回宫位索引
 */
function GetJieKongPalaceIndex(heavenlyStem: HeavenlyStemName): number {
  const normalizedStem = NormalizeHeavenlyStem(heavenlyStem);
  const palaceIndex = HeavenlyStemToPalaceIndex[normalizedStem];

  if (palaceIndex === undefined) {
    throw new Error(`未找到天干 ${normalizedStem} 对应的截空宫位`);
  }

  return palaceIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取截空的索引
 *
 * @param heavenlyStem 年干名称
 * @returns 截空索引数组
 */
export function GetJieKongIndex(heavenlyStem: HeavenlyStemName): JieKongPosition {
  // 步骤1: 计算截空星宫位索引
  const jieKongIndex = GetJieKongPalaceIndex(heavenlyStem);

  return {
    jieKongIndex: jieKongIndex
  };
}

// ==================== 默认导出 ====================

export default GetJieKongIndex;
