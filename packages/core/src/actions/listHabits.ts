import type { HabitRepo } from '../ports/habitRepo';
import type { Habit } from '@habit-tracker/domain';
import { ok, type Result } from '../result';

export async function listHabits(deps: { habitRepo: HabitRepo }): Promise<Result<Habit[]>> {
  const habits = await deps.habitRepo.list();
  return ok(habits);
}
