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

enum Direction {
  FORWARD = 'forward',
  BACK = 'back',
}

export const createDayBack = (isoDay: string, diff: number): Day => {
  const day = DateTime.fromISO(isoDay);
  const newDay = day.minus({ days: diff });

  return createDay(newDay.day, newDay.month, newDay.year);
};

export const createDayForward = (isoDay: string, diff: number): Day => {
  const day = DateTime.fromISO(isoDay);
  const newDay = day.plus({ days: diff });

  return createDay(newDay.day, newDay.month, newDay.year);
};

export const createVirtualDays = (
  amount: number,
  direction: Direction,
  from: string
) => {
  return [...new Array(amount)].map((_, index) => {
    const day =
      direction === Direction.FORWARD
        ? createDayForward(from, index + 1)
        : createDayBack(from, amount - index);

    return day;
  });
};

export const toArray = (
  days: readonly Day[],
  prefix: number
): ReadonlyArray<readonly Day[]> => {
  const arrayLength = Math.ceil((days.length + prefix) / 7);

  const array = [...new Array(arrayLength)].map((_, i) => {
    if (i === 0) {
      return [
        ...createVirtualDays(prefix, Direction.BACK, days[0].fullJSONDate),
        ...days.slice(0, 7 - prefix),
      ];
    }

    if (i === arrayLength - 1) {
      const resDays = days.slice(i * 7 - prefix, days.length);

      return [
        ...resDays,
        ...createVirtualDays(
          7 - resDays.length,
          Direction.FORWARD,
          days[days.length - 1].fullJSONDate
        ),
      ];
    }

    return days.slice(i * 7 - prefix, i * 7 - prefix + 7);
  });

  return array;
};
