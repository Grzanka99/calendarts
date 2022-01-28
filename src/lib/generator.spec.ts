import test from 'ava';
import { DateTime } from 'luxon';

import { getMonth, getMonthArray } from './generator';

test('getMonth should have proper data for january 2022', (t) => {
  const actual = getMonth(0, 2022);

  t.is(actual.days.length, 31);
  t.is(actual.year, 2022);
  t.is(actual.prefix, 5);
});

test('getMonth should have proper data for january without given year', (t) => {
  const { year: currentYear, daysInMonth } = DateTime.now();

  const actual = getMonth(0);

  t.is(actual.days.length, daysInMonth);
  t.is(actual.year, currentYear);
});

test('prefix for August 2022 should be 0', (t) => {
  const actual = getMonth(7, 2022);
  t.is(actual.prefix, 0);
});

test.skip('should generate proper array of month', (t) => {
  const actual = getMonthArray(getMonth(0, 2022));

  t.is(actual.length, 6);
});
