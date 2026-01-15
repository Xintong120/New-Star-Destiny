/**
 * 大限计算器
 */

import { SolarToLunarConverter } from "../../utils/date/SolarToLunarConverter";
import { DecadalLimit } from "../../utils/age/DecadalLimit";
import type { IAstrolabe, DecadalInfo } from "../types";
import { GetMutagen } from "./utils";
import {
  ChildhoodPalaces,
  HeavenlyStems,
  EarthlyBranches,
  TigerRule,
  FiveElementsStartAge,
  GenderYinYang,
  EarthlyBranchYinYang,
  HeavenlyStemYinYang,
} from "./constants";

/**
 * 大限计算器类
 */
export class DecadalCalculator {
  /**
   * 获取所有大限信息
   * 按照紫微斗数传统算法计算大限
   *
   * @param astrolabe 命盘对象
   * @returns 大限数组（12个大限）
   */
  static GetAllDecades(astrolabe: IAstrolabe): DecadalInfo[] {
    // 从四柱信息中提取年干支
    const yearGanZhi = this.extractYearGanZhi(astrolabe);
    if (!yearGanZhi) {
      console.error("无法提取年干支，使用默认数据");
      return this.generateDefaultDecades(astrolabe);
    }

    const [yearlyHeavenlyStem, yearlyEarthlyBranch] = yearGanZhi;

    // 获取命宫索引
    const soulIndex = this.getSoulPalaceIndex(astrolabe);

    // 计算五行局
    const fiveElementsClass = this.getFiveElementsClass(astrolabe);

    // 使用五虎遁获取大限起始天干
    const startHeavenlyStem = TigerRule[yearlyHeavenlyStem];
    if (!startHeavenlyStem) {
      console.error("五虎遁规则未找到对应天干:", yearlyHeavenlyStem);
      return this.generateDefaultDecades(astrolabe);
    }

    // 获取五行局对应的起始年龄
    const fiveElementsStartAge = FiveElementsStartAge[fiveElementsClass] || 3;

    // 根据性别和年干阴阳确定顺逆行（阳男阴女顺行，其他逆行）
    const yearStemYinYang = HeavenlyStemYinYang[yearlyHeavenlyStem] || "阳";
    const isMale = astrolabe.gender === "男";
    const isYangStem = yearStemYinYang === "阳";
    const isForward = (isMale && isYangStem) || (!isMale && !isYangStem);

    const decades: DecadalInfo[] = [];

    // 计算12个宫位的大限信息（按照年龄从小到大排列）
    for (let i = 0; i < 12; i++) {
      // 计算宫位索引（顺逆行，从命宫开始）
      const palaceIndex = isForward
        ? (soulIndex + i) % 12
        : (soulIndex - i + 12) % 12;

      // 计算大限年龄范围（i=0对应第1大限，年龄最小）
      const rangeStart = fiveElementsStartAge + i * 10;
      const rangeEnd = rangeStart + 9;

      const palace = astrolabe.palaces[palaceIndex];

      // 大限干支直接使用对应宫位的干支
      // 按照大限顺序（从小到大）存储，而不是按照宫位索引
      decades[i] = {
        index: i, // 大限序号（0=第1大限，1=第2大限...）
        range: [rangeStart, rangeEnd],
        heavenlyStem: palace.heavenlyStem,
        earthlyBranch: palace.earthlyBranch,
        palaceName: palace.name,
        isChildhood: false,
        mutagen: GetMutagen(palace.heavenlyStem),
      };
    }
    return decades.filter(Boolean); // 过滤掉undefined项
  }
  /**
   * 从四柱信息中提取年干支
   *
   * @param astrolabe 命盘对象
   * @returns 年干支数组，如 ["己", "亥"]
   */
  private static extractYearGanZhi(
    astrolabe: IAstrolabe
  ): [string, string] | null {
    try {
      // 首先尝试从centerInfo.sizhu中提取（App.vue中计算的格式）
      const centerInfo = (astrolabe as any).centerInfo;
      if (centerInfo && centerInfo.sizhu) {
        // sizhu格式通常是 "己亥 戊辰 壬寅 庚子"
        const parts = centerInfo.sizhu.split(" ");
        if (parts.length > 0) {
          const yearGanZhi = parts[0]; // 年干支，如 "己亥"
          if (yearGanZhi.length === 2) {
            return [yearGanZhi[0], yearGanZhi[1]]; // ["己", "亥"]
          }
        }
      }

      console.warn("无法提取年干支，centerInfo.sizhu:", centerInfo?.sizhu);
      return null;
    } catch (error) {
      console.error("提取年干支出错:", error);
      return null;
    }
  }

  /**
   * 获取命宫索引
   *
   * @param astrolabe 命盘对象
   * @returns 命宫索引
   */
  private static getSoulPalaceIndex(astrolabe: IAstrolabe): number {
    // 从宫位中找到命宫
    const soulPalace = astrolabe.palaces.find((p) => p.name === "命宫");
    return soulPalace ? astrolabe.palaces.indexOf(soulPalace) : 0;
  }

  /**
   * 获取五行局
   *
   * @param astrolabe 命盘对象
   * @returns 五行局字符串
   */
  private static getFiveElementsClass(astrolabe: IAstrolabe): string {
    const centerInfo = (astrolabe as any).centerInfo;
    if (centerInfo && centerInfo.wuxing) {
      return centerInfo.wuxing;
    }
    return "木三局"; // 默认值
  }

  /**
   * 获取所有大限信息（便捷方法）
   *
   * @param astrolabe 命盘对象
   * @returns 大限数组
   */
  static GetDecadesList(astrolabe: IAstrolabe): DecadalInfo[] {
    return this.GetAllDecades(astrolabe);
  }

  /**
   * 生成默认大限（用于出错时）
   *
   * @param astrolabe 命盘对象
   * @returns 默认大限数组
   */
  private static generateDefaultDecades(astrolabe: IAstrolabe): DecadalInfo[] {
    const decades: DecadalInfo[] = [];
    const isForward = astrolabe.gender === "男";

    for (let i = 0; i < 12; i++) {
      const palaceIndex = isForward ? i : (12 - i) % 12;

      const palace = astrolabe.palaces[palaceIndex];
      const rangeStart = 5 + i * 10; // 默认起运年龄
      const rangeEnd = rangeStart + 9;

      decades.push({
        index: palaceIndex,
        range: [rangeStart, rangeEnd],
        heavenlyStem: palace.heavenlyStem,
        earthlyBranch: palace.earthlyBranch,
        palaceName: palace.name,
        isChildhood: false,
        mutagen: GetMutagen(palace.heavenlyStem),
      });
    }

    return decades;
  }
}
