import { CalendarCells } from '@/calendar/CalendarCells';
import { CalendarData, CalendarMeta, CalendarRange } from '@/calendar/models';
import { DEFAULT_RANGE_BY_TIME_SCALE, TIME_SCALE } from '@/time/constants';
import dayjs, { Dayjs } from 'dayjs';

const DEFAULT_RANGE = () => ({
  start: dayjs(),
  end: dayjs(),
  amountHours: 0,
});

// TODO: Need validation

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
    }),
  };

  public setMeta(calendarMeta: CalendarMeta) {
    this.#calendarData.meta = calendarMeta;

    return this;
  }

  public setRange(range?: CalendarRange) {
    this.#calendarData.range =
      range || this.#defaultRange(this.#calendarData.currentDate);

    return this;
  }

  public setCurrentDate(currentDate: Date | string) {
    this.#calendarData.currentDate = dayjs(currentDate);

    return this;
  }

  public setCells() {
    this.#calendarData.cells = new CalendarCells({
      range: this.#calendarData.range,
      timeScale: this.#calendarData.meta.timeScale,
      now: this.#calendarData.currentDate,
    });

    return this;
  }

  public build() {
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
