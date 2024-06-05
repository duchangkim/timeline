import type { CalendarCell, CalendarRange } from '@/calendar/models';
import { TIME_SCALE } from '@/time/constants';
import type { TimeScale } from '@/time/models';
import type { Dayjs } from 'dayjs';

export class CalendarCells {
  #cells: CalendarCell[] = [];

  get cells(): CalendarCell[] {
    return this.#cells;
  }

  getCellsByRange({
    range,
    timeScale,
    now,
  }: {
    range: CalendarRange;
    timeScale: TimeScale;
    now: Dayjs;
  }): CalendarCell[] {
    const cells: CalendarCell[] = [];
    const timeScaleUnit = this.#getTimeScaleUnit(timeScale);
    let currentDate = range.start.startOf(timeScaleUnit);

    while (range.end.isAfter(currentDate, timeScaleUnit)) {
      cells.push({
        date: currentDate.toDate(),
        formattedDate: currentDate.get(timeScaleUnit),
        isCurrent: currentDate.isSame(now, timeScaleUnit),
        isWeekend: [0, 6].includes(currentDate.day()),
      });

      currentDate = currentDate.add(1, timeScaleUnit);
    }

    this.#cells = cells;

    return this.cells;
  }

  #getTimeScaleUnit(timeScale: TimeScale) {
    if (timeScale === TIME_SCALE.WEEK || timeScale === TIME_SCALE.QUARTER) {
      return 'day';
    }

    return timeScale;
  }
}
