import {
  daysToHours,
  monthsToHours,
  quartersToHours,
  weeksToHours,
  yearsToHours,
} from '@/utils/toHours';

export const TIME_SCALE = {
  HOUR: 'hour',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  QUARTER: 'quarter',
  YEAR: 'year',
} as const;

export const TIME_SCALE_SETS = {
  DAY_HOUR: 'day-hour',
  WEEK_DAY: 'week-day',
  MONTH_DAY: 'month-day',
  MONTH_WEEK: 'month-week',
  QUARTER_WEEK: 'quarter-week',
  QUARTER_MONTH: 'quarter-month',
  QUARTER_YEAR: 'quarter-year',
  YEAR_MONTH: 'year-month',
  YEAR: 'year',
} as const;

/**
 * 기본 범위
 * 단위는 시간
 */
export const DEFAULT_RANGE_BY_TIME_SCALE = {
  /**
   * 48시간 (2일)
   */
  [TIME_SCALE.HOUR]: daysToHours(1),

  /**
   * 15일
   */
  [TIME_SCALE.DAY]: daysToHours(15),

  /**
   * 4주 (약 1개월)
   */
  [TIME_SCALE.WEEK]: weeksToHours(2),

  /**
   * 3개월
   */
  [TIME_SCALE.MONTH]: monthsToHours(2),

  /**
   * 2분기
   */
  [TIME_SCALE.QUARTER]: quartersToHours(2),

  /**
   * 1년
   */
  [TIME_SCALE.YEAR]: yearsToHours(1),
} as const;
