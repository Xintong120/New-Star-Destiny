/**
 * 天巫星曜位置计算模块
 *
 * 职责：
 * - 根据农历月份计算天巫的位置
 *
 * 算法说明：
 * 正五九月在巳，二六十月在申，
 * 三七十一在寅，四八十二在亥。
 *
 * 按月份固定宫位：
 * - 正月、五月、九月：巳宫
 * - 二月、六月、十月：申宫
 * - 三月、七月、十一月：寅宫
 * - 四月、八月、十二月：亥宫
 */

import type { HeavenlyStemName, EarthlyBranchName } from '../minor/types';

// ==================== 类型定义 ====================

/**
 * 天巫位置结果
 */
export interface TianWuPosition {
  /** 天巫索引 */
  tianWuIndex: number;
}

// ==================== 常量定义 ====================

/**
 * 月份到宫位的映射
 * 宫位索引：寅0卯1辰2巳3午4未5申6酉7戌8亥9子10丑11
 */
const MonthToPalaceIndex: Record<number, number> = {
  1: 3,   // 正月 -> 巳宫
  2: 6,   // 二月 -> 申宫
  3: 0,   // 三月 -> 寅宫
  4: 9,   // 四月 -> 亥宫
  5: 3,   // 五月 -> 巳宫
  6: 6,   // 六月 -> 申宫
  7: 0,   // 七月 -> 寅宫
  8: 9,   // 八月 -> 亥宫
  9: 3,   // 九月 -> 巳宫
  10: 6,  // 十月 -> 申宫
  11: 0,  // 十一月 -> 寅宫
  12: 9   // 十二月 -> 亥宫
};

// ==================== 工具函数 ====================

/**
 * 标准化月份索引
 */
function NormalizeMonthIndex(lunarMonth: number): number {
  if (lunarMonth < 1 || lunarMonth > 12) {
    throw new Error(`无效的农历月份: ${lunarMonth}，应该在1-12之间`);
  }
  return lunarMonth;
}

/**
 * 计算天巫星宫位索引
 * 根据月份固定宫位
 */
function GetTianWuPalaceIndex(lunarMonth: number): number {
  const normalizedMonth = NormalizeMonthIndex(lunarMonth);
  const palaceIndex = MonthToPalaceIndex[normalizedMonth];

  if (palaceIndex === undefined) {
    throw new Error(`未找到月份 ${normalizedMonth} 对应的天巫宫位`);
  }

  return palaceIndex;
}

// ==================== 核心计算函数 ====================

/**
 * 获取天巫的索引
 *
 * @param lunarMonth 农历月份【1～12】
 * @returns 天巫索引
 */
export function GetTianWuIndex(lunarMonth: number): TianWuPosition {
  // 步骤1: 计算天巫星宫位索引
  const tianWuIndex = GetTianWuPalaceIndex(lunarMonth);

  return {
    tianWuIndex: tianWuIndex
  };
}

// ==================== 默认导出 ====================

export default GetTianWuIndex;
