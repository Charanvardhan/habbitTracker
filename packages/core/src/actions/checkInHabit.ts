import type { HabitRepo } from '../ports/habitRepo';
import type { CheckInRepo } from '../ports/checkInRepo';
import { err, ok, type Result } from '../result';
import { isISODate, type CheckIn, type HabitId, type ISODate } from '@habit-tracker/domain';

export async function checkInHabit(
  input: { habitId: HabitId; date: string },
  deps: { habitRepo: HabitRepo; checkInRepo: CheckInRepo },
): Promise<Result<CheckIn>> {
  if (!isISODate(input.date)) {
    return err({ _tag: 'ValidationError', message: 'Invalid date. use YYYY-MM-DD' });
  }

  const date: ISODate = input.date;
  const habit = await deps.habitRepo.getById(input.habitId);

  if (!habit) {
    return err({ _tag: 'NotFoundError', message: 'Habit not found' });
  }
  if (habit.isArchived) {
    return err({ _tag: 'ConflictError', message: 'Cannot check in an archived habit' });
  }

  const checkIn = await deps.checkInRepo.upsert({ habitId: input.habitId, date });
  return ok(checkIn);
}
