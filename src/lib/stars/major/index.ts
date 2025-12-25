/**
 * Major stars calculation module
 * 主星（紫微星系 + 天府星系）计算模块
 *
 * 紫微斗数14颗主星：
 * - 紫微星系（6颗）：紫微、天机、太阳、武曲、天同、廉贞
 * - 天府星系（8颗）：天府、太阴、贪狼、巨门、天相、天梁、七杀、破军
 */

import { ZiweiStarSequence, TianfuStarSequence } from './constants';

// Export types
export type { MajorStarDistribution } from './types';
export type { Brightness, Mutagen } from '../shared-types';

// Export constants
export {
  FiveElementsValues,
  ZiweiStarSequence,
  TianfuStarSequence,
  BrightnessMap
} from './constants';

export { MutagenMap } from '../shared-types';

// Export utilities
export { FixIndex } from './utils';

// Export calculators
export { CalculateZiweiIndex } from './ZiWeiCalculator';
export { CalculateTianfuIndex } from './TianFuCalculator';
export { CalculateMajorStarDistribution } from './DistributionCalculator';

// Export brightness functions
export {
  GetMajorStarBrightness,
  HasMajorStarBrightness,
  GetMajorStarsWithBrightness,
  GetMajorStarBrightnessDistribution,
  GetMajorStarBrightnessInfo
} from './BrightnessMutagenCalculator';

// Export mutagen functions
export {
  GetStarMutagen,
  GetMutagenStars,
  GetMutagenInfo
} from '../mutagen/calculator';

/**
 * 获取主星计算的详细信息（用于调试和文档）
 */
export function GetMajorStarInfo() {
  return {
    description: '紫微斗数14颗主星计算模块',
    ziweiStars: ZiweiStarSequence.filter((s: string) => s !== ''),
    tianfuStars: TianfuStarSequence.filter((s: string) => s !== ''),
    algorithm: {
      ziwei: '从紫微星位置逆时针安星',
      tianfu: '从天府星位置顺时针安星',
      position: '紫微星和天府星相对（相差6宫）'
    }
  };
}
