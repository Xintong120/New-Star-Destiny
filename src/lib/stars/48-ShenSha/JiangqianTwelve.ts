/**
 * 流年将前十二星模块
 *
 * 传统口诀：
 * - 寅午戌年将星午，申子辰年子将星，
 * - 巳酉丑将酉上驻，亥卯未将卯上停。
 * - 攀鞍岁驿并息神，华盖劫煞灾煞轻，
 * - 天煞指背咸池续，月煞亡神次第行。
 *
 * 规则：
 * - 根据流年地支三合局确定将星位置
 * - 从将星位置顺行排列12星
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
 * 流年将前十二星名称
 */
export const JiangqianTwelveNames = [
  '将星',
  '攀鞍',
  '岁驿',
  '息神',
  '华盖',
  '劫煞',
  '灾煞',
  '天煞',
  '指背',
  '咸池',
  '月煞',
  '亡神',
] as const;

/**
 * 流年将前十二星计算参数
 */
export interface JiangqianTwelveParams {
  /** 流年地支索引（0-11，从寅宫开始） */
  yearBranchIndex: number;
}

/**
 * 流年将前十二星计算结果
 */
export interface JiangqianTwelveResult {
  /** 星曜名称 */
  name: string;
  /** 宫位索引（0-11，从寅宫开始） */
  palaceIndex: number;
}

/**
 * 根据流年地支获取将星起始位置（从寅宫开始的索引）
 *
 * 传统口诀：
 * - 寅午戌年将星午（三合火局 -> 将星在午）
 * - 申子辰年子将星（三合水局 -> 将星在子）
 * - 巳酉丑将酉上驻（三合金局 -> 将星在酉）
 * - 亥卯未将卯上停（三合木局 -> 将星在卯）
 *
 * @param yearBranchIndex 流年地支索引（0-11，从寅宫开始）
 * @returns 将星起始位置索引（0-11，从寅宫开始）
 */
export const GetJiangxingStartIndex = (yearBranchIndex: number): number => {
  // 寅午戌：寅=0, 午=4, 戌=8 -> 将星在午（索引4）
  if ([0, 4, 8].includes(yearBranchIndex)) {
    return 4; // 午宫（寅宫起始索引）
  }

  // 申子辰：申=6, 子=10, 辰=2 -> 将星在子（索引10）
  if ([6, 10, 2].includes(yearBranchIndex)) {
    return 10; // 子宫（寅宫起始索引）
  }

  // 巳酉丑：巳=3, 酉=7, 丑=11 -> 将星在酉（索引7）
  if ([3, 7, 11].includes(yearBranchIndex)) {
    return 7; // 酉宫（寅宫起始索引）
  }

  // 亥卯未：亥=9, 卯=1, 未=5 -> 将星在卯（索引1）
  if ([9, 1, 5].includes(yearBranchIndex)) {
    return 1; // 卯宫（寅宫起始索引）
  }

  return 10; // 默认值（子宫）
};

/**
 * 计算流年将前十二星的位置（返回数组）
 *
 * 规则：
 * 1. 根据流年地支的三合局确定将星位置
 * 2. 从将星位置顺行排列12星
 *
 * @param params 计算参数
 * @returns 将前十二星数组（12个元素，索引对应宫位，从寅宫开始）
 *
 * @example
 * ```typescript
 * // 假设流年地支为寅（索引2），属火局，将星在午（索引6）
 * const result = GetJiangqianTwelveArray({ yearBranchIndex: 2 });
 * // result[4] = '将星' (午宫位置，寅宫起始系统中索引为4)
 * // result[5] = '攀鞍' (未宫位置)
 * // ...
 * ```
 */
export const GetJiangqianTwelveArray = (
  params: JiangqianTwelveParams
): string[] => {
  const { yearBranchIndex } = params;

  // 初始化12个宫位
  const result: string[] = new Array(12).fill('');

  // 获取将星起始位置（寅宫起始系统）
  const jiangxingStartIndex = GetJiangxingStartIndex(yearBranchIndex);

  // 从将星位置顺行排列（直接在寅宫系统中）
  for (let i = 0; i < 12; i++) {
    const yinIndex = (jiangxingStartIndex + i) % 12;
    result[yinIndex] = JiangqianTwelveNames[i];
  }

  return result;
};

/**
 * 计算流年将前十二星的详细位置（返回对象数组）
 *
 * @param params 计算参数
 * @returns 将前十二星对象数组
 *
 * @example
 * ```typescript
 * const stars = GetJiangqianTwelve({ yearBranchIndex: 2 });
 * // [
 * //   { name: '将星', palaceIndex: 4 },
 * //   { name: '攀鞍', palaceIndex: 5 },
 * //   ...
 * // ]
 * ```
 */
export const GetJiangqianTwelve = (
  params: JiangqianTwelveParams
): JiangqianTwelveResult[] => {
  const array = GetJiangqianTwelveArray(params);

  return array
    .map((name, palaceIndex) => ({ name, palaceIndex }))
    .filter(item => item.name !== '');
};

/**
 * 根据地支名称获取将前十二星
 *
 * @param yearBranchName 流年地支名称（如'寅'、'yin'）
 * @returns 将前十二星数组
 *
 * @example
 * ```typescript
 * const stars = GetJiangqianTwelveByBranchName('寅');
 * ```
 */
export const GetJiangqianTwelveByBranchName = (
  yearBranchName: string
): string[] => {
  const yearBranchIndex = EarthlyBranchToIndex[yearBranchName];

  if (yearBranchIndex === undefined) {
    throw new Error(`Invalid earthly branch name: ${yearBranchName}`);
  }

  return GetJiangqianTwelveArray({ yearBranchIndex });
};

/**
 * 获取三合局的将星位置
 *
 * @param yearBranchIndex 流年地支索引
 * @returns 将星位置的地支名称
 *
 * @example
 * ```typescript
 * GetJiangxingBranchName(2);  // '午' (寅年属火局，将星在午)
 * GetJiangxingBranchName(0);  // '子' (子年属水局，将星在子)
 * ```
 */
export const GetJiangxingBranchName = (yearBranchIndex: number): string => {
  const jiangxingIndex = GetJiangxingStartIndex(yearBranchIndex);
  const branchNames = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
  return branchNames[jiangxingIndex];
};

/**
 * 获取算法说明
 *
 * @returns 流年将前十二星算法说明
 */
export const GetJiangqianTwelveAlgorithmDescription = (): string => {
  return `
流年将前十二星算法：

1. 确定将星位置（根据三合局）：
   - 寅午戌年（火局）：将星在午
   - 申子辰年（水局）：将星在子
   - 巳酉丑年（金局）：将星在酉
   - 亥卯未年（木局）：将星在卯

2. 排列顺序：
   - 从将星位置顺行排列12星

3. 12星顺序：
   将星 → 攀鞍 → 岁驿 → 息神 → 华盖 → 劫煞 → 灾煞 → 天煞 → 指背 → 咸池 → 月煞 → 亡神

4. 象征意义：
   - 将星：将帅之星，主权威、领导
   - 攀鞍：攀登马鞍，主奔波、变动
   - 岁驿：驿马之星，主远行、迁移
   - 息神：休息之神，主平和、休养
   - 华盖：文艺之星，主艺术、孤高
   - 劫煞：劫夺之煞，主破财、损失
   - 灾煞：灾难之煞，主灾祸、意外
   - 天煞：天灾之煞，主天灾、不测
   - 指背：背后指点，主是非、口舌
   - 咸池：桃花之星，主感情、桃花
   - 月煞：月令之煞，主波折、阻碍
   - 亡神：死亡之神，主失落、消亡

5. 三合局说明：
   - 火局（寅午戌）：长生在寅，帝旺在午，墓库在戌
   - 水局（申子辰）：长生在申，帝旺在子，墓库在辰
   - 金局（巳酉丑）：长生在巳，帝旺在酉，墓库在丑
   - 木局（亥卯未）：长生在亥，帝旺在卯，墓库在未
   - 将星位于帝旺宫位

6. 使用说明：
   - 将前十二星主要用于流年运势分析
   - 需要知道流年的地支
   - 不分性别，不分顺逆，统一顺行
  `.trim();
};
