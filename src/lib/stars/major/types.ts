/**
 * Types for major stars calculation
 */

import type { Brightness, Mutagen } from '../../../types';

/**
 * 主星分布结果
 * 索引0-11代表寅、卯、辰、巳、午、未、申、酉、戌、亥、子、丑12宫
 * 每个宫位包含一个星耀名称数组
 */
export type MajorStarDistribution = string[][];

// 导出全局类型
export type { Brightness, Mutagen };
