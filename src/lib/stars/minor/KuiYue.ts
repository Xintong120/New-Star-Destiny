/**
 * 天魁天钺星曜位置计算模块
 *
 * 职责：
 * - 根据天干计算天魁天钺的位置
 *
 * 算法说明：
 * 天魁天钺按天干起例，每个天干对应固定的天魁天钺位置
 */

import type { HeavenlyStemName, EarthlyBranchName } from './types';

// ==================== 类型定义 ====================

/**
 * 天魁天钺位置结果
 */
export interface KuiYuePosition {
  /** 天魁索引 */
  kuiIndex: number;
  /** 天钺索引 */
  yueIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 天干键值类型
 */
type HeavenlyStemKey =
  | 'jiaHeavenly' | 'yiHeavenly' | 'bingHeavenly' | 'dingHeavenly' | 'wuHeavenly'
  | 'jiHeavenly' | 'gengHeavenly' | 'xinHeavenly' | 'renHeavenly' | 'guiHeavenly';

/**
 * 天干到天魁天钺位置的映射表
 *
 * 规律：
 * - 甲戊庚：天魁在丑，天钺在未
 * - 乙己：天魁在子，天钺在申
 * - 辛：天魁在午，天钺在寅
 * - 丙丁：天魁在亥，天钺在酉
 * - 壬癸：天魁在卯，天钺在巳
 */
const HeavenlyStemToKuiYue: Record<HeavenlyStemKey, {kui: EarthlyBranchName, yue: EarthlyBranchName}> = {
  jiaHeavenly: { kui: 'chou', yue: 'wei' },
  wuHeavenly: { kui: 'chou', yue: 'wei' },
  gengHeavenly: { kui: 'chou', yue: 'wei' },
  yiHeavenly: { kui: 'zi', yue: 'shen' },
  jiHeavenly: { kui: 'zi', yue: 'shen' },
  xinHeavenly: { kui: 'woo', yue: 'yin' },
  bingHeavenly: { kui: 'hai', yue: 'you' },
  dingHeavenly: { kui: 'hai', yue: 'you' },
  renHeavenly: { kui: 'mao', yue: 'si' },
  guiHeavenly: { kui: 'mao', yue: 'si' }
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
 * 获取地支索引
 */
function GetEarthlyBranchIndex(branchName: EarthlyBranchName): number {
  return EarthlyBranchToIndex[branchName] ?? 0;
}

// ==================== 核心计算函数 ====================

/**
 * 获取天魁天钺位置索引
 *
 * @param heavenlyStemName 天干名称
 * @returns 天魁天钺位置索引
 */
export function GetKuiYueIndex(heavenlyStemName: HeavenlyStemName): KuiYuePosition {
  // 步骤1：转换为内部键值
  const heavenlyStem = ConvertHeavenlyStemToKey(heavenlyStemName);

  // 步骤2：查找天魁天钺位置
  const positions = LookupFromMapping(HeavenlyStemToKuiYue, heavenlyStem);

  // 步骤3：计算最终索引
  const kuiIndex = GetEarthlyBranchIndex(positions.kui);
  const yueIndex = GetEarthlyBranchIndex(positions.yue);

  return { kuiIndex, yueIndex };
}

// ==================== 默认导出 ====================

export default GetKuiYueIndex;
