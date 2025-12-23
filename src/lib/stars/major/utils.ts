/**
 * Utility functions for major stars calculation
 */

/**
 * 修正索引到0-11范围内（12宫循环）
 *
 * @param index 原始索引
 * @returns 修正后的索引（0-11）
 */
export function FixIndex(index: number): number {
  return ((index % 12) + 12) % 12;
}
