export type Day = {
  readonly number: number;
  readonly fullJSONDate: string;
  readonly weekDay: number;
};

export type MonthCalendar = {
  readonly month: number;
  readonly year: number;
  readonly days: readonly Day[];
  readonly prefix: number;
};

export type MonthArray = ReadonlyArray<readonly Day[]>;
