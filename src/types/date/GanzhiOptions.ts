/**
 * 天干地支分界选项
 */
export type GanzhiBoundaryOptions = {
  /** exact：立春分界，normal：除夕分界 */
  year?: "exact" | "normal";
  /** exact: 获取阴历月的干支（新的一月以节交接当天零点起算）, normal: 获取阴历月的干支（新的一月以节交接准确时刻起算） */
  month?: "exact" | "normal";
};
