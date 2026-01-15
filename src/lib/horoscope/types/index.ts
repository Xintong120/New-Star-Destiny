/**
 * 运限计算类型定义统一导出
 */

// 导出基础类型
export type {
  HoroscopeType,
  IAstrolabe,
  IPalace,
  Palace
} from './base';

// 导出计算器类型
export type {
  DecadalInfo,
  YearlyInfo,
  MonthlyInfo,
  DailyInfo,
  HourlyInfo,
  HoroscopeInfo
} from './calculator';

// 导出分析器类型
export type {
  HoroscopeData,
  HoroscopeAnalysis,
  DecadalAnalysis,
  YearlyAnalysis,
  MonthlyAnalysis
} from './analyzer';

// 导出管理器类型
export type {
  DecadeInfo,
  YearInfo,
  MonthInfo,
  DayInfo,
  HourInfo,
  HoroscopeSelection,
  HoroscopeDataManager
} from './manager';
