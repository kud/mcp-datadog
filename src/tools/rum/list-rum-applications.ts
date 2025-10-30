import { DatadogClient } from '../../lib/datadog-client.js';

export const listRumApplications = async (client: DatadogClient) => {
  return client.listRUMApplications();
};
