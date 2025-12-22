import { HeavenlyStemNames, EarthlyBranchNames } from './GanzhiConstants';

/**
 * 天干地支分析工具
 */
export class GanzhiAnalysis {
  /**
   * 获取天干的阴阳属性
   * @param gan 天干
   * @returns 'yang' | 'yin' | undefined
   */
  static getGanYinYang(gan: string): 'yang' | 'yin' | undefined {
    const yangGan = ['甲', '丙', '戊', '庚', '壬'];
    const yinGan = ['乙', '丁', '己', '辛', '癸'];

    if (yangGan.includes(gan)) return 'yang';
    if (yinGan.includes(gan)) return 'yin';
    return undefined;
  }

  /**
   * 获取地支的阴阳属性
   * @param zhi 地支
   * @returns 'yang' | 'yin' | undefined
   */
  static getZhiYinYang(zhi: string): 'yang' | 'yin' | undefined {
    const yangZhi = ['子', '寅', '辰', '午', '申', '戌'];
    const yinZhi = ['丑', '卯', '巳', '未', '酉', '亥'];

    if (yangZhi.includes(zhi)) return 'yang';
    if (yinZhi.includes(zhi)) return 'yin';
    return undefined;
  }

  /**
   * 计算两个天干地支之间的距离
   * @param ganZhi1 第一个天干地支
   * @param ganZhi2 第二个天干地支
   * @returns 距离信息
   */
  static calculateGanZhiDistance(
    ganZhi1: [string, string],
    ganZhi2: [string, string]
  ): {
    ganDistance: number;
    zhiDistance: number;
    totalDistance: number;
  } {
    const gan1Index = HeavenlyStemNames.indexOf(ganZhi1[0]);
    const gan2Index = HeavenlyStemNames.indexOf(ganZhi2[0]);
    const zhi1Index = EarthlyBranchNames.indexOf(ganZhi1[1]);
    const zhi2Index = EarthlyBranchNames.indexOf(ganZhi2[1]);

    const ganDistance = Math.abs(gan2Index - gan1Index);
    const zhiDistance = Math.abs(zhi2Index - zhi1Index);

    // 六十甲子的总距离计算
    const index1 = gan1Index * 12 + zhi1Index;
    const index2 = gan2Index * 12 + zhi2Index;
    const totalDistance = Math.abs(index2 - index1);

    return {
      ganDistance,
      zhiDistance,
      totalDistance
    };
  }
}
