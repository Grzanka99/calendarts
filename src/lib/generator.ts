import { DateTime } from 'luxon';

import { createDay, toArray } from '../helpers/creators';
import { Day, MonthArray, MonthCalendar } from '../types';

const prefix = (firstDay: Day) => firstDay.weekDay - 1;

export function getMonth(month: number, year?: number): MonthCalendar {
  const localYear: number = year ?? DateTime.now().year;
  const localMonth: number = month + 1;
  const numberOfDays: number = DateTime.local(
    localYear,
    localMonth
  ).daysInMonth;
  const days: readonly Day[] = [...Array(numberOfDays)].map((_, day) =>
    createDay(day + 1, localMonth, localYear)
  );

  return {
    month,
    year: localYear,
    days,
    prefix: prefix(days[0]),
  };
}

export function getMonthArray(month: MonthCalendar): MonthArray {
  return toArray(month.days, month.prefix);
}
