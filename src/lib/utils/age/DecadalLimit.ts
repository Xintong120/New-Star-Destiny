import { EarthlyBranchNames } from '../ganzhi/GanzhiConstants';
import { DecadalMethod } from '../../../types/age/AgeTypes';

/**
 * 大限计算工具
 */
export class DecadalLimit {
  /**
   * 计算大限起始年龄
   *
   * @param birthYearBranch 出生年地支
   * @param gender 性别
   * @param method 大限计算方法 (1, 2, 3)
   * @returns 大限起始年龄
   */
  static getDecadalStartAge(
    birthYearBranch: string,
    gender: '男' | '女',
    method: DecadalMethod = 1
  ): number {
    // 基础起运年龄计算
    const branchIndex = EarthlyBranchNames.indexOf(birthYearBranch);
    if (branchIndex === -1) {
      throw new Error(`无效的出生年地支: ${birthYearBranch}`);
    }

    // 男女起运年龄不同
    let baseAge: number;
    if (gender === '男') {
      // 男命：子2丑1寅12亥3戌11酉4申10未5午9巳6辰8卯7
      const maleAges = [2, 1, 12, 7, 8, 6, 9, 5, 10, 4, 11, 3];
      baseAge = maleAges[branchIndex];
    } else {
      // 女命：子8丑7寅6亥9未5午3巳12辰2卯1戌11酉10申4
      const femaleAges = [8, 7, 6, 1, 2, 12, 3, 5, 4, 10, 11, 9];
      baseAge = femaleAges[branchIndex];
    }

    // 根据不同方法调整
    switch (method) {
      case 1:
        return baseAge; // 标准方法
      case 2:
        return baseAge + 1; // 提前一年
      case 3:
        return baseAge + 2; // 提前两年
      default:
        return baseAge;
    }
  }

  /**
   * 计算大限宫位索引
   *
   * @param birthYearBranch 出生年地支
   * @param gender 性别
   * @param nominalAge 虚岁
   * @param method 大限计算方法
   * @returns 大限宫位索引，如果未起运返回 -1
   */
  static getDecadalPalaceIndex(
    birthYearBranch: string,
    gender: '男' | '女',
    nominalAge: number,
    method: DecadalMethod = 1
  ): number {
    const startAge = this.getDecadalStartAge(birthYearBranch, gender, method);

    // 如果还没起运，返回 -1
    if (nominalAge < startAge) {
      return -1;
    }

    // 计算大限序数（每10年一个大限）
    const decadalSequence = Math.floor((nominalAge - startAge) / 10);

    // 大限起始宫位（命宫开始）
    const lifePalaceIndex = 0;

    // 男顺女逆
    const isClockwise = gender === '男';

    if (isClockwise) {
      return this.fixIndex(lifePalaceIndex + decadalSequence);
    } else {
      return this.fixIndex(lifePalaceIndex - decadalSequence);
    }
  }

  /**
   * 判断是否在童限期
   *
   * @param birthYearBranch 出生年地支
   * @param gender 性别
   * @param nominalAge 虚岁
   * @param method 大限计算方法
   * @returns 是否在童限期
   */
  static isInChildhood(
    birthYearBranch: string,
    gender: '男' | '女',
    nominalAge: number,
    method: DecadalMethod = 1
  ): boolean {
    const startAge = this.getDecadalStartAge(birthYearBranch, gender, method);
    return nominalAge < startAge;
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
}
