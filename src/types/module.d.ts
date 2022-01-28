import { MonthArray, MonthCalendar } from './index';

declare module '@cgsh/calendarts' {
  export function getMonth(month: number, year?: number): MonthCalendar;
  export function getMonthArray(month: MonthCalendar): MonthArray;

  export type TMonthCalendar = MonthCalendar;
  export type TMonthArray = MonthArray;
}
