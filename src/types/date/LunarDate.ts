export default interface LunarDate {
  lunarYear: number;
  lunarMonth: number;
  lunarDay: number;
  isLeap: boolean;
  lunarYearName: string;
  lunarMonthName: string;
  lunarDayName: string;
  zodiac: string;
  gzYear: string;
  gzMonth: string;
  gzDay: string;
  constellation: string;
  ncWeek: string;
  weekDay: number;
  toString(includeTime?: boolean): string;
}