import type { CheckIn, HabitId, ISODate } from '@habit-tracker/domain';

export interface CheckInRepo {
  upsert(input: { habitId: HabitId; date: ISODate }): Promise<CheckIn>;
  get(input: { habitId: HabitId; date: ISODate }): Promise<CheckIn | null>;
}
