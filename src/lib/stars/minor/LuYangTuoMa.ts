/**
 * 禄羊陀马星曜位置计算模块
 *
 * 职责：
 * - 根据年干计算禄羊陀马的位置，年支计算天马位置
 *
 * 算法说明：
 * 禄存：甲禄到寅宫，乙禄居卯府。丙戊禄在巳，丁己禄在午。庚禄定居申，辛禄酉上补。壬禄亥中藏，癸禄居子户。
 * 羊陀：禄前羊刃当，禄后陀罗府。
 * 天马：寅午戍年马在申，申子辰年马在寅。巳酉丑年马在亥，亥卯未年马在巳。
 */

/**
 * 禄羊陀马位置结果
 */
export interface LuYangTuoMaPosition {
  /** 禄存索引 */
  luIndex: number;
  /** 羊刃索引 */
  yangIndex: number;
  /** 陀罗索引 */
  tuoIndex: number;
  /** 天马索引 */
  maIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 年干到禄存宫位索引的映射
 * 口诀：甲禄到寅宫，乙禄居卯府。丙戊禄在巳，丁己禄在午。庚禄定居申，辛禄酉上补。壬禄亥中藏，癸禄居子户。
 *
 * 宫位索引对照: 寅0,卯1,辰2,巳3,午4,未5,申6,酉7,戌8,亥9,子10,丑11
 */
const HeavenlyStemToLuIndex: Record<string, number> = {
  '甲': 0,   // 寅宫
  '乙': 1,   // 卯宫
  '丙': 3,   // 巳宫
  '戊': 3,   // 巳宫
  '丁': 4,   // 午宫
  '己': 4,   // 午宫
  '庚': 6,   // 申宫
  '辛': 7,   // 酉宫
  '壬': 9,   // 亥宫
  '癸': 10   // 子宫
};

/**
 * 年支到天马宫位索引的映射
 * 口诀：寅午戍年马在申，申子辰年马在寅。巳酉丑年马在亥，亥卯未年马在巳。
 *
 * 宫位索引对照: 寅0,卯1,辰2,巳3,午4,未5,申6,酉7,戌8,亥9,子10,丑11
 */
const EarthlyBranchToMaIndex: Record<string, number> = {
  // 寅午戌年马在申
  '寅': 6,   // 申宫
  '午': 6,   // 申宫
  '戌': 6,   // 申宫

  // 申子辰年马在寅
  '申': 0,   // 寅宫
  '子': 0,   // 寅宫
  '辰': 0,   // 寅宫

  // 巳酉丑年马在亥
  '巳': 9,   // 亥宫
  '酉': 9,   // 亥宫
  '丑': 9,   // 亥宫

  // 亥卯未年马在巳
  '亥': 3,   // 巳宫
  '卯': 3,   // 巳宫
  '未': 3    // 巳宫
};

// ==================== 工具函数 ====================

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

// ==================== 核心计算函数 ====================

/**
 * 获取禄羊陀马位置索引
 *
 * @param yearlyHeavenlyStem 年干（如：'甲'）
 * @param yearlyEarthlyBranch 年支（如：'子'）
 * @returns 禄存、羊刃、陀罗、天马索引
 */
export function GetLuYangTuoMaIndex(yearlyHeavenlyStem: string, yearlyEarthlyBranch: string): LuYangTuoMaPosition {
  // 根据年干获取禄存位置
  const luIndex = HeavenlyStemToLuIndex[yearlyHeavenlyStem];

  if (luIndex === undefined) {
    throw new Error(`无效的年干: ${yearlyHeavenlyStem}`);
  }

  // 擎羊：禄前擎羊当 (禄存后一位)
  const yangIndex = FixIndex(luIndex + 1);

  // 陀罗：禄后陀罗府 (禄存前一位)
  const tuoIndex = FixIndex(luIndex - 1);

  // 天马：根据年支确定位置
  const maIndex = EarthlyBranchToMaIndex[yearlyEarthlyBranch];

  if (maIndex === undefined) {
    throw new Error(`无效的年支: ${yearlyEarthlyBranch}`);
  }

  return { luIndex, yangIndex, tuoIndex, maIndex };
}

export default GetLuYangTuoMaIndex;
