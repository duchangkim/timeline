import type { CalendarData, CalendarRange } from '@/calendar/models';

export class Calendar {
  #mainCalendar: CalendarData | null = null;
  #subCalendar: CalendarData | null = null;

  constructor(
    calendarData:
      | CalendarData
      | { mainCalendar: CalendarData; subCalendar: CalendarData },
  ) {
    if ('mainCalendar' in calendarData) {
      this.#mainCalendar = calendarData.mainCalendar;
      this.#subCalendar = calendarData.subCalendar;
    } else {
      this.#mainCalendar = calendarData;
    }
  }

  get mainCalendar(): CalendarData | null {
    return this.#mainCalendar;
  }

  get subCalendar(): CalendarData | null {
    return this.#subCalendar;
  }

  // range, cells 관리
  public adjustStartRange(amountHours: number): void {
    if (!this.mainCalendar || !this.#mainCalendar) {
      throw new Error('Main calendar is not defined');
    }

    const startDate = this.mainCalendar.range.start;
    const adjustedCalendarRange: CalendarRange = {
      ...this.mainCalendar.range,
      start:
        amountHours < 0
          ? startDate.add(amountHours, 'hour')
          : startDate.subtract(amountHours, 'hour'),
    };

    this.#mainCalendar.range = adjustedCalendarRange;

    console.log(
      'start',
      this.#mainCalendar.range.start.format('YYYY-MM-DD HH:mm'),
    );

    console.log('end', this.#mainCalendar.range.end.format('YYYY-MM-DD HH:mm'));

    if (this.#subCalendar) {
      this.#subCalendar.range = adjustedCalendarRange;
    }
  }

  public adjustEndRange(amountHours: number): void {
    if (!this.mainCalendar || !this.#mainCalendar) {
      throw new Error('Main calendar is not defined');
    }

    const endDate = this.mainCalendar.range.end;
    const adjustedCalendarRange: CalendarRange = {
      ...this.mainCalendar.range,
      end:
        amountHours < 0
          ? endDate.subtract(amountHours, 'hour')
          : endDate.add(amountHours, 'hour'),
    };

    this.#mainCalendar.range = adjustedCalendarRange;
    console.log(
      'start',
      this.#mainCalendar.range.start.format('YYYY-MM-DD HH:mm'),
    );

    console.log('end', this.#mainCalendar.range.end.format('YYYY-MM-DD HH:mm'));

    if (this.#subCalendar) {
      this.#subCalendar.range = adjustedCalendarRange;
    }
  }

  // main sub 모두 동시에 컨트롤
  public attachPreviousCells() {
    if (!this.mainCalendar || !this.#mainCalendar) {
      throw new Error('Main calendar is not defined');
    }

    this.adjustStartRange(-this.mainCalendar.range.amountHours);
    this.mainCalendar.cells.getCellsByRange({
      range: this.mainCalendar.range,
      timeScale: this.mainCalendar.meta.timeScale,
      now: this.mainCalendar.currentDate,
    });

    if (this.#subCalendar) {
      this.#subCalendar.cells.getCellsByRange({
        range: this.#subCalendar.range,
        timeScale: this.#subCalendar.meta.timeScale,
        now: this.#subCalendar.currentDate,
      });
    }
  }

  public attachNextCells() {
    if (!this.mainCalendar || !this.#mainCalendar) {
      throw new Error('Main calendar is not defined');
    }

    this.adjustEndRange(this.mainCalendar.range.amountHours);
    this.mainCalendar.cells.getCellsByRange({
      range: this.mainCalendar.range,
      timeScale: this.mainCalendar.meta.timeScale,
      now: this.mainCalendar.currentDate,
    });

    if (this.#subCalendar) {
      this.#subCalendar.cells.getCellsByRange({
        range: this.#subCalendar.range,
        timeScale: this.#subCalendar.meta.timeScale,
        now: this.#subCalendar.currentDate,
      });
    }
  }
}
