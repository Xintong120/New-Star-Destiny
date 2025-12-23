/**
 * 左辅右弼星曜位置计算模块
 *
 * 职责：
 * - 根据农历月份计算左辅右弼的位置
 *
 * 算法说明：
 * - 辰上顺正寻左辅：从辰宫顺数农历月份数是左辅的索引
 * - 戌上逆正右弼当：从戌宫逆数农历月份数是右弼的索引
 */

// ==================== 类型定义 ====================

/**
 * 左辅右弼位置结果
 */
export interface ZuoYouPosition {
  /** 左辅索引 */
  zuoIndex: number;
  /** 右弼索引 */
  youIndex: number;
}

// ==================== 常量定义 ====================

// 辰宫索引（左辅起始位置）
const ChenIndex = 2;

// 戌宫索引（右弼起始位置）
const XuIndex = 8;

// ==================== 工具函数 ====================

/**
 * 计算月份偏移量
 * 将农历月份转换为计算偏移量（月份-1）
 */
function CalculateMonthOffset(lunarMonth: number): number {
  if (lunarMonth < 1 || lunarMonth > 12) {
    throw new Error(`无效的农历月份: ${lunarMonth}，应该在1-12之间`);
  }
  return lunarMonth - 1;
}

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

/**
 * 计算顺时针星曜位置
 */
function CalculateForwardStarIndex(startIndex: number, offset: number): number {
  return FixIndex(startIndex + offset);
}

/**
 * 计算逆时针星曜位置
 */
function CalculateReverseStarIndex(startIndex: number, offset: number): number {
  return FixIndex(startIndex - offset);
}

// ==================== 核心计算函数 ====================

/**
 * 获取左辅右弼的索引
 *
 * @param lunarMonth 农历月份（1-12）
 * @returns 左辅、右弼索引
 */
export function GetZuoYouIndex(lunarMonth: number): ZuoYouPosition {
  // 步骤1：计算月份偏移量，只计算一次
  const offset = CalculateMonthOffset(lunarMonth);

  // 步骤2：并行计算两个星曜位置，逻辑清晰
  return {
    // 左辅：从辰宫顺时针计算
    zuoIndex: CalculateForwardStarIndex(ChenIndex, offset),
    // 右弼：从戌宫逆时针计算
    youIndex: CalculateReverseStarIndex(XuIndex, offset)
  };
}

// ==================== 默认导出 ====================

export default GetZuoYouIndex;
