import dayjs from 'dayjs';
import { DEFAULT_RANGE_BY_TIME_SCALE, TIME_SCALE } from '@/time/constants';
import type { TimeScale } from '@/time/models';
import type { CalendarCell, CalendarRange } from '@/calendar/models';

export class Calendar {
  private currentDate: dayjs.Dayjs;
  private timeScale: TimeScale;
  private range: CalendarRange = {
    start: dayjs(),
    end: dayjs(),
    amountHours: 0,
  };
  private cells?: CalendarCell[];

  constructor({
    initialDate,
    timeScale,
  }: {
    initialDate?: Date;
    timeScale?: TimeScale;
  }) {
    this.currentDate = dayjs(initialDate || new Date());
    this.timeScale = timeScale || TIME_SCALE.HOUR;

    this.makeDefaultRange();
  }

  public getCells() {
    return this.cells;
  }

  private makeDefaultRange(currentDate = this.currentDate) {
    this.range = {
      start: currentDate.subtract(
        DEFAULT_RANGE_BY_TIME_SCALE[this.timeScale],
        TIME_SCALE.HOUR,
      ),
      end: currentDate.add(
        DEFAULT_RANGE_BY_TIME_SCALE[this.timeScale],
        TIME_SCALE.HOUR,
      ),
      amountHours: DEFAULT_RANGE_BY_TIME_SCALE[this.timeScale],
    };
  }

  private getTimeScaleUnit(timeScale: TimeScale) {
    if (timeScale === TIME_SCALE.WEEK || timeScale === TIME_SCALE.QUARTER) {
      return 'day';
    }

    return timeScale;
  }

  public makeCells() {
    const cells: CalendarCell[] = [];
    const timeScaleUnit = this.getTimeScaleUnit(this.timeScale);
    let currentDate = this.range.start.startOf(timeScaleUnit);

    while (this.range.end.isAfter(currentDate, timeScaleUnit)) {
      cells.push({
        date: currentDate.toDate(),
        formattedDate: currentDate.get(timeScaleUnit),
        isCurrent: currentDate.isSame(this.currentDate, timeScaleUnit),
        isWeekend: [0, 6].includes(currentDate.day()),
      });

      currentDate = currentDate.add(1, timeScaleUnit);
    }

    this.cells = cells;
  }

  // range 조정
  private subtractStartRange(amountHours = this.range.amountHours) {
    this.range = {
      ...this.range,
      start: this.range.start.subtract(amountHours, TIME_SCALE.HOUR),
      end: this.range.end,
    };
  }

  private addEndRange(amountHours = this.range.amountHours) {
    this.range = {
      ...this.range,
      start: this.range.start,
      end: this.range.end.add(amountHours, TIME_SCALE.HOUR),
    };
  }

  public getNextCells() {
    this.addEndRange();
    this.makeCells();
  }

  public getPreviousCells() {
    this.subtractStartRange();
    this.makeCells();
  }
}
