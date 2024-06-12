import type { CalendarData, CalendarRange } from '@/calendar/models';
import { CalendarCells } from '@/public-api';

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

  get mainCalendar(): CalendarData {
    return this.#mainCalendar!;
  }

  get subCalendar(): CalendarData | null {
    return this.#subCalendar;
  }

  private adjustRange(
    range: CalendarRange,
    amountHours: number,
    adjustType: 'start' | 'end',
  ): CalendarRange {
    const newDate =
      adjustType === 'start'
        ? amountHours < 0
          ? range.start.add(amountHours, 'hour')
          : range.start.subtract(amountHours, 'hour')
        : amountHours < 0
          ? range.end.subtract(amountHours, 'hour')
          : range.end.add(amountHours, 'hour');

    return {
      ...range,
      [adjustType]: newDate,
    };
  }

  public adjustStartRange(amountHours: number): Calendar {
    if (!this.mainCalendar) {
      throw new Error('Main calendar is not defined');
    }

    const newRange = this.adjustRange(
      this.mainCalendar.range,
      amountHours,
      'start',
    );

    const adjustedMainCalendar = {
      ...this.mainCalendar,
      range: newRange,
    };

    console.log(
      'start',
      adjustedMainCalendar.range.start.format('YYYY-MM-DD HH:mm'),
    );

    console.log(
      'end',
      adjustedMainCalendar.range.end.format('YYYY-MM-DD HH:mm'),
    );

    if (this.subCalendar) {
      return new Calendar({
        mainCalendar: adjustedMainCalendar,
        subCalendar: {
          ...this.subCalendar,
          range: newRange,
        },
      });
    }

    return new Calendar(adjustedMainCalendar);
  }

  public adjustEndRange(amountHours: number): Calendar {
    if (!this.mainCalendar) {
      throw new Error('Main calendar is not defined');
    }

    const newRange = this.adjustRange(
      this.mainCalendar.range,
      amountHours,
      'end',
    );

    const adjustedMainCalendar = {
      ...this.mainCalendar,
      range: newRange,
    };

    console.log(
      'start',
      adjustedMainCalendar.range.start.format('YYYY-MM-DD HH:mm'),
    );

    console.log(
      'end',
      adjustedMainCalendar.range.end.format('YYYY-MM-DD HH:mm'),
    );

    if (this.subCalendar) {
      return new Calendar({
        mainCalendar: adjustedMainCalendar,
        subCalendar: {
          ...this.subCalendar,
          range: newRange,
        },
      });
    }

    return new Calendar(adjustedMainCalendar);
  }

  public attachPreviousCells(): Calendar {
    if (!this.mainCalendar) {
      throw new Error('Main calendar is not defined');
    }

    const newCalendar = this.adjustStartRange(
      -this.mainCalendar.range.amountHours,
    );

    const updatedMainCalendar: CalendarData = {
      ...newCalendar.mainCalendar,
      cells: new CalendarCells({
        range: newCalendar.mainCalendar.range,
        timeScale: newCalendar.mainCalendar.meta.timeScale,
        now: newCalendar.mainCalendar.currentDate,
      }).cells,
    };

    if (newCalendar.subCalendar) {
      return new Calendar({
        mainCalendar: updatedMainCalendar,
        subCalendar: {
          ...newCalendar.subCalendar,
          cells: new CalendarCells({
            range: newCalendar.subCalendar.range,
            timeScale: newCalendar.subCalendar.meta.timeScale,
            now: newCalendar.subCalendar.currentDate,
          }).cells,
        },
      });
    }

    return new Calendar(updatedMainCalendar);
  }

  public attachNextCells(): Calendar {
    if (!this.mainCalendar) {
      throw new Error('Main calendar is not defined');
    }

    const newCalendar = this.adjustEndRange(
      this.mainCalendar.range.amountHours,
    );

    const updatedMainCalendar: CalendarData = {
      ...newCalendar.mainCalendar,
      cells: new CalendarCells({
        range: newCalendar.mainCalendar.range,
        timeScale: newCalendar.mainCalendar.meta.timeScale,
        now: newCalendar.mainCalendar.currentDate,
      }).cells,
    };

    if (newCalendar.subCalendar) {
      return new Calendar({
        mainCalendar: updatedMainCalendar,
        subCalendar: {
          ...newCalendar.subCalendar,
          cells: new CalendarCells({
            range: newCalendar.subCalendar.range,
            timeScale: newCalendar.subCalendar.meta.timeScale,
            now: newCalendar.subCalendar.currentDate,
          }).cells,
        },
      });
    }

    return new Calendar(updatedMainCalendar);
  }
}
