/**
 * 地空地劫星曜位置计算模块
 *
 * 职责：
 * - 根据时辰计算地空地劫的位置
 *
 * 算法说明：
 * 亥上子时顺安劫，逆回便是地空亡(时)
 *
 * 步骤：
 * 1. 从亥宫开始
 * 2. 顺数时辰数得到地劫位置
 * 3. 逆数时辰数得到地空位置
 */

/**
 * 地空地劫位置结果
 */
export interface KongJiePosition {
  /** 地空索引 */
  kongIndex: number;
  /** 地劫索引 */
  jieIndex: number;
}

// ==================== 常量定义 ====================

// 亥宫索引（地空地劫起始位置）
const HaiIndex = 9;

// ==================== 工具函数 ====================

/**
 * 修正索引，确保在0-11范围内
 */
function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}

/**
 * 标准化时辰索引
 */
function NormalizeTimeIndex(timeIndex: number): number {
  if (timeIndex < 0 || timeIndex > 12) {
    throw new Error(`无效的时辰索引: ${timeIndex}，应该在0-12之间`);
  }
  // 晚子时（12）转换为子时（0）
  return timeIndex === 12 ? 0 : timeIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取地空地劫的索引（按时辰）
 *
 * @param timeIndex 时辰索引【0～12】
 * @returns 地空、地劫索引
 */
export function GetKongJieIndex(timeIndex: number): KongJiePosition {
  // 步骤1: 标准化输入
  const normalizedTimeIndex = NormalizeTimeIndex(timeIndex);

  // 步骤2: 计算地空地劫位置
  return {
    // 地空：从亥宫逆时针计算（逆回）
    kongIndex: FixIndex(HaiIndex - normalizedTimeIndex),
    // 地劫：从亥宫顺时针计算（顺安）
    jieIndex: FixIndex(HaiIndex + normalizedTimeIndex)
  };
}

export default GetKongJieIndex;
