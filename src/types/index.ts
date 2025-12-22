/**
 * 类型定义统一导出
 */

// 导出所有子模块的类型
export * from './astrolabe';
export * from './date';

// 导出根级别的类型
export type { PersonInfo } from './Person';
export type { AgeCalculationMethod, DecadalMethod, HoroscopeInfo as HoroscopeInfoType } from './age/AgeTypes';