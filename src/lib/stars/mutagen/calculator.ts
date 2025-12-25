/**
 * 四化计算器
 *
 * 提供星曜四化（禄、权、科、忌）查询功能
 * 支持主星和辅星的四化计算
 */

import type { Mutagen } from './types';
import { MutagenMap } from './types';

/**
 * 获取星曜的四化
 *
 * @param starName 星曜名称（主星或辅星）
 * @param yearStem 年份天干
 * @returns 四化类型
 *
 * @example
 * ```typescript
 * const mutagen = GetStarMutagen('廉贞', '甲');  // 返回 '禄'
 * const mutagen2 = GetStarMutagen('破军', '甲');  // 返回 '权'
 * const mutagen3 = GetStarMutagen('文昌', '丙');  // 返回 '科'
 * ```
 */
export function GetStarMutagen(starName: string, yearStem: string): Mutagen {
  const mutagenStars = MutagenMap[yearStem];

  if (!mutagenStars) {
    return '';
  }

  const mutagenNames: Mutagen[] = ['禄', '权', '科', '忌'];
  const index = mutagenStars.indexOf(starName);

  if (index === -1) {
    return '';
  }

  return mutagenNames[index];
}

/**
 * 获取某个天干的四化星
 *
 * @param yearStem 年份天干
 * @returns 四化星数组 [禄, 权, 科, 忌]
 *
 * @example
 * ```typescript
 * const mutagens = GetMutagenStars('甲');
 * // 返回 ['廉贞', '破军', '武曲', '太阳']
 * ```
 */
export function GetMutagenStars(yearStem: string): [string, string, string, string] | undefined {
  return MutagenMap[yearStem];
}

/**
 * 获取四化模块信息（用于调试和文档）
 */
export function GetMutagenInfo() {
  return {
    description: '四化计算模块',
    mutagenTypes: ['禄', '权', '科', '忌'],
    supportedStems: Object.keys(MutagenMap),
    totalSupportedStems: Object.keys(MutagenMap).length
  };
}