import { DatadogClient } from '../../lib/datadog-client.js';

export const listOrganizations = async (client: DatadogClient) => {
  return client.listOrgs();
};
