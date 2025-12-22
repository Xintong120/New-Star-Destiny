/**
 * 紫微斗数命主身主计算
 */

import { EARTHLY_BRANCH_TO_SOUL, EARTHLY_BRANCH_TO_BODY } from './utils';
import type { SoulAndBodyInfo } from '../../types/astrolabe/SoulAndBodyInfo';

/**
 * 获取命主和身主
 *
 * @param lifePalaceEarthlyBranch 命宫地支
 * @param yearEarthlyBranch 年份地支（用于计算身主）
 * @param bodyPalaceIndex 身宫索引
 * @returns 命主身主信息
 */
export function getSoulAndBody(
  lifePalaceEarthlyBranch: string,
  yearEarthlyBranch: string,
  bodyPalaceIndex: number
): SoulAndBodyInfo {
  return {
    soul: EARTHLY_BRANCH_TO_SOUL[lifePalaceEarthlyBranch] || '未知',
    body: EARTHLY_BRANCH_TO_BODY[yearEarthlyBranch] || '未知',  // 身主根据年份地支
    bodyPalaceIndex
  };
}