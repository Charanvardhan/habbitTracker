export type ValidationError = {
  _tag: 'ValidationError';
  message: string;
};

export type NotFoundError = {
  _tag: 'NotFoundError';
  message: string;
};

export type ConflictError = {
  _tag: 'ConflictError';
  message: string;
};

export type PersistenceError = {
  _tag: 'PersistenceError';
  message: string;
};

export type DomainError = ValidationError | NotFoundError | ConflictError | PersistenceError;
