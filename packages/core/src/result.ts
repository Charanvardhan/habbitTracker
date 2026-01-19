import type { DomainError } from '@habit-tracker/domain';

export type Ok<A> = { _tag: 'Ok'; value: A };
export type Err = { _tag: 'Err'; error: DomainError };

export type Result<A> = Ok<A> | Err;

export const ok = <A>(value: A): Ok<A> => ({ _tag: 'Ok', value });
export const err = (error: DomainError): Err => ({ _tag: 'Err', error });
