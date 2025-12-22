/**
 * 年龄和运限相关类型定义
 */

/**
 * 年龄计算方法
 */
export type AgeCalculationMethod = 'birthday' | 'natural';

/**
 * 大限计算方法
 */
export type DecadalMethod = 1 | 2 | 3;

/**
 * 运限信息
 */
export interface HoroscopeInfo {
  isChildhood: boolean;
  decadalIndex: number;
  ageIndex: number;
  decadalName: string;
  childPalace?: string;
}
