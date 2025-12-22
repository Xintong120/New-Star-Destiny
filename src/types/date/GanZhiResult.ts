/**
 * 天干地支计算结果接口
 */
export interface GanZhiResult {
  yearly: [string, string];   // 年干支
  monthly: [string, string];  // 月干支
  daily: [string, string];    // 日干支
  hourly: [string, string];   // 时干支
}
