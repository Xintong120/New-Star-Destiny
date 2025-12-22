import { HeavenlyStemNames, EarthlyBranchNames } from './GanzhiConstants';

/**
 * 天干地支验证工具
 */
export class GanzhiValidation {
  /**
   * 验证天干地支的有效性
   * @param gan 天干
   * @param zhi 地支
   * @returns 是否有效
   */
  static isValidGanZhi(gan: string, zhi: string): boolean {
    return HeavenlyStemNames.includes(gan) && EarthlyBranchNames.includes(zhi);
  }
}
