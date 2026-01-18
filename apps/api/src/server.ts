import fastify from 'fastify';
import cors from '@fastify/cors';
import { createYoga } from 'graphql-yoga';
import { schema } from './graphql/schema.js';
import type { FastifyRequest, FastifyReply } from 'fastify';

const app = fastify({ logger: true });

app.get('/health', async () => {
  return { status: 'ok' };
});

await app.register(cors, {
  origin: true,
  credentials: true,
});

const yoga = createYoga<{ req: FastifyRequest; reply: FastifyReply }>({
  schema,
  graphqlEndpoint: '/graphql',
});

app.route({
  url: '/graphql',
  method: ['GET', 'POST', 'OPTIONS'],
  handler: async (req, reply) => {
    const response = await yoga.handleNodeRequestAndResponse(req, reply, {
      req,
      reply,
    });

    reply.status(response.status);
    response.headers.forEach((value, key) => reply.header(key, value));
    reply.send(response.body);

    return reply;
  },
});

const PORT = Number(process.env.PORT) || 4000;
const HOST = process.env.HOST ?? '0.0.0.0';

try {
  await app.listen({ port: PORT, host: HOST });
  app.log.info(`server listening on ${HOST}:${PORT}`);
} catch (err) {
  app.log.error(err);
  process.exit(1);
}

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, async () => {
    try {
      await app.close();
      process.exit(0);
    } catch (err) {
      app.log.error(err);
      process.exit(1);
    }
  });
}
