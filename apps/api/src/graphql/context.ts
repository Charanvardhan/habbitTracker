import type { FastifyReply, FastifyRequest } from 'fastify';
import type { HabitRepo, CheckInRepo } from '@habit-tracker/core';

export type ApiContext = {
  req: FastifyRequest;
  reply: FastifyReply;
  habitRepo: HabitRepo;
  checkInRepo: CheckInRepo;
};
