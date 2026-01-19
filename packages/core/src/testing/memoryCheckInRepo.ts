import type { CheckInRepo } from '../ports/checkInRepo';
import type { CheckIn, HabitId, ISODate, CheckInId } from '@habit-tracker/domain';

let checkInCounter = 1;

export class MemoryCheckInRepo implements CheckInRepo {
  private checkIns = new Map<string, CheckIn>();

  private key(habitId: HabitId, date: ISODate) {
    return `${habitId}::${date}`;
  }

  async upsert(input: { habitId: HabitId; date: ISODate }): Promise<CheckIn> {
    const k = this.key(input.habitId, input.date);
    const existing = this.checkIns.get(k);
    if (existing) {
      return existing;
    }
    const id = String(checkInCounter++) as CheckInId;
    const checkIn: CheckIn = {
      id,
      habitId: input.habitId,
      date: input.date,
      createdAt: new Date(),
    };
    this.checkIns.set(k, checkIn);
    return checkIn;
  }

  async get(input: { habitId: HabitId; date: ISODate }): Promise<CheckIn | null> {
    return this.checkIns.get(this.key(input.habitId, input.date)) || null;
  }
}
