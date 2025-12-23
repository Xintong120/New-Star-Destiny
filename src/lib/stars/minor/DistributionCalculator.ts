/**
 * 辅星分布计算模块
 *
 * 职责：
 * - 基于出生信息计算所有辅星的位置分布
 * - 将辅星分配到对应的宫位
 *
 * 输入参数：
 * - yearlyHeavenlyStem: 年干
 * - yearlyEarthlyBranch: 年支
 * - lunarMonth: 农历月份
 * - timeIndex: 时辰索引
 */

import {
  GetKuiYueIndex,
  GetZuoYouIndex,
  GetChangQuIndex,
  GetGuGuaIndex,
  GetHuoLingIndex,
  GetKongJieIndex,
  GetLuYangTuoMaIndex
} from './index';

/**
 * 辅星在宫位中的显示名称映射
 */
const MinorStarDisplayNames: Record<string, string> = {
  // 天魁天钺
  'kui': '天魁',
  'yue': '天钺',
  // 左辅右弼
  'zuo': '左辅',
  'you': '右弼',
  // 文昌文曲
  'chang': '文昌',
  'qu': '文曲',
  // 孤辰寡宿
  'guchen': '孤辰',
  'guas': '寡宿',
  // 火星铃星
  'huo': '火星',
  'ling': '铃星',
  // 地空地劫
  'kong': '地空',
  'jie': '地劫',
  // 禄羊陀马
  'lu': '禄存',
  'yang': '擎羊',
  'tuo': '陀罗',
  'ma': '天马', 
  // 桃花星
  'peach': '桃花',
  // 博士
  'doctor': '博士'
};

/**
 * 计算所有辅星的分布
 *
 * @param yearlyHeavenlyStem 年干（如：'甲'）
 * @param yearlyEarthlyBranch 年支（如：'子'）
 * @param lunarMonth 农历月份（1-12）
 * @param timeIndex 时辰索引（0-12）
 * @returns 12个宫位的辅星数组
 */
export function CalculateMinorStarDistribution(
  yearlyHeavenlyStem: string,
  yearlyEarthlyBranch: string,
  lunarMonth: number,
  timeIndex: number
): Array<{name: string, sihua?: string}[]> {
  // 初始化12个宫位的辅星数组
  const distribution: Array<{name: string, sihua?: string}[]> = Array.from({ length: 12 }, () => []);

  try {
    // 1. 天魁天钺 - 根据年干计算
    const kuiYueResult = GetKuiYueIndex(yearlyHeavenlyStem as any);
    if (distribution[kuiYueResult.kuiIndex]) {
      distribution[kuiYueResult.kuiIndex].push({ name: MinorStarDisplayNames.kui });
    }
    if (distribution[kuiYueResult.yueIndex]) {
      distribution[kuiYueResult.yueIndex].push({ name: MinorStarDisplayNames.yue });
    }

    // 2. 左辅右弼 - 根据农历月份计算
    const zuoYouResult = GetZuoYouIndex(lunarMonth);
    if (distribution[zuoYouResult.zuoIndex]) {
      distribution[zuoYouResult.zuoIndex].push({ name: MinorStarDisplayNames.zuo });
    }
    if (distribution[zuoYouResult.youIndex]) {
      distribution[zuoYouResult.youIndex].push({ name: MinorStarDisplayNames.you });
    }

    // 3. 文昌文曲 - 根据时辰计算
    const changQuResult = GetChangQuIndex(timeIndex);
    if (distribution[changQuResult.changIndex]) {
      distribution[changQuResult.changIndex].push({ name: MinorStarDisplayNames.chang });
    }
    if (distribution[changQuResult.quIndex]) {
      distribution[changQuResult.quIndex].push({ name: MinorStarDisplayNames.qu });
    }

    // 4. 孤辰寡宿 - 根据年支计算
    const guGuaResult = GetGuGuaIndex(yearlyEarthlyBranch);
    if (distribution[guGuaResult.guchenIndex]) {
      distribution[guGuaResult.guchenIndex].push({ name: MinorStarDisplayNames.guchen });
    }
    if (distribution[guGuaResult.guasuIndex]) {
      distribution[guGuaResult.guasuIndex].push({ name: MinorStarDisplayNames.guas });
    }

    // 5. 火星铃星 - 根据年支和时辰计算
    const huoLingResult = GetHuoLingIndex(yearlyEarthlyBranch, timeIndex);
    if (distribution[huoLingResult.huoIndex]) {
      distribution[huoLingResult.huoIndex].push({ name: MinorStarDisplayNames.huo });
    }
    if (distribution[huoLingResult.lingIndex]) {
      distribution[huoLingResult.lingIndex].push({ name: MinorStarDisplayNames.ling });
    }

    // 6. 地空地劫 - 根据时辰计算
    const kongJieResult = GetKongJieIndex(timeIndex);
    if (distribution[kongJieResult.kongIndex]) {
      distribution[kongJieResult.kongIndex].push({ name: MinorStarDisplayNames.kong });
    }
    if (distribution[kongJieResult.jieIndex]) {
      distribution[kongJieResult.jieIndex].push({ name: MinorStarDisplayNames.jie });
    }

    // 7. 禄羊陀马 - 根据年干和年支计算
    const luYangTuoMaResult = GetLuYangTuoMaIndex(yearlyHeavenlyStem, yearlyEarthlyBranch);
    if (distribution[luYangTuoMaResult.luIndex]) {
      distribution[luYangTuoMaResult.luIndex].push({ name: MinorStarDisplayNames.lu });
    }
    if (distribution[luYangTuoMaResult.yangIndex]) {
      distribution[luYangTuoMaResult.yangIndex].push({ name: MinorStarDisplayNames.yang });
    }
    if (distribution[luYangTuoMaResult.tuoIndex]) {
      distribution[luYangTuoMaResult.tuoIndex].push({ name: MinorStarDisplayNames.tuo });
    }
    if (distribution[luYangTuoMaResult.maIndex]) {
      distribution[luYangTuoMaResult.maIndex].push({ name: MinorStarDisplayNames.ma });
    }

    // 桃花星已被移除

  } catch (error) {
    console.error('辅星计算出错:', error);
    // 如果计算出错，返回空数组
    return Array.from({ length: 12 }, () => []);
  }

  return distribution;
}
