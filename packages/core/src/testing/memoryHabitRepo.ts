import type { HabitRepo } from '../ports/habitRepo';
import type { Habit, HabitId } from '@habit-tracker/domain';

let idCounter = 1;

export class MemoryHabitRepo implements HabitRepo {
  private habits = new Map<HabitId, Habit>();

  async create(input: { title: string }): Promise<Habit> {
    const id = String(idCounter++) as HabitId;
    const habit: Habit = { id, title: input.title, createdAt: new Date(), isArchived: false };
    this.habits.set(id, habit);
    return habit;
  }

  async list(): Promise<Habit[]> {
    return Array.from(this.habits.values());
  }

  async getById(id: HabitId): Promise<Habit | null> {
    return this.habits.get(id) || null;
  }

  async setArchived(id: HabitId, isArchived: boolean): Promise<void> {
    const h = this.habits.get(id);
    if (!h) return;
    this.habits.set(id, { ...h, isArchived });
  }
}
