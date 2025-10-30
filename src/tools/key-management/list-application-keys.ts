import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface ListApplicationKeysInput {
  pageSize?: number;
  pageNumber?: number;
  sort?: v2.ApplicationKeysSort;
  sortDir?: v2.QuerySortOrder;
  filter?: string;
  filterCreatedAtStart?: string;
  filterCreatedAtEnd?: string;
  include?: string;
}

export const listApplicationKeys = async (
  client: DatadogClient,
  input: ListApplicationKeysInput = {}
) => {
  return client.listApplicationKeys(input);
};
