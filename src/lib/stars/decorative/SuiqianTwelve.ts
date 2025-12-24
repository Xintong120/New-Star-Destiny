/**
 * 流年岁前十二星模块
 *
 * 传统口诀：
 * - 流年地支起岁建，岁前首先是晦气，
 * - 丧门贯索及官符，小耗大耗龙德继，
 * - 白虎天德连吊客，病符居后须当记。
 *
 * 规则：
 * - 从流年地支起岁建，顺行排列12星
 *
 * @version 2.0.0
 */

/**
 * 地支名称到索引的映射（从寅宫开始）
 */
const EarthlyBranchToIndex: Record<string, number> = {
  '寅': 0, 'yin': 0,
  '卯': 1, 'mao': 1,
  '辰': 2, 'chen': 2,
  '巳': 3, 'si': 3,
  '午': 4, 'wu': 4, 'woo': 4,
  '未': 5, 'wei': 5,
  '申': 6, 'shen': 6,
  '酉': 7, 'you': 7,
  '戌': 8, 'xu': 8,
  '亥': 9, 'hai': 9,
  '子': 10, 'zi': 10,
  '丑': 11, 'chou': 11,
};

/**
 * 将地支索引转换为寅宫起始索引
 *
 * @param ziIndex 从子宫开始的索引（0-11）
 * @returns 从寅宫开始的索引（0-11）
 *
 * @example
 * ```typescript
 * ConvertZiIndexToYinIndex(0);  // 10 (子宫 -> 索引10)
 * ConvertZiIndexToYinIndex(2);  // 0  (寅宫 -> 索引0)
 * ConvertZiIndexToYinIndex(11); // 9  (亥宫 -> 索引9)
 * ```
 */
const ConvertZiIndexToYinIndex = (ziIndex: number): number => {
  // 子=0->10, 丑=1->11, 寅=2->0, 卯=3->1, ..., 亥=11->9
  return ((ziIndex - 2) % 12 + 12) % 12;
};

/**
 * 流年岁前十二星名称（标准流派）
 */
export const SuiqianTwelveNames = [
  '岁建',
  '晦气',
  '丧门',
  '贯索',
  '官符',
  '小耗',
  '大耗',
  '龙德',
  '白虎',
  '天德',
  '吊客',
  '病符',
] as const;

/**
 * 流年岁前十二星名称（中州派）
 * 注：中州派将"大耗"称为"岁破"
 */
export const SuiqianTwelveNamesZhongzhou = [
  '岁建',
  '晦气',
  '丧门',
  '贯索',
  '官符',
  '小耗',
  '岁破',  // 中州派称"大耗"为"岁破"
  '龙德',
  '白虎',
  '天德',
  '吊客',
  '病符',
] as const;

/**
 * 流年岁前十二星计算参数
 */
export interface SuiqianTwelveParams {
  /** 流年地支索引（0-11，从寅宫开始） */
  yearBranchIndex: number;
  /** 流派算法（默认standard） */
  algorithm?: 'standard' | 'zhongzhou';
}

/**
 * 流年岁前十二星计算结果
 */
export interface SuiqianTwelveResult {
  /** 星曜名称 */
  name: string;
  /** 宫位索引（0-11，从寅宫开始） */
  palaceIndex: number;
}

/**
 * 计算流年岁前十二星的位置（返回数组）
 *
 * 规则：
 * 1. 从流年地支位置起岁建
 * 2. 顺行排列12星
 *
 * @param params 计算参数
 * @returns 岁前十二星数组（12个元素，索引对应宫位，从寅宫开始）
 *
 * @example
 * ```typescript
 * // 假设流年地支为子（索引0）
 * const result = GetSuiqianTwelveArray({ yearBranchIndex: 0 });
 * // result[10] = '岁建' (子宫位置)
 * // result[11] = '晦气' (丑宫位置)
 * // result[0] = '丧门' (寅宫位置)
 * // ...
 * ```
 */
export const GetSuiqianTwelveArray = (
  params: SuiqianTwelveParams
): string[] => {
  const { yearBranchIndex, algorithm = 'standard' } = params;

  // 初始化12个宫位
  const result: string[] = new Array(12).fill('');

  // 选择星名数组
  const starNames = algorithm === 'zhongzhou'
    ? SuiqianTwelveNamesZhongzhou
    : SuiqianTwelveNames;

  // 从流年地支起岁建，顺行排列（直接在寅宫系统中）
  for (let i = 0; i < 12; i++) {
    const yinIndex = (yearBranchIndex + i) % 12;
    result[yinIndex] = starNames[i];
  }

  return result;
};

/**
 * 计算流年岁前十二星的详细位置（返回对象数组）
 *
 * @param params 计算参数
 * @returns 岁前十二星对象数组
 *
 * @example
 * ```typescript
 * const stars = GetSuiqianTwelve({ yearBranchIndex: 0 });
 * // [
 * //   { name: '岁建', palaceIndex: 10 },
 * //   { name: '晦气', palaceIndex: 11 },
 * //   ...
 * // ]
 * ```
 */
export const GetSuiqianTwelve = (
  params: SuiqianTwelveParams
): SuiqianTwelveResult[] => {
  const array = GetSuiqianTwelveArray(params);

  return array
    .map((name, palaceIndex) => ({ name, palaceIndex }))
    .filter(item => item.name !== '');
};

/**
 * 根据地支名称获取岁前十二星
 *
 * @param yearBranchName 流年地支名称（如'子'、'zi'）
 * @param algorithm 流派算法
 * @returns 岁前十二星数组
 *
 * @example
 * ```typescript
 * const stars = GetSuiqianTwelveByBranchName('子');
 * ```
 */
export const GetSuiqianTwelveByBranchName = (
  yearBranchName: string,
  algorithm?: 'standard' | 'zhongzhou'
): string[] => {
  const yearBranchIndex = EarthlyBranchToIndex[yearBranchName];

  if (yearBranchIndex === undefined) {
    throw new Error(`Invalid earthly branch name: ${yearBranchName}`);
  }

  return GetSuiqianTwelveArray({ yearBranchIndex, algorithm });
};

/**
 * 获取算法说明
 *
 * @returns 流年岁前十二星算法说明
 */
export const GetSuiqianTwelveAlgorithmDescription = (): string => {
  return `
流年岁前十二星算法：

1. 起始位置：
   - 从流年地支位置起岁建

2. 排列顺序：
   - 顺行排列12星

3. 12星顺序：
   岁建 → 晦气 → 丧门 → 贯索 → 官符 → 小耗 → 大耗 → 龙德 → 白虎 → 天德 → 吊客 → 病符

4. 流派差异：
   - 标准流派：第7位为"大耗"
   - 中州派：第7位为"岁破"（与"大耗"同义）

5. 象征意义：
   - 岁建：太岁所在，主事之星
   - 晦气：晦暗不明，易有烦恼
   - 丧门：丧服之门，易有丧事
   - 贯索：牢狱之象，束缚、限制
   - 官符：官府文书，易有官司
   - 小耗：小的损失、破费
   - 大耗/岁破：大的损失、破财
   - 龙德：吉星，逢凶化吉
   - 白虎：凶星，主血光、意外
   - 天德：吉星，逢凶化吉
   - 吊客：吊丧之客，易有悲伤
   - 病符：疾病之符，注意健康

6. 使用说明：
   - 岁前十二星主要用于流年运势分析
   - 需要知道流年的地支（如2024年甲辰年，地支为辰）
   - 不分性别，不分顺逆，统一顺行
  `.trim();
};
