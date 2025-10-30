import { DatadogClient } from '../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface ListLogsInput {
  filterQuery?: string;
  filterFrom?: string;
  filterTo?: string;
  sort?: string;
  pageLimit?: number;
}

export const listLogs = async (client: DatadogClient, input: ListLogsInput) => {
  const body: v2.LogsListRequest = {
    filter: {
      query: input.filterQuery,
      from: input.filterFrom,
      to: input.filterTo,
    },
    sort: input.sort as v2.LogsSort,
    page: {
      limit: input.pageLimit,
    },
  };

  return client.listLogs({ body });
};
