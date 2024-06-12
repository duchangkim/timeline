import type { TimeScale } from '@/time/models';
import type { Dayjs } from 'dayjs';

export interface CalendarCell {
  date: Date;
  formattedDate: string | number;
  isCurrent: boolean;
  isWeekend: boolean;
  isHoliday?: boolean;
}

export interface CalendarMetaBase {
  currentDate: Date;
  timeScale: TimeScale;
  isSubCalendar: boolean;
}

export interface SubCalendarMeta extends CalendarMetaBase {
  isSubCalendar: true;
  mainCalendar: {
    timeScale: TimeScale;
  };
}

export interface MainCalendarMeta extends CalendarMetaBase {
  isSubCalendar: false;
}

export type CalendarMeta = SubCalendarMeta | MainCalendarMeta;

export interface CalendarData {
  meta: CalendarMeta;
  range: CalendarRange;
  currentDate: Dayjs;
  cells: CalendarCell[];
}

export interface CalendarRange {
  start: Dayjs;
  end: Dayjs;
  amountHours: number;
}
