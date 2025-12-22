import { GanZhiResult } from '../../../types/date/GanZhiResult';

/**
 * 天干地支字符串处理工具
 */
export class GanzhiStringUtils {
  /**
   * 将天干地支转换为中文字符串
   * @param ganZhi 天干地支数组
   * @returns 中文字符串，如"甲子"
   */
  static ganZhiToString(ganZhi: [string, string]): string {
    return `${ganZhi[0]}${ganZhi[1]}`;
  }

  /**
   * 批量转换天干地支为字符串
   * @param ganZhiResult 完整的天干地支结果
   * @returns 字符串格式的结果
   */
  static ganZhiResultToString(ganZhiResult: GanZhiResult): {
    yearly: string;
    monthly: string;
    daily: string;
    hourly: string;
  } {
    return {
      yearly: this.ganZhiToString(ganZhiResult.yearly),
      monthly: this.ganZhiToString(ganZhiResult.monthly),
      daily: this.ganZhiToString(ganZhiResult.daily),
      hourly: this.ganZhiToString(ganZhiResult.hourly)
    };
  }
}
