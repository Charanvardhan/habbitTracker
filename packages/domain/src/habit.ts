export type HabitId = string;

export type Habit = {
  id: HabitId;
  title: string;
  createdAt: Date;
  isArchived: boolean;
};
