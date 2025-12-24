/**
 * 长生十二神模块
 *
 * 传统口诀：
 * - 水二局长生在申
 * - 木三局长生在亥
 * - 金四局长生在巳
 * - 土五局长生在申
 * - 火六局长生在寅
 *
 * 顺逆规则：
 * - 阳男阴女顺行
 * - 阴男阳女逆行
 *
 * 12神顺序：
 * 长生、沐浴、冠带、临官、帝旺、衰、病、死、墓、绝、胎、养
 *
 * @version 2.0.0
 */

/**
 * 长生十二神名称
 */
export const ChangshengTwelveNames = [
  '长生',
  '沐浴',
  '冠带',
  '临官',
  '帝旺',
  '衰',
  '病',
  '死',
  '墓',
  '绝',
  '胎',
  '养',
] as const;

/**
 * 五行局类型
 */
export type FiveElementsClass = 2 | 3 | 4 | 5 | 6;

/**
 * 五行局对应的长生起始宫位索引（寅宫=0）
 *
 * - 水二局：长生在申（索引6）
 * - 木三局：长生在亥（索引9）
 * - 金四局：长生在巳（索引3）
 * - 土五局：长生在申（索引6）
 * - 火六局：长生在寅（索引0）
 */
const FiveElementsClassToStartIndex: Record<FiveElementsClass, number> = {
  2: 6,  // 水二局 -> 申宫
  3: 9,  // 木三局 -> 亥宫
  4: 3,  // 金四局 -> 巳宫
  5: 6,  // 土五局 -> 申宫
  6: 0,  // 火六局 -> 寅宫
};

/**
 * 获取长生起始宫位索引
 *
 * @param fiveElementsClass 五行局（2/3/4/5/6）
 * @returns 长生星所在的宫位索引（0-11，从寅宫开始）
 *
 * @example
 * ```typescript
 * const startIndex = GetChangshengStartIndex(2); // 6 (水二局长生在申)
 * ```
 */
export const GetChangshengStartIndex = (fiveElementsClass: FiveElementsClass): number => {
  return FiveElementsClassToStartIndex[fiveElementsClass] ?? 0;
};

/**
 * 长生十二神计算参数
 */
export interface ChangshengTwelveParams {
  /** 五行局（2/3/4/5/6） */
  fiveElementsClass: FiveElementsClass;
  /** 性别 */
  gender: '男' | '女';
  /** 年份地支的阴阳属性 */
  yearBranchYinYang: '阴' | '阳';
}

/**
 * 长生十二神计算结果
 */
export interface ChangshengTwelveResult {
  /** 星曜名称 */
  name: string;
  /** 宫位索引（0-11，从寅宫开始） */
  palaceIndex: number;
}

/**
 * 计算长生十二神的位置
 *
 * 规则：
 * 1. 根据五行局确定长生起始位置
 * 2. 阳男阴女顺行，阴男阳女逆行
 * 3. 依次安排12神
 *
 * @param params 计算参数
 * @returns 长生十二神数组（12个元素，索引对应宫位）
 *
 * @example
 * ```typescript
 * const result = GetChangshengTwelveArray({
 *   fiveElementsClass: 2,
 *   gender: '男',
 *   yearBranchYinYang: '阳'
 * });
 * // 返回: ['养', '长生', '沐浴', ...]（从寅宫开始）
 * ```
 */
export const GetChangshengTwelveArray = (
  params: ChangshengTwelveParams
): string[] => {
  const { fiveElementsClass, gender, yearBranchYinYang } = params;

  // 初始化12个宫位，默认为空字符串
  const result: string[] = new Array(12).fill('');

  // 获取长生起始宫位
  const startIndex = GetChangshengStartIndex(fiveElementsClass);

  // 判断顺逆：阳男阴女顺行，阴男阳女逆行
  // 男性：性别阴阳与年支阴阳相同时顺行
  // 女性：性别阴阳与年支阴阳相同时顺行
  const isForward = (gender === '男' && yearBranchYinYang === '阳') ||
                    (gender === '女' && yearBranchYinYang === '阴');

  // 安排12神
  for (let i = 0; i < 12; i++) {
    let palaceIndex: number;

    if (isForward) {
      // 顺行
      palaceIndex = (startIndex + i) % 12;
    } else {
      // 逆行
      palaceIndex = ((startIndex - i) % 12 + 12) % 12;
    }

    result[palaceIndex] = ChangshengTwelveNames[i];
  }

  return result;
};

/**
 * 计算长生十二神的详细位置（返回对象数组）
 *
 * @param params 计算参数
 * @returns 长生十二神对象数组
 *
 * @example
 * ```typescript
 * const stars = GetChangshengTwelve({
 *   fiveElementsClass: 2,
 *   gender: '男',
 *   yearBranchYinYang: '阳'
 * });
 * // [
 * //   { name: '长生', palaceIndex: 6 },
 * //   { name: '沐浴', palaceIndex: 7 },
 * //   ...
 * // ]
 * ```
 */
export const GetChangshengTwelve = (
  params: ChangshengTwelveParams
): ChangshengTwelveResult[] => {
  const array = GetChangshengTwelveArray(params);

  return array
    .map((name, palaceIndex) => ({ name, palaceIndex }))
    .filter(item => item.name !== '');
};

/**
 * 检查是否为顺行
 *
 * @param gender 性别
 * @param yearBranchYinYang 年份地支的阴阳属性
 * @returns 是否为顺行
 *
 * @example
 * ```typescript
 * IsForward('男', '阳'); // true (阳男顺行)
 * IsForward('男', '阴'); // false (阴男逆行)
 * IsForward('女', '阴'); // true (阴女顺行)
 * IsForward('女', '阳'); // false (阳女逆行)
 * ```
 */
export const IsForward = (
  gender: '男' | '女',
  yearBranchYinYang: '阴' | '阳'
): boolean => {
  return (gender === '男' && yearBranchYinYang === '阳') ||
         (gender === '女' && yearBranchYinYang === '阴');
};

/**
 * 获取算法说明
 *
 * @returns 长生十二神算法说明
 */
export const GetChangshengTwelveAlgorithmDescription = (): string => {
  return `
长生十二神算法：

1. 起始位置（根据五行局）：
   - 水二局：长生在申宫
   - 木三局：长生在亥宫
   - 金四局：长生在巳宫
   - 土五局：长生在申宫
   - 火六局：长生在寅宫

2. 顺逆规则：
   - 阳男阴女：顺行（顺时针）
   - 阴男阳女：逆行（逆时针）

3. 12神顺序：
   长生 → 沐浴 → 冠带 → 临官 → 帝旺 → 衰 → 病 → 死 → 墓 → 绝 → 胎 → 养

4. 象征意义：
   - 长生：新生、开始、生机
   - 沐浴：清洗、准备、易有桃花
   - 冠带：成长、准备就绪
   - 临官：临近权力、即将得位
   - 帝旺：最旺盛、达到顶峰
   - 衰：开始衰退
   - 病：疾病、问题
   - 死：死亡、结束
   - 墓：收藏、埋葬
   - 绝：断绝、最低点
   - 胎：怀胎、孕育新生
   - 养：养育、准备重生
  `.trim();
};
