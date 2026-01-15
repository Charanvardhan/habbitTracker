import { builder } from './builder.js';

builder.queryType({
  fields: (t) => ({
    ping: t.string({
      resolve: () => 'pong',
    }),
  }),
});

export const schema = builder.toSchema({});
