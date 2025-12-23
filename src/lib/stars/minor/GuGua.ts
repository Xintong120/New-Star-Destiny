/**
 * 孤辰寡宿星曜位置计算模块
 *
 * 职责：
 * - 根据年支计算孤辰寡宿的位置
 * - 基于地支三合局的映射关系
 *
 * 算法说明：
 * 孤辰寡宿按地支三合局分组：
 * - 寅卯辰年安巳丑：孤辰在巳，寡宿在丑
 * - 巳午未年安申辰：孤辰在申，寡宿在辰
 * - 申酉戍年安亥未：孤辰在亥，寡宿在未
 * - 亥子丑年安寅戍：孤辰在寅，寡宿在戌
 */

// ==================== 类型定义 ====================

/**
 * 孤辰寡宿位置结果
 */
export interface GuGuaPosition {
  /** 孤辰索引 */
  guchenIndex: number;
  /** 寡宿索引 */
  guasuIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 地支键值类型
 */
type EarthlyBranchKey =
  | 'ziEarthly' | 'chouEarthly' | 'yinEarthly' | 'maoEarthly' | 'chenEarthly' | 'siEarthly'
  | 'wuEarthly' | 'weiEarthly' | 'shenEarthly' | 'youEarthly' | 'xuEarthly' | 'haiEarthly';

/**
 * 地支名称到键值的映射
 */
const EARTHLY_BRANCH_NAME_TO_KEY: Record<string, EarthlyBranchKey> = {
  '子': 'ziEarthly',
  '丑': 'chouEarthly',
  '寅': 'yinEarthly',
  '卯': 'maoEarthly',
  '辰': 'chenEarthly',
  '巳': 'siEarthly',
  '午': 'wuEarthly',
  '未': 'weiEarthly',
  '申': 'shenEarthly',
  '酉': 'youEarthly',
  '戌': 'xuEarthly',
  '亥': 'haiEarthly'
};

/**
 * 地支到孤辰寡宿位置的映射表
 */
const EarthlyBranchToGuGua: Record<EarthlyBranchKey, {guchen: string, guasu: string}> = {
  yinEarthly: { guchen: '巳', guasu: '丑' },
  maoEarthly: { guchen: '巳', guasu: '丑' },
  chenEarthly: { guchen: '巳', guasu: '丑' },
  siEarthly: { guchen: '申', guasu: '辰' },
  wuEarthly: { guchen: '申', guasu: '辰' },
  weiEarthly: { guchen: '申', guasu: '辰' },
  shenEarthly: { guchen: '亥', guasu: '未' },
  youEarthly: { guchen: '亥', guasu: '未' },
  xuEarthly: { guchen: '亥', guasu: '未' },
  haiEarthly: { guchen: '寅', guasu: '戌' },
  ziEarthly: { guchen: '寅', guasu: '戌' },
  chouEarthly: { guchen: '寅', guasu: '戌' }
};

/**
 * 地支名称到索引的映射
 */
const EarthlyBranchToIndex: Record<string, number> = {
  '子': 10, '丑': 11, '寅': 0, '卯': 1, '辰': 2, '巳': 3,
  '午': 4, '未': 5, '申': 6, '酉': 7, '戌': 8, '亥': 9
};

// ==================== 工具函数 ====================

/**
 * 转换地支名称为内部键值
 */
function ConvertEarthlyBranchToKey(earthlyBranchName: string): EarthlyBranchKey {
  const key = EARTHLY_BRANCH_NAME_TO_KEY[earthlyBranchName];
  if (!key) {
    throw new Error(`无效的地支名称: ${earthlyBranchName}`);
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

// ==================== 核心计算函数 ====================

/**
 * 获取孤辰寡宿位置索引
 *
 * @param earthlyBranchName 地支名称
 * @returns 孤辰、寡宿索引
 */
export function GetGuGuaIndex(earthlyBranchName: string): GuGuaPosition {
  // 步骤1：转换为内部键值
  const earthlyBranch = ConvertEarthlyBranchToKey(earthlyBranchName);

  // 步骤2：查找孤辰寡宿位置
  const positions = LookupFromMapping(EarthlyBranchToGuGua, earthlyBranch);

  // 步骤3：计算最终索引
  const guchenIndex = EarthlyBranchToIndex[positions.guchen] ?? 0;
  const guasuIndex = EarthlyBranchToIndex[positions.guasu] ?? 0;
  return { guchenIndex, guasuIndex };
}

// ==================== 默认导出 ====================

export default GetGuGuaIndex;
