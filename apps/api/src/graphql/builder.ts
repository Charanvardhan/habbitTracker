import SchemaBuilder from '@pothos/core';
import type { ApiContext } from './context';

export const builder = new SchemaBuilder<{ Context: ApiContext }>({});
