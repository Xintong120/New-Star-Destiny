/**
 * 运限计算模块
 */

// 导出类型
export type * from './types';

// 导出计算器
export * from './calculators';

// 导出管理器
export * from './managers';

// 导出便捷函数
export {
  GetHoroscopeAtDate,
  GetCurrentHoroscope,
  GetAllDecades,
  HoroscopeCalculator,
  HoroscopeFlowingStarsCalculator
} from './calculators';

// 导出管理器函数
export {
  CalculateDecades,
  CalculateYears,
  CalculateMonths,
  CalculateDays,
  CalculateHours,
  HoroscopeManager
} from './managers';
