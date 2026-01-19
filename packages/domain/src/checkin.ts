import type { HabitId } from './habit';

export type CheckInId = string;

export type ISODate = string;

export type CheckIn = {
  id: CheckInId;
  habitId: HabitId;
  date: ISODate;
  createdAt: Date;
};

export function isISODate(value: string): value is ISODate {
  return /^\d{4}-\d{2}-\d{2}$/.test(value);
}
