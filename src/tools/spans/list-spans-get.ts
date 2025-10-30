import { DatadogClient } from '../../lib/datadog-client.js';

export interface ListSpansGetInput {
  filterQuery?: string;
  filterFrom?: string;
  filterTo?: string;
  sort?: 'timestamp' | '-timestamp';
  pageCursor?: string;
  pageLimit?: number;
}

export const listSpansGet = async (client: DatadogClient, input: ListSpansGetInput) => {
  return client.spansApi.listSpansGet(input);
};
