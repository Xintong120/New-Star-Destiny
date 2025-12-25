/**
 * 紫微斗数宫位相关类型和计算
 */

import { FixIndex, HeavenlyStems, EarthlyBranches, PalaceNames } from './utils';
import type { LifePalaceInfo } from '../../types/astrolabe/LifePalaceInfo';
import type { PalaceStar } from '../../types/astrolabe/PalaceStar';
import type { Palace } from '../../types/astrolabe/Palace';
import { CalculateMajorStarDistribution, GetMajorStarBrightness, GetStarMutagen } from '../stars/major';
import { GetMinorStarBrightness } from '../stars/minor';
import { CalculateMinorStarDistribution } from '../stars/minor';
import { GetTaiFuIndex, GetFengGaoIndex, GetTianXingIndex, GetTianYaoIndex, GetJieShenIndex, GetTianWuIndex, GetTianYueIndex, GetYinShaIndex, GetJieKongIndex, GetTianShangIndex, GetTianShiIndex, GetTianKongIndex, GetTianKuIndex, GetTianXuIndex, GetLongChiIndex, GetFengGeIndex, GetHongLuanIndex, GetTianXiIndex, GetFeiLianIndex, GetPoSuiIndex, GetHuaGaiIndex, GetXianChiIndex, GetTianCaiIndex, GetTianShouIndex, GetSanTaiIndex, GetBaZuoIndex, GetEnGuangIndex, GetTianGuiIndex, } from '../stars/misc';
import { GetZuoYouIndex } from '../stars/minor/FuBi';
import { GetChangQuIndex } from '../stars/minor/ChangQu';

/**
 * 将中文地支转换为拼音格式
 */
function ConvertChineseBranchToPinyin(chineseBranch: string): string {
  const mapping: Record<string, string> = {
    '子': 'zi', '丑': 'chou', '寅': 'yin', '卯': 'mao',
    '辰': 'chen', '巳': 'si', '午': 'woo', '未': 'wei',
    '申': 'shen', '酉': 'you', '戌': 'xu', '亥': 'hai'
  };
  return mapping[chineseBranch] || chineseBranch;
}

/**
 * 将主星名称数组转换为宫位星曜对象数组
 *
 * @param starNames 主星名称数组
 * @param palaceIndex 宫位索引（0-11，0=寅宫）
 * @param yearlyHeavenlyStem 年干（如：'甲'）
 * @returns 宫位星曜对象数组
 */
function ConvertMajorStarsToPalaceStars(starNames: string[], palaceIndex: number, yearlyHeavenlyStem?: string): PalaceStar[] {
  return starNames.map(name => ({
    name,
    brightness: GetMajorStarBrightness(name, palaceIndex),
    mutagen: yearlyHeavenlyStem ? GetStarMutagen(name, yearlyHeavenlyStem) : undefined
  }));
}

/**
 * 将辅星数据转换为宫位星曜对象数组
 *
 * @param minorStars 辅星数据数组
 * @param palaceIndex 宫位索引（0-11，从寅宫开始）
 * @returns 宫位星曜对象数组
 */
function ConvertMinorStarsToPalaceStars(minorStars: Array<{name: string, sihua?: string}>, palaceIndex: number): PalaceStar[] {
  return minorStars.map(star => ({
    name: star.name,
    brightness: GetMinorStarBrightness(star.name, palaceIndex),
    mutagen: star.sihua // 四化信息
  }));
}

/**
 * 计算十二宫位的天干地支、主星和辅星分布
 *
 * @param lifePalaceInfo 命宫信息
 * @param soulIndex 命宫索引（0-11，0=寅宫）
 * @param bodyPalaceIndex 身宫索引（0-11，0=寅宫）
 * @param lunarDay 农历日期（1-30）
 * @param fiveElementsClass 五行局名称
 * @param yearlyHeavenlyStem 年干（如：'甲'）
 * @param yearlyEarthlyBranch 年支（如：'子'）
 * @param lunarMonth 农历月份（1-12）
 * @param timeIndex 时辰索引（0-12）
 * @returns 十二宫位数组（从寅宫开始）
 */
export function CalculateTwelvePalaces(
  lifePalaceInfo: LifePalaceInfo,
  soulIndex: number,
  bodyPalaceIndex: number,
  lunarDay?: number,
  fiveElementsClass?: string,
  yearlyHeavenlyStem?: string,
  yearlyEarthlyBranch?: string,
  lunarMonth?: number,
  timeIndex?: number
): Palace[] {
  const palaces: Palace[] = [];

  // 计算主星分布（如果提供了必要的参数）
  let majorStarDistribution: string[][] = [];
  if (lunarDay && fiveElementsClass) {
    majorStarDistribution = CalculateMajorStarDistribution(lunarDay, fiveElementsClass);
  }

  // 计算辅星分布（如果提供了必要的参数）
  let minorStarDistribution: Array<{name: string, sihua?: string}[]> = [];
  if (yearlyHeavenlyStem && yearlyEarthlyBranch && lunarMonth !== undefined && timeIndex !== undefined) {
    minorStarDistribution = CalculateMinorStarDistribution(
      yearlyHeavenlyStem,
      yearlyEarthlyBranch,
      lunarMonth,
      timeIndex
    );
  }

  for (let i = 0; i < 12; i++) {
    // 地支：固定从寅宫（索引2）开始顺时针排列
    const earthlyBranchIndex = FixIndex(2 + i);
    const earthlyBranch = EarthlyBranches[earthlyBranchIndex];

    // 天干计算：先推算寅宫天干，再顺序递增
    // 寅宫天干 = 命宫天干 - 命宫位置
    const lifeStemIndex = HeavenlyStems.indexOf(lifePalaceInfo.heavenlyStem);
    const heavenlyStemIndex = FixIndex(lifeStemIndex - soulIndex + i, 10);
    const heavenlyStem = HeavenlyStems[heavenlyStemIndex];

    // 宫位名称：根据命宫位置旋转
    // 如果命宫在索引6（申宫），那么索引6应该叫"命宫"
    // nameIndex = (i - soulIndex + 12) % 12
    const nameIndex = FixIndex(i - soulIndex);
    const name = PalaceNames[nameIndex];

    // 获取该宫位的主星
    const majorStars = majorStarDistribution[i] || [];
    const majorStarsFormatted = ConvertMajorStarsToPalaceStars(majorStars, i, yearlyHeavenlyStem);

    // 获取该宫位的辅星
    const minorStars = minorStarDistribution[i] || [];
    const minorStarsFormatted = ConvertMinorStarsToPalaceStars(minorStars, i);

    // 计算杂曜星
    let miscStars: string[] = [];

    // 计算天伤位置（仆役宫）
    const TianShangPosition = GetTianShangIndex(soulIndex);
    if (i === TianShangPosition.tianShangIndex) {
      miscStars.push('天伤');
    }

    // 计算天使位置（疾厄宫）
    const TianShiPosition = GetTianShiIndex(soulIndex);
    if (i === TianShiPosition.tianShiIndex) {
      miscStars.push('天使');
    }
    if (timeIndex !== undefined) {
      const NormalizedTimeIndex = timeIndex === 12 ? 0 : timeIndex;

      // 计算台辅位置
      const TaiFuPosition = (4 + NormalizedTimeIndex) % 12; // 从午宫开始
      if (i === TaiFuPosition) {
        miscStars.push('台辅');
      }

      // 计算封诰位置
      const FengGaoPosition = (0 + NormalizedTimeIndex) % 12; // 从寅宫开始
      if (i === FengGaoPosition) {
        miscStars.push('封诰');
      }
    }

    if (lunarMonth !== undefined) {
      // 计算天刑位置
      const TianXingPosition = (7 + (lunarMonth - 1)) % 12; // 从酉宫开始
      if (i === TianXingPosition) {
        miscStars.push('天刑');
      }

      // 计算天姚位置
      const TianYaoPosition = (11 + (lunarMonth - 1)) % 12; // 从丑宫开始
      if (i === TianYaoPosition) {
        miscStars.push('天姚');
      }

      // 计算解神位置
      const JieShenPosition = GetJieShenIndex(lunarMonth);
      if (i === JieShenPosition.jieShenIndex) {
        miscStars.push('解神');
      }

      // 计算天巫位置
      const TianWuPosition = GetTianWuIndex(lunarMonth);
      if (i === TianWuPosition.tianWuIndex) {
        miscStars.push('天巫');
      }

      // 计算天月位置
      const TianYuePosition = GetTianYueIndex(lunarMonth);
      if (i === TianYuePosition.tianYueIndex) {
        miscStars.push('天月');
      }

      // 计算阴煞位置
      const YinShaPosition = GetYinShaIndex(lunarMonth);
      if (i === YinShaPosition.yinShaIndex) {
        miscStars.push('阴煞');
      }
    }

    if (yearlyHeavenlyStem !== undefined) {
      // 计算截空位置
      const JieKongPosition = GetJieKongIndex(yearlyHeavenlyStem as any);
      if (i === JieKongPosition.jieKongIndex) {
        miscStars.push('截空');
      }
    }

    if (yearlyEarthlyBranch !== undefined) {
      // 将中文地支转换为拼音格式供 misc 函数使用
      const pinyinBranch = ConvertChineseBranchToPinyin(yearlyEarthlyBranch);

      // 计算天空位置
      const TianKongPosition = GetTianKongIndex(pinyinBranch as any);
      if (i === TianKongPosition.tianKongIndex) {
        miscStars.push('天空');
      }

      // 计算天哭位置
      const TianKuPosition = GetTianKuIndex(pinyinBranch as any);
      if (i === TianKuPosition.tianKuIndex) {
        miscStars.push('天哭');
      }

      // 计算天虚位置
      const TianXuPosition = GetTianXuIndex(pinyinBranch as any);
      if (i === TianXuPosition.tianXuIndex) {
        miscStars.push('天虚');
      }

      // 计算龙池位置
      const LongChiPosition = GetLongChiIndex(pinyinBranch as any);
      if (i === LongChiPosition.longChiIndex) {
        miscStars.push('龙池');
      }

      // 计算凤阁位置
      const FengGePosition = GetFengGeIndex(pinyinBranch as any);
      if (i === FengGePosition.fengGeIndex) {
        miscStars.push('凤阁');
      }

      // 计算红鸾位置
      const HongLuanPosition = GetHongLuanIndex(pinyinBranch as any);
      if (i === HongLuanPosition.hongLuanIndex) {
        miscStars.push('红鸾');
      }

      // 计算天喜位置
      const TianXiPosition = GetTianXiIndex(HongLuanPosition.hongLuanIndex);
      if (i === TianXiPosition.tianXiIndex) {
        miscStars.push('天喜');
      }

      // 计算蜚廉位置
      const FeiLianPosition = GetFeiLianIndex(yearlyEarthlyBranch);
      if (i === FeiLianPosition.feiLianIndex) {
        miscStars.push('蜚廉');
      }

      // 计算破碎位置
      const PoSuiPosition = GetPoSuiIndex(yearlyEarthlyBranch);
      if (i === PoSuiPosition.poSuiIndex) {
        miscStars.push('破碎');
      }

      // 计算华盖位置
      const HuaGaiPosition = GetHuaGaiIndex(yearlyEarthlyBranch);
      if (i === HuaGaiPosition.huaGaiIndex) {
        miscStars.push('华盖');
      }

      // 计算咸池位置
      const XianChiPosition = GetXianChiIndex(yearlyEarthlyBranch);
      if (i === XianChiPosition.xianChiIndex) {
        miscStars.push('咸池');
      }

      // 计算天才位置
      const TianCaiPosition = GetTianCaiIndex(soulIndex, yearlyEarthlyBranch);
      if (i === TianCaiPosition.tianCaiIndex) {
        miscStars.push('天才');
      }

      // 计算天寿位置
      const TianShouPosition = GetTianShouIndex(bodyPalaceIndex, yearlyEarthlyBranch);
      if (i === TianShouPosition.tianShouIndex) {
        miscStars.push('天寿');
      }
    }

    if (lunarDay !== undefined && lunarMonth !== undefined) {
      // 计算左辅右弼位置
      const ZuoYouPosition = GetZuoYouIndex(lunarMonth);

      // 计算三台位置
      const SanTaiPosition = GetSanTaiIndex(lunarDay, ZuoYouPosition.zuoIndex);
      if (i === SanTaiPosition.sanTaiIndex) {
        miscStars.push('三台');
      }

      // 计算八座位置
      const BaZuoPosition = GetBaZuoIndex(lunarDay, ZuoYouPosition.youIndex);
      if (i === BaZuoPosition.baZuoIndex) {
        miscStars.push('八座');
      }
    }

    if (lunarDay !== undefined && timeIndex !== undefined) {
      // 计算文昌文曲位置
      const ChangQuPosition = GetChangQuIndex(timeIndex);

      // 计算恩光位置
      const EnGuangPosition = GetEnGuangIndex(lunarDay, ChangQuPosition.changIndex);
      if (i === EnGuangPosition.enGuangIndex) {
        miscStars.push('恩光');
      }

      // 计算天贵位置
      const TianGuiPosition = GetTianGuiIndex(lunarDay, ChangQuPosition.quIndex);
      if (i === TianGuiPosition.tianGuiIndex) {
        miscStars.push('天贵');
      }
    }

    // 输出调试信息
    const majorStarsInfo = majorStarsFormatted.map(s => `${s.name}(亮度:${s.brightness}, 四化:${s.mutagen || '无'})`).join(', ');
    const minorStarsInfo = minorStarsFormatted.map(s => `${s.name}(亮度:${s.brightness}, 四化:${s.mutagen || '无'})`).join(', ');
    console.log(`宫位 ${i}: ${name}宫 (${heavenlyStem}${earthlyBranch}) - 主星: [${majorStarsInfo}] - 辅星: [${minorStarsInfo}] - 杂曜: [${miscStars.join(', ')}]`);

    palaces.push({
      name,
      heavenlyStem,
      earthlyBranch,
      isBodyPalace: i === bodyPalaceIndex,
      majorStars: majorStarsFormatted,
      minorStars: minorStarsFormatted,
      miscStars
    });
  }

  return palaces;
}
