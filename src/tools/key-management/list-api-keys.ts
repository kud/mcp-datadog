import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface ListApiKeysInput {
  pageSize?: number;
  pageNumber?: number;
  sort?: v2.APIKeysSort;
  sortDir?: v2.QuerySortOrder;
  filter?: string;
  filterCreatedAtStart?: string;
  filterCreatedAtEnd?: string;
  filterModifiedAtStart?: string;
  filterModifiedAtEnd?: string;
  include?: string;
}

export const listApiKeys = async (
  client: DatadogClient,
  input: ListApiKeysInput = {}
) => {
  return client.listAPIKeys(input);
};
