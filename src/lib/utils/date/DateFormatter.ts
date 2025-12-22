/**
 * 日期格式化工具
 */
export class DateFormatter {
  /**
   * 格式化日期为字符串
   * @param date Date对象
   * @returns YYYY-MM-DD格式的字符串
   */
  static formatDate(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  /**
   * 标准化日期字符串
   * @param date 日期字符串或Date对象
   * @returns 标准化的日期字符串数组 [年, 月, 日]
   */
  static normalizeDateStr(date: string | Date): string[] {
    const dateStr = typeof date === 'string' ? date : this.formatDate(date);
    return dateStr.split('-');
  }
}