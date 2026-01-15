/**
 * 运限流动星计算器
 *
 * 计算紫微斗数中大限、流年、流月等运限的流动星曜位置
 */

export interface FlowingStar {
  name: string;
  horoscopeType: 'decadal' | 'yearly' | 'monthly';
}

export class HoroscopeFlowingStarsCalculator {
  /**
   * 地支数组（从寅开始）
   */
  private static readonly EARTHLY_BRANCHES = ['寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥', '子', '丑'];

  /**
   * 计算大限流动星曜
   * @param heavenlyStem 大限天干
   * @param palaceBranch 宫位地支
   * @param lifePalaceBranch 大限命宫地支
   * @returns 该宫位的大限流动星曜数组
   */
  static calculateDecadalFlowingStars(
    heavenlyStem: string,
    palaceBranch: string,
    lifePalaceBranch: string
  ): FlowingStar[] {
    const stars: FlowingStar[] = [];
    const palaceIndex = this.EARTHLY_BRANCHES.indexOf(palaceBranch);
    const lifePalaceIndex = this.EARTHLY_BRANCHES.indexOf(lifePalaceBranch);

    if (palaceIndex === -1 || lifePalaceIndex === -1) {
      return stars;
    }

    // 运禄、运羊、运陀
    const luCunBranch = this.getLuCunBranch(heavenlyStem);
    if (luCunBranch) {
      if (palaceBranch === luCunBranch) {
        stars.push({ name: '运禄', horoscopeType: 'decadal' });
      }

      const luCunIndex = this.EARTHLY_BRANCHES.indexOf(luCunBranch);
      const yangIndex = (luCunIndex + 1) % 12;
      const tuoIndex = (luCunIndex + 11) % 12;

      if (palaceIndex === yangIndex) {
        stars.push({ name: '运羊', horoscopeType: 'decadal' });
      }
      if (palaceIndex === tuoIndex) {
        stars.push({ name: '运陀', horoscopeType: 'decadal' });
      }
    }

    // 运魁、运钺
    const kuiYueBranches = this.getKuiYueBranches(heavenlyStem);
    if (kuiYueBranches) {
      if (palaceBranch === kuiYueBranches.kui) {
        stars.push({ name: '运魁', horoscopeType: 'decadal' });
      }
      if (palaceBranch === kuiYueBranches.yue) {
        stars.push({ name: '运钺', horoscopeType: 'decadal' });
      }
    }

    // 运昌、运曲
    const changQuBranches = this.getChangQuBranches(heavenlyStem);
    if (changQuBranches) {
      if (palaceBranch === changQuBranches.chang) {
        stars.push({ name: '运昌', horoscopeType: 'decadal' });
      }
      if (palaceBranch === changQuBranches.qu) {
        stars.push({ name: '运曲', horoscopeType: 'decadal' });
      }
    }

    // 运马、运鸾、运喜 (以大限命宫为准)
    const tianMaBranch = this.getTianMaBranch(lifePalaceBranch);
    if (tianMaBranch && palaceBranch === tianMaBranch) {
      stars.push({ name: '运马', horoscopeType: 'decadal' });
    }

    const hongLuanIndex = this.getHongLuanIndex(lifePalaceIndex);
    if (hongLuanIndex === palaceIndex) {
      stars.push({ name: '运鸾', horoscopeType: 'decadal' });
    }

    const tianXiIndex = (hongLuanIndex + 6) % 12;
    if (tianXiIndex === palaceIndex) {
      stars.push({ name: '运喜', horoscopeType: 'decadal' });
    }

    return stars;
  }

  /**
   * 计算流年流动星曜
   * @param heavenlyStem 流年天干
   * @param palaceBranch 宫位地支
   * @param lifePalaceBranch 流年命宫地支
   * @returns 该宫位的流年流动星曜数组
   */
  static calculateYearlyFlowingStars(
    heavenlyStem: string,
    palaceBranch: string,
    lifePalaceBranch: string
  ): FlowingStar[] {
    const stars: FlowingStar[] = [];
    const palaceIndex = this.EARTHLY_BRANCHES.indexOf(palaceBranch);
    const lifePalaceIndex = this.EARTHLY_BRANCHES.indexOf(lifePalaceBranch);

    if (palaceIndex === -1 || lifePalaceIndex === -1) {
      return stars;
    }

    // 流禄、流羊、流陀
    const luCunBranch = this.getLuCunBranch(heavenlyStem);
    if (luCunBranch) {
      if (palaceBranch === luCunBranch) {
        stars.push({ name: '流禄', horoscopeType: 'yearly' });
      }

      const luCunIndex = this.EARTHLY_BRANCHES.indexOf(luCunBranch);
      const yangIndex = (luCunIndex + 1) % 12;
      const tuoIndex = (luCunIndex + 11) % 12;

      if (palaceIndex === yangIndex) {
        stars.push({ name: '流羊', horoscopeType: 'yearly' });
      }
      if (palaceIndex === tuoIndex) {
        stars.push({ name: '流陀', horoscopeType: 'yearly' });
      }
    }

    // 流魁、流钺
    const kuiYueBranches = this.getKuiYueBranches(heavenlyStem);
    if (kuiYueBranches) {
      if (palaceBranch === kuiYueBranches.kui) {
        stars.push({ name: '流魁', horoscopeType: 'yearly' });
      }
      if (palaceBranch === kuiYueBranches.yue) {
        stars.push({ name: '流钺', horoscopeType: 'yearly' });
      }
    }

    // 流昌、流曲
    const changQuBranches = this.getChangQuBranches(heavenlyStem);
    if (changQuBranches) {
      if (palaceBranch === changQuBranches.chang) {
        stars.push({ name: '流昌', horoscopeType: 'yearly' });
      }
      if (palaceBranch === changQuBranches.qu) {
        stars.push({ name: '流曲', horoscopeType: 'yearly' });
      }
    }

    // 流马、流鸾、流喜 (以流年命宫为准)
    const tianMaBranch = this.getTianMaBranch(lifePalaceBranch);
    if (tianMaBranch && palaceBranch === tianMaBranch) {
      stars.push({ name: '流马', horoscopeType: 'yearly' });
    }

    const hongLuanIndex = this.getHongLuanIndex(lifePalaceIndex);
    if (hongLuanIndex === palaceIndex) {
      stars.push({ name: '流鸾', horoscopeType: 'yearly' });
    }

    const tianXiIndex = (hongLuanIndex + 6) % 12;
    if (tianXiIndex === palaceIndex) {
      stars.push({ name: '流喜', horoscopeType: 'yearly' });
    }

    return stars;
  }

  /**
   * 计算流月流动星曜
   * @param heavenlyStem 流月天干
   * @param palaceBranch 宫位地支
   * @param lifePalaceBranch 流月命宫地支
   * @returns 该宫位的流月流动星曜数组
   */
  static calculateMonthlyFlowingStars(
    heavenlyStem: string,
    palaceBranch: string,
    lifePalaceBranch: string
  ): FlowingStar[] {
    const stars: FlowingStar[] = [];
    const palaceIndex = this.EARTHLY_BRANCHES.indexOf(palaceBranch);
    const lifePalaceIndex = this.EARTHLY_BRANCHES.indexOf(lifePalaceBranch);

    if (palaceIndex === -1 || lifePalaceIndex === -1) {
      return stars;
    }

    // 流禄、流羊、流陀
    const luCunBranch = this.getLuCunBranch(heavenlyStem);
    if (luCunBranch) {
      if (palaceBranch === luCunBranch) {
        stars.push({ name: '流禄', horoscopeType: 'monthly' });
      }

      const luCunIndex = this.EARTHLY_BRANCHES.indexOf(luCunBranch);
      const yangIndex = (luCunIndex + 1) % 12;
      const tuoIndex = (luCunIndex + 11) % 12;

      if (palaceIndex === yangIndex) {
        stars.push({ name: '流羊', horoscopeType: 'monthly' });
      }
      if (palaceIndex === tuoIndex) {
        stars.push({ name: '流陀', horoscopeType: 'monthly' });
      }
    }

    // 流魁、流钺
    const kuiYueBranches = this.getKuiYueBranches(heavenlyStem);
    if (kuiYueBranches) {
      if (palaceBranch === kuiYueBranches.kui) {
        stars.push({ name: '流魁', horoscopeType: 'monthly' });
      }
      if (palaceBranch === kuiYueBranches.yue) {
        stars.push({ name: '流钺', horoscopeType: 'monthly' });
      }
    }

    // 流昌、流曲
    const changQuBranches = this.getChangQuBranches(heavenlyStem);
    if (changQuBranches) {
      if (palaceBranch === changQuBranches.chang) {
        stars.push({ name: '流昌', horoscopeType: 'monthly' });
      }
      if (palaceBranch === changQuBranches.qu) {
        stars.push({ name: '流曲', horoscopeType: 'monthly' });
      }
    }

    // 流马、流鸾、流喜 (以流月命宫为准)
    const tianMaBranch = this.getTianMaBranch(lifePalaceBranch);
    if (tianMaBranch && palaceBranch === tianMaBranch) {
      stars.push({ name: '流马', horoscopeType: 'monthly' });
    }

    const hongLuanIndex = this.getHongLuanIndex(lifePalaceIndex);
    if (hongLuanIndex === palaceIndex) {
      stars.push({ name: '流鸾', horoscopeType: 'monthly' });
    }

    const tianXiIndex = (hongLuanIndex + 6) % 12;
    if (tianXiIndex === palaceIndex) {
      stars.push({ name: '流喜', horoscopeType: 'monthly' });
    }

    return stars;
  }

  /**
   * 获取禄存对应的地支
   */
  private static getLuCunBranch(heavenlyStem: string): string | null {
    const luCunMap: Record<string, string> = {
      '甲': '寅', '乙': '卯', '丙': '巳', '丁': '午',
      '戊': '巳', '己': '午', '庚': '申', '辛': '酉',
      '壬': '亥', '癸': '子'
    };
    return luCunMap[heavenlyStem] || null;
  }

  /**
   * 获取魁钺对应的地支
   */
  private static getKuiYueBranches(heavenlyStem: string): { kui: string; yue: string } | null {
    const kuiYueMap: Record<string, { kui: string; yue: string }> = {
      '甲': { kui: '丑', yue: '未' }, '戊': { kui: '丑', yue: '未' }, '庚': { kui: '丑', yue: '未' },
      '乙': { kui: '子', yue: '申' }, '己': { kui: '子', yue: '申' },
      '丙': { kui: '亥', yue: '酉' }, '丁': { kui: '亥', yue: '酉' },
      '辛': { kui: '寅', yue: '午' },
      '壬': { kui: '卯', yue: '巳' }, '癸': { kui: '卯', yue: '巳' }
    };
    return kuiYueMap[heavenlyStem] || null;
  }

  /**
   * 获取昌曲对应的地支
   */
  private static getChangQuBranches(heavenlyStem: string): { chang: string; qu: string } | null {
    const changQuMap: Record<string, { chang: string; qu: string }> = {
      '甲': { chang: '巳', qu: '酉' }, '乙': { chang: '午', qu: '申' },
      '丙': { chang: '申', qu: '午' }, '戊': { chang: '申', qu: '午' },
      '丁': { chang: '酉', qu: '巳' }, '己': { chang: '酉', qu: '巳' },
      '庚': { chang: '亥', qu: '卯' },
      '辛': { chang: '子', qu: '寅' },
      '壬': { chang: '寅', qu: '子' },
      '癸': { chang: '卯', qu: '亥' }
    };
    return changQuMap[heavenlyStem] || null;
  }

  /**
   * 获取天马对应的地支
   */
  private static getTianMaBranch(lifePalaceBranch: string): string | null {
    const tianMaMap: Record<string, string> = {
      '寅': '申', '午': '申', '戌': '申',
      '申': '寅', '子': '寅', '辰': '寅',
      '巳': '亥', '酉': '亥', '丑': '亥',
      '亥': '巳', '卯': '巳', '未': '巳'
    };
    return tianMaMap[lifePalaceBranch] || null;
  }

  /**
   * 获取红鸾对应的索引位置
   */
  private static getHongLuanIndex(lifePalaceIndex: number): number {
    const maoIndex = this.EARTHLY_BRANCHES.indexOf('卯'); // 卯宫索引
    return (maoIndex - lifePalaceIndex + 12) % 12;
  }
}