export const daysToHours = (day: number): number => day * 24;

export const weeksToHours = (week: number): number => daysToHours(week * 7);

export const monthsToHours = (month: number): number => daysToHours(month * 30);

export const quartersToHours = (quarter: number): number =>
  monthsToHours(quarter * 3);

export const yearsToHours = (year: number): number => monthsToHours(year * 12);
