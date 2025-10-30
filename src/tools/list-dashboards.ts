import { DatadogClient } from '../lib/datadog-client.js';

export interface ListDashboardsInput {
  filterShared?: boolean;
}

export const listDashboards = async (client: DatadogClient, input: ListDashboardsInput) => {
  return client.listDashboards(input);
};
