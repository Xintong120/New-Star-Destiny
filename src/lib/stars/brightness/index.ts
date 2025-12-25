/**
 * 亮度计算模块
 *
 * 提供星曜亮度（庙、旺、得、利、平、不、陷）查询功能
 * 支持主星和辅星的亮度计算
 */

// 导出类型
export type { Brightness } from '../shared-types';

// 导出主星亮度相关
export {
  GetMajorStarBrightness,
  HasMajorStarBrightness,
  GetMajorStarsWithBrightness,
  GetMajorStarBrightnessDistribution,
  GetMajorStarBrightnessInfo
} from '../major/BrightnessMutagenCalculator';

// 导出辅星亮度相关
export {
  GetMinorStarBrightness,
  HasMinorStarBrightness,
  GetMinorStarsWithBrightness,
  GetMinorStarBrightnessDistribution,
  GetMinorStarBrightnessInfo
} from '../minor/BrightnessCalculator';
