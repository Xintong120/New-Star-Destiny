import { HeavenlyStemNames, EarthlyBranchNames } from '../ganzhi/GanzhiConstants';

/**
 * 五行计算器
 */
export class FiveElementsCalculator {
  /**
   * 五行局映射表
   */
  private static readonly FiveElementsTable: string[] = ['wood3rd', 'metal4th', 'water2nd', 'fire6th', 'earth5th'];

  /**
   * 五行局显示名称映射
   */
  private static readonly FiveElementsNames: Record<string, string> = {
    'wood3rd': '木三局',
    'metal4th': '金四局',
    'water2nd': '水二局',
    'fire6th': '火六局',
    'earth5th': '土五局'
  };

  /**
   * 处理索引，将索引锁定在 0~max 范围内
   * @param index 当前索引
   * @param max 最大循环数，默认为12
   * @returns 处理后的索引
   */
  private static FixIndex(index: number, max: number = 12): number {
    if (index < 0) {
      return this.FixIndex(index + max, max);
    }

    if (index > max - 1) {
      return this.FixIndex(index - max, max);
    }

    const res = 1 / index === -Infinity ? 0 : index;
    return res;
  }

  /**
   * 定五行局法（以命宫天干地支而定）
   *
   * 纳音五行计算取数巧记口诀：
   *
   * - 甲乙丙丁一到五，子丑午未一来数，
   * - 寅卯申酉二上走，辰巳戌亥三为足。
   * - 干支相加多减五，五行木金水火土。
   *
   * 注解：
   *
   * 1、五行取数：木1 金2 水3 火4 土5
   *
   *  天干取数：
   *  - 甲乙 ——> 1
   *  - 丙丁 ——> 2
   *  - 戊己 ——> 3
   *  - 庚辛 ——> 4
   *  - 壬癸 ——> 5
   *
   *  地支取数：
   *  - 子午丑未 ——> 1
   *  - 寅申卯酉 ——> 2
   *  - 辰戌巳亥 ——> 3
   *
   * 2、计算方法：
   *
   *  干支数相加，超过5者减去5，以差论之。
   *  - 若差为1则五行属木
   *  - 若差为2则五行属金
   *  - 若差为3则五行属水
   *  - 若差为4则五行属火
   *  - 若差为5则五行属土
   *
   * 3、举例：
   *  - 丙子：丙2 子1=3 ——> 水 ——> 水二局
   *  - 辛未：辛4 未1=5 ——> 土 ——> 土五局
   *  - 庚申：庚4 申2=6 ——> 6-5=1 ——> 木 ——> 木三局
   *
   * @param heavenlyStem 天干 (如: '甲', '乙', '丙'...)
   * @param earthlyBranch 地支 (如: '子', '丑', '寅'...)
   * @returns 五行局名称 (如: '木三局', '金四局'...)
   */
  static GetFiveElementsClass(heavenlyStem: string, earthlyBranch: string): string {
    // 天干取数：甲乙1, 丙丁2, 戊己3, 庚辛4, 壬癸5
    const heavenlyStemNumber = Math.floor(HeavenlyStemNames.indexOf(heavenlyStem) / 2) + 1;

    // 地支取数：子午丑未1, 寅申卯酉2, 辰戌巳亥3
    const earthlyBranchNumber = Math.floor(this.FixIndex(EarthlyBranchNames.indexOf(earthlyBranch), 6) / 2) + 1;

    // 干支数相加
    let index = heavenlyStemNumber + earthlyBranchNumber;

    // 超过5者减去5
    while (index > 5) {
      index -= 5;
    }

    // 获取五行局key并转换为显示名称
    const fiveElementsKey = this.FiveElementsTable[index - 1];
    return this.FiveElementsNames[fiveElementsKey] || '未知';
  }

  /**
   * 根据干支组合获取五行属性
   * @param ganzhi 干支组合 (如: '甲子', '丙午'...)
   * @returns 五行属性
   */
  static GetFiveElementsByGanzhi(ganzhi: string): string {
    if (ganzhi.length !== 2) {
      throw new Error(`Invalid ganzhi format: ${ganzhi}`);
    }

    const heavenlyStem = ganzhi[0];
    const earthlyBranch = ganzhi[1];

    return this.GetFiveElementsClass(heavenlyStem, earthlyBranch);
  }

  /**
   * 获取所有五行局名称列表
   * @returns 五行局名称数组
   */
  static GetAllFiveElementsClasses(): string[] {
    return Object.values(this.FiveElementsNames);
  }

  /**
   * 获取五行局的英文标识符
   * @param chineseName 中文五行局名称
   * @returns 英文标识符
   */
  static GetEnglishKey(chineseName: string): string {
    const reverseMap: Record<string, string> = {};
    Object.entries(this.FiveElementsNames).forEach(([key, value]) => {
      reverseMap[value] = key;
    });

    return reverseMap[chineseName] || 'unknown';
  }

  /**
   * 根据五行局获取对应的数字
   * @param fiveElementsClass 五行局名称
   * @returns 对应的数字 (2, 3, 4, 5, 6)
   */
  static GetClassNumber(fiveElementsClass: string): number {
    const numberMap: Record<string, number> = {
      '水二局': 2,
      '木三局': 3,
      '金四局': 4,
      '土五局': 5,
      '火六局': 6
    };

    return numberMap[fiveElementsClass] || 0;
  }

  /**
   * 获取五行局的详细信息
   * @param fiveElementsClass 五行局名称
   * @returns 详细信息对象
   */
  static GetFiveElementsInfo(fiveElementsClass: string): {
    name: string;
    element: string;
    number: number;
    englishKey: string;
  } {
    const elementMap: Record<string, string> = {
      '水二局': '水',
      '木三局': '木',
      '金四局': '金',
      '土五局': '土',
      '火六局': '火'
    };

    return {
      name: fiveElementsClass,
      element: elementMap[fiveElementsClass] || '未知',
      number: this.GetClassNumber(fiveElementsClass),
      englishKey: this.GetEnglishKey(fiveElementsClass)
    };
  }
}
