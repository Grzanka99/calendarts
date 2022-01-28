import { DateTime } from 'luxon';

import { Day } from '../types';

export const createDay = (day: number, month: number, year: number): Day => {
  const fullJSONDate = DateTime.local(year, month, day).toJSON();

  return {
    number: day,
    fullJSONDate,
    weekDay: DateTime.fromISO(fullJSONDate).weekday,
  };
};

export const createDayBack = (isoDay: string, diff: number): Day => {
  const day = DateTime.fromISO(isoDay);
  const newDay = day.minus({ days: diff });

  return createDay(newDay.day, newDay.month, newDay.year);
};

export const toArray = (
  days: readonly Day[],
  prefix: number
): ReadonlyArray<readonly Day[]> => {
  const arrayLength = (days.length + prefix) % 7;

  const array = [...new Array(arrayLength)].map((_, i) => {
    if (i === 0) {
      return [
        ...[...new Array(prefix)].map((_, j) =>
          createDayBack(days[0].fullJSONDate, prefix - j)
        ),
        ...days.slice(0, 7 - prefix),
      ];
    }

    return days.slice(i * 7 - prefix, i * 7 - prefix + 7);
  });

  return array;
};
