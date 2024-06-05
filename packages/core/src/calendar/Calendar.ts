import type { CalendarData } from '@/calendar/models';

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

  get mainCalendar() {
    return this.#mainCalendar;
  }

  get subCalendar() {
    return this.#subCalendar;
  }

  public adjustStartRange() {}

  public adjustEndRange() {}

  public attachPreviousCells() {}

  public attachNextCells() {}
}
