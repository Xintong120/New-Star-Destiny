/**
 * 命宫计算结果
 */
export interface LifePalaceInfo {
  /** 命宫索引（0-11） */
  index: number;
  /** 命宫天干 */
  heavenlyStem: string;
  /** 命宫地支 */
  earthlyBranch: string;
}