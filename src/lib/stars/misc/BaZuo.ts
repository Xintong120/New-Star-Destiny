/**
 * 八座星曜位置计算模块
 *
 * 职责：
 * - 根据农历生日和右弼位置计算八座的位置
 *
 * 算法说明：
 * 安八座诀：
 * 由右弼之宫位起初一，逆行至生日安八座。
 *
 * 算法解析：
 * 1. 从右弼之宫作为1号顺数到出生日（农历）确定步数N
 * 2. 从右弼之宫位逆数N-1步确定八座位置
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 八座位置结果
 */
export interface BaZuoPosition {
  /** 八座索引 */
  baZuoIndex: number;
}

// ==================== 工具函数 ====================

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

/**
 * 标准化农历日
 */
function NormalizeLunarDay(lunarDay: number): number {
  if (lunarDay < 1 || lunarDay > 30) {
    throw new Error(`无效的农历日: ${lunarDay}，应该在1-30之间`);
  }
  return lunarDay;
}

// ==================== 核心计算函数 ====================

/**
 * 获取八座的索引
 *
 * @param lunarDay 农历生日【1～30】
 * @param youIndex 右弼宫位索引
 * @returns 八座索引
 */
export function GetBaZuoIndex(lunarDay: number, youIndex: number): BaZuoPosition {
  // 步骤1: 标准化输入
  const normalizedDay = NormalizeLunarDay(lunarDay);

  // 步骤2: 计算八座位置
  // 从右弼宫位顺数到生日确定步数N = normalizedDay
  // 从右弼宫位逆数N-1步确定八座位置
  const baZuoIndex = FixIndex(youIndex - (normalizedDay - 1));

  return {
    baZuoIndex: baZuoIndex
  };
}

// ==================== 默认导出 ====================

export default GetBaZuoIndex;