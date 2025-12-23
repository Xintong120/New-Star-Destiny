/**
 * 文昌文曲星曜位置计算模块
 *
 * 职责：
 * - 根据时辰计算文昌文曲的位置（按时支）
 * - 根据天干计算流昌流曲的位置（大限/流年用）
 *
 * 算法说明：
 * 按时辰：
 * - 辰上顺时文曲位：从辰宫顺数到时辰地支索引是文曲的索引
 * - 戌上逆时觅文昌：从戌宫逆数到时辰地支索引是文昌的索引
 *
 * 按天干：
 * - 流昌起巳位，甲乙顺流去，不用四墓宫，日月同年岁
 * - 流曲起酉位，甲乙逆行踪，亦不用四墓，年日月相同
 */

import type { HeavenlyStemName, EarthlyBranchName } from './types';

// ==================== 类型定义 ====================

/**
 * 文昌文曲位置结果
 */
export interface ChangQuPosition {
  /** 文昌索引 */
  changIndex: number;
  /** 文曲索引 */
  quIndex: number;
}

// ==================== 常量定义 ====================

// 辰宫索引（文曲起始位置）
const ChenIndex = 2;

// 戌宫索引（文昌起始位置）
const XuIndex = 8;

/**
 * 天干键值类型
 */
type HeavenlyStemKey =
  | 'jiaHeavenly' | 'yiHeavenly' | 'bingHeavenly' | 'dingHeavenly' | 'wuHeavenly'
  | 'jiHeavenly' | 'gengHeavenly' | 'xinHeavenly' | 'renHeavenly' | 'guiHeavenly';

/**
 * 天干到流昌流曲位置的映射表
 */
const HeavenlyStemToChangQu: Record<HeavenlyStemKey, {chang: EarthlyBranchName, qu: EarthlyBranchName}> = {
  jiaHeavenly: { chang: 'si', qu: 'you' },
  yiHeavenly: { chang: 'woo', qu: 'shen' },
  bingHeavenly: { chang: 'shen', qu: 'woo' },
  wuHeavenly: { chang: 'shen', qu: 'woo' },
  dingHeavenly: { chang: 'you', qu: 'si' },
  jiHeavenly: { chang: 'you', qu: 'si' },
  gengHeavenly: { chang: 'hai', qu: 'mao' },
  xinHeavenly: { chang: 'zi', qu: 'yin' },
  renHeavenly: { chang: 'yin', qu: 'zi' },
  guiHeavenly: { chang: 'mao', qu: 'hai' }
};

/**
 * 天干名称到键值的映射
 */
const HeavenlyStemNameToKey: Record<HeavenlyStemName, HeavenlyStemKey> = {
  '甲': 'jiaHeavenly',
  '乙': 'yiHeavenly',
  '丙': 'bingHeavenly',
  '丁': 'dingHeavenly',
  '戊': 'wuHeavenly',
  '己': 'jiHeavenly',
  '庚': 'gengHeavenly',
  '辛': 'xinHeavenly',
  '壬': 'renHeavenly',
  '癸': 'guiHeavenly'
};

/**
 * 地支名称到索引的映射
 */
const EarthlyBranchToIndex: Record<EarthlyBranchName, number> = {
  'zi': 10, 'chou': 11, 'yin': 0, 'mao': 1, 'chen': 2, 'si': 3,
  'woo': 4, 'wei': 5, 'shen': 6, 'you': 7, 'xu': 8, 'hai': 9
};

// ==================== 工具函数 ====================

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

/**
 * 获取地支索引
 */
function GetEarthlyBranchIndex(branchName: EarthlyBranchName): number {
  return EarthlyBranchToIndex[branchName] ?? 0;
}

/**
 * 标准化时辰索引
 */
function NormalizeTimeIndex(timeIndex: number): number {
  if (timeIndex < 0 || timeIndex > 12) {
    throw new Error(`无效的时辰索引: ${timeIndex}，应该在0-12之间`);
  }
  // 晚子时（12）转换为子时（0）
  return timeIndex === 12 ? 0 : timeIndex;
}

/**
 * 转换天干名称为内部键值
 */
function ConvertHeavenlyStemToKey(heavenlyStemName: HeavenlyStemName): HeavenlyStemKey {
  const key = HeavenlyStemNameToKey[heavenlyStemName];
  if (!key) {
    throw new Error(`无效的天干名称: ${heavenlyStemName}`);
  }
  return key;
}

/**
 * 从映射表查找位置
 */
function LookupFromMapping<T>(mapping: Record<string, T>, key: string): T {
  const result = mapping[key];
  if (!result) {
    throw new Error(`映射表中未找到键值: ${key}`);
  }
  return result;
}

/**
 * 计算顺时针星曜位置
 */
function CalculateForwardStarIndex(startIndex: number, offset: number): number {
  return FixIndex(startIndex + offset);
}

/**
 * 计算逆时针星曜位置
 */
function CalculateReverseStarIndex(startIndex: number, offset: number): number {
  return FixIndex(startIndex - offset);
}

// ==================== 核心计算函数 ====================

/**
 * 获取文昌文曲的索引（按时辰）
 *
 * @param timeIndex 时辰索引【0～12】
 * @returns 文昌、文曲索引
 */
export function GetChangQuIndex(timeIndex: number): ChangQuPosition {
  // 步骤1: 标准化输入
  const normalizedTimeIndex = NormalizeTimeIndex(timeIndex);

  // 步骤2: 并行计算两个星曜位置
  return {
    // 文昌：从戌宫逆时针计算
    changIndex: CalculateReverseStarIndex(XuIndex, normalizedTimeIndex),
    // 文曲：从辰宫顺时针计算
    quIndex: CalculateForwardStarIndex(ChenIndex, normalizedTimeIndex)
  };
}

/**
 * 通过天干获取流昌流曲的索引
 *
 * @param heavenlyStemName 天干名称
 * @returns 文昌、文曲索引
 */
export function GetChangQuIndexByHeavenlyStem(heavenlyStemName: HeavenlyStemName): ChangQuPosition {
  // 步骤1：转换为内部键值
  const heavenlyStem = ConvertHeavenlyStemToKey(heavenlyStemName);

  // 步骤2：查找文昌文曲位置
  const positions = LookupFromMapping(HeavenlyStemToChangQu, heavenlyStem);

  // 步骤3：计算最终索引
  const changIndex = GetEarthlyBranchIndex(positions.chang);
  const quIndex = GetEarthlyBranchIndex(positions.qu);

  return { changIndex, quIndex };
}

// ==================== 默认导出 ====================

export default GetChangQuIndex;
