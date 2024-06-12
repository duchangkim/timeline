import { CalendarCells } from '@/calendar/CalendarCells';
import { CalendarData, CalendarMeta, CalendarRange } from '@/calendar/models';
import { DEFAULT_RANGE_BY_TIME_SCALE, TIME_SCALE } from '@/time/constants';
import dayjs, { Dayjs } from 'dayjs';

const DEFAULT_RANGE = () => ({
  start: dayjs(),
  end: dayjs(),
  amountHours: 0,
});

export class CalendarBuilder {
  #calendarData: CalendarData = {
    meta: {
      currentDate: new Date(),
      timeScale: TIME_SCALE.HOUR,
      isSubCalendar: false,
    },
    range: DEFAULT_RANGE(),
    currentDate: dayjs(),
    cells: new CalendarCells({
      range: DEFAULT_RANGE(),
      timeScale: TIME_SCALE.HOUR,
      now: dayjs(),
    }).cells,
  };

  public setMeta(calendarMeta: CalendarMeta) {
    if (
      !calendarMeta ||
      typeof calendarMeta.timeScale !== 'string' ||
      typeof calendarMeta.isSubCalendar !== 'boolean'
    ) {
      throw new Error('Invalid CalendarMeta');
    }
    this.#calendarData.meta = calendarMeta;

    return this;
  }

  public setRange(range?: CalendarRange) {
    if (
      range &&
      (!dayjs(range.start).isValid() ||
        !dayjs(range.end).isValid() ||
        typeof range.amountHours !== 'number')
    ) {
      throw new Error('Invalid CalendarRange');
    }
    this.#calendarData.range =
      range || this.#defaultRange(this.#calendarData.currentDate);

    return this;
  }

  public setCurrentDate(currentDate: Date | string) {
    const parsedDate = dayjs(currentDate);

    if (!parsedDate.isValid()) {
      throw new Error('Invalid currentDate');
    }
    this.#calendarData.currentDate = parsedDate;

    return this;
  }

  public setCells() {
    this.#calendarData.cells = new CalendarCells({
      range: this.#calendarData.range,
      timeScale: this.#calendarData.meta.timeScale,
      now: this.#calendarData.currentDate,
    }).cells;

    return this;
  }

  public build() {
    // Set default values if they are missing
    if (!this.#calendarData.meta) {
      this.#calendarData.meta = {
        currentDate: new Date(),
        timeScale: TIME_SCALE.HOUR,
        isSubCalendar: false,
      };
    }

    if (!this.#calendarData.range) {
      this.#calendarData.range = DEFAULT_RANGE();
    }

    if (!this.#calendarData.currentDate) {
      this.#calendarData.currentDate = dayjs();
    }

    if (!this.#calendarData.cells) {
      this.#calendarData.cells = new CalendarCells({
        range: this.#calendarData.range,
        timeScale: this.#calendarData.meta.timeScale,
        now: this.#calendarData.currentDate,
      }).cells;
    }

    return this.#calendarData;
  }

  #defaultRange(currentDate: Dayjs) {
    return {
      start: currentDate.subtract(
        DEFAULT_RANGE_BY_TIME_SCALE[this.#calendarData.meta.timeScale],
        TIME_SCALE.HOUR,
      ),
      end: currentDate.add(
        DEFAULT_RANGE_BY_TIME_SCALE[this.#calendarData.meta.timeScale],
        TIME_SCALE.HOUR,
      ),
      amountHours:
        DEFAULT_RANGE_BY_TIME_SCALE[this.#calendarData.meta.timeScale],
    };
  }
}
