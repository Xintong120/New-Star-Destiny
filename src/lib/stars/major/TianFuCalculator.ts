/**
 * Tianfu star calculation module
 */

import { FixIndex } from './utils';

/**
 * 计算天府星所在宫位索引
 *
 * 规则：天府星与紫微星"逆对"
 * 公式：tianfuIndex = 12 - ziweiIndex (模12)
 *
 * 例如：
 * - 紫微在寅(0)，天府在寅(0)
 * - 紫微在卯(1)，天府在丑(11)
 * - 紫微在未(5)，天府在酉(7)
 *
 * @param ziweiIndex 紫微星索引
 * @returns 天府星索引（0-11，0=寅宫）
 */
export function CalculateTianfuIndex(ziweiIndex: number): number {
  // 天府星位置 = 12 - 紫微星位置 (模12)
  // 这相当于 fixIndex(-ziweiIndex)，表示紫微星的逆时针对宫
  return FixIndex(12 - ziweiIndex);
}
