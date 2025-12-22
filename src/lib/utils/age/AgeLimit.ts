import { EarthlyBranchNames } from '../ganzhi/GanzhiConstants';

/**
 * 小限计算工具
 */
export class AgeLimit {
  /**
   * 起小限
   *
   * 小限一年一度逢，男顺女逆不相同，
   * 寅午戍人辰上起，申子辰人自戍宫，
   * 巳酉丑人未宫始，亥卯未人起丑宫。
   *
   * @param birthYearBranch 出生年地支
   * @returns 小限开始的宫位索引
   */
  static getAgeStartIndex(birthYearBranch: string): number {
    let ageStartIndex = -1;

    // 寅午戍三合火局 -> 从辰宫起
    if (['寅', '午', '戌'].includes(birthYearBranch)) {
      ageStartIndex = this.fixEarthlyBranchIndex('辰');
    }
    // 申子辰三合水局 -> 从戌宫起
    else if (['申', '子', '辰'].includes(birthYearBranch)) {
      ageStartIndex = this.fixEarthlyBranchIndex('戌');
    }
    // 巳酉丑三合金局 -> 从未宫起
    else if (['巳', '酉', '丑'].includes(birthYearBranch)) {
      ageStartIndex = this.fixEarthlyBranchIndex('未');
    }
    // 亥卯未三合木局 -> 从丑宫起
    else if (['亥', '卯', '未'].includes(birthYearBranch)) {
      ageStartIndex = this.fixEarthlyBranchIndex('丑');
    }

    return ageStartIndex;
  }

  /**
   * 计算指定年龄的小限宫位索引
   *
   * @param birthYearBranch 出生年地支
   * @param gender 性别
   * @param nominalAge 虚岁
   * @returns 小限宫位索引
   */
  static getAgePalaceIndex(
    birthYearBranch: string,
    gender: '男' | '女',
    nominalAge: number
  ): number {
    const startIndex = this.getAgeStartIndex(birthYearBranch);
    if (startIndex === -1) {
      throw new Error(`无效的出生年地支: ${birthYearBranch}`);
    }

    // 男顺女逆
    const isClockwise = gender === '男';
    const ageOffset = nominalAge - 1; // 1岁对应起始宫位

    if (isClockwise) {
      return this.fixIndex(startIndex + ageOffset);
    } else {
      return this.fixIndex(startIndex - ageOffset);
    }
  }

  /**
   * 修正索引到指定范围内
   * @param index 当前索引
   * @param max 最大循环数，默认为12
   * @returns 处理后的索引
   */
  private static fixIndex(index: number, max: number = 12): number {
    if (index < 0) {
      return this.fixIndex(index + max, max);
    }

    if (index > max - 1) {
      return this.fixIndex(index - max, max);
    }

    // 处理 -0 的情况
    const res = 1 / index === -Infinity ? 0 : index;

    return res;
  }

  /**
   * 处理地支相对于十二宫的索引
   * 因为十二宫是以寅宫开始，所以下标需要减去地支寅的索引
   * @param earthlyBranchName 地支名称（中文）
   * @returns 宫位索引 (0~11)
   */
  private static fixEarthlyBranchIndex(earthlyBranchName: string): number {
    const earthlyBranchIndex = EarthlyBranchNames.indexOf(earthlyBranchName);
    const yinIndex = EarthlyBranchNames.indexOf('寅'); // 寅宫为起始宫位

    return this.fixIndex(earthlyBranchIndex - yinIndex);
  }
}
