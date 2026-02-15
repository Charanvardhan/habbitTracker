import { builder } from '../builder';
import type { CheckIn } from '@habit-tracker/domain';

export const CheckInType = builder.objectRef<CheckIn>('CheckIn').implement({
  fields: (t) => ({
    id: t.exposeID('id'),
    habitId: t.exposeID('habitId'),
    date: t.exposeString('date'),
    createdAt: t.string({
      resolve: (c) => c.createdAt.toISOString(),
    }),
  }),
});
