import { DatadogClient } from '../../lib/datadog-client.js';

export const listApmRetentionFilters = async (client: DatadogClient) => {
  return client.listApmRetentionFilters();
};
