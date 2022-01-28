import test from 'ava';
import { DateTime } from 'luxon';

import { Day } from '../types';

import { createDay, createDayBack } from './creators';

test('Should return 2021, december 28th', (t) => {
  const today = DateTime.local(2022, 1, 1);
  const shouldBe = DateTime.local(2021, 12, 28);

  const expected: Day = {
    fullJSONDate: shouldBe.toJSON(),
    number: 28,
    weekDay: 2,
  };

  const actual = createDayBack(today.toISO(), 4);

  t.is(actual.fullJSONDate, shouldBe.toISO());
  t.deepEqual(actual, expected);
});

test('Should return proper object', (t) => {
  const JSONDate = DateTime.local(2021, 12, 12).toJSON();

  const expected: Day = {
    fullJSONDate: JSONDate,
    number: 12,
    weekDay: 7,
  };

  const actual = createDay(12, 12, 2021);

  t.deepEqual(actual, expected);
});
