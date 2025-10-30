import { DatadogClient } from '../../lib/datadog-client.js';

export const listDashboardLists = async (client: DatadogClient) => {
  return client.listDashboardLists();
};
