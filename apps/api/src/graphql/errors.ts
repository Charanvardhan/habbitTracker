import { GraphQLError } from 'graphql';
import type { DomainError } from '@habit-tracker/domain';

export function throwGqlError(err: DomainError): never {
  const code =
    err._tag === 'ValidationError'
      ? 'BAD_USER_INPUT'
      : err._tag === 'NotFoundError'
        ? 'NOT_FOUND'
        : err._tag === 'ConflictError'
          ? 'CONFLICT'
          : 'INTERNAL_SERVER_ERROR';

  throw new GraphQLError(err.message, {
    extensions: { code },
  });
}
