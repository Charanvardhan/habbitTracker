import { builder } from './builder';
import './resolver';

// builder.queryType({
//   fields: (t) => ({
//     ping: t.string({
//       resolve: () => 'pong',
//     }),
//   }),
// });

export const schema = builder.toSchema({});
