import type { HabitRepo } from '../ports/habitRepo';
import type { Habit } from '@habit-tracker/domain';
import { err, ok, type Result } from '../result';

export async function createHabit(
  input: { title: string },
  deps: { habitRepo: HabitRepo },
): Promise<Result<Habit>> {
  const title = input.title.trim();
  if (title.length === 0) {
    return err({ _tag: 'ValidationError', message: 'Title cannot be empty' });
  }
  if (title.length > 80) {
    return err({ _tag: 'ValidationError', message: 'Title is too long' });
  }

  const habit = await deps.habitRepo.create({ title });
  return ok(habit);
}
