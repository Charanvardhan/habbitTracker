import { builder } from '../builder';
import type { Habit } from '@habit-tracker/domain';

export const HabitType = builder.objectRef<Habit>('Habit').implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    title: t.exposeString('title'),
    isArchived: t.exposeBoolean('isArchived'),
    createdAt: t.string({
      resolve: (habit) => habit.createdAt.toISOString(),
    }),
  }),
});
