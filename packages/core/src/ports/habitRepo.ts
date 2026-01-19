import type { Habit, HabitId } from '@habit-tracker/domain';

export interface HabitRepo {
  create(input: { title: string }): Promise<Habit>;
  list(): Promise<Habit[]>;
  getById(id: HabitId): Promise<Habit | null>;
  setArchived(id: HabitId, isArchived: boolean): Promise<void>;
}
