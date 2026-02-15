import { builder } from './builder';
import { throwGqlError } from './errors';
import { HabitType } from './types/habit';
import { CheckInType } from './types/checkin';

import { createHabit, listHabits, checkInHabit } from '@habit-tracker/core';

builder.queryType({
  fields: (t) => ({
    habits: t.field({
      type: [HabitType],
      resolve: async (_parent, _args, ctx) => {
        const r = await listHabits({ habitRepo: ctx.habitRepo });
        if (r._tag == 'Err') throwGqlError(r.error);
        return r.value;
      },
    }),
  }),
});

builder.mutationType({
  fields: (t) => ({
    createHabit: t.field({
      type: HabitType,
      args: {
        title: t.arg.string({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const r = await createHabit(
          {
            title: args.title,
          },
          {
            habitRepo: ctx.habitRepo,
          },
        );
        if (r._tag === 'Err') throwGqlError(r.error);
        return r.value;
      },
    }),

    checkInHabit: t.field({
      type: CheckInType,
      args: {
        habitId: t.arg.id({ required: true }),
        date: t.arg.string({ required: true }),
      },
      resolve: async (_parent, args, ctx) => {
        const r = await checkInHabit(
          { habitId: String(args.habitId), date: args.date },
          { habitRepo: ctx.habitRepo, checkInRepo: ctx.checkInRepo },
        );
        if (r._tag == 'Err') throwGqlError(r.error);
        return r.value;
      },
    }),
  }),
});
