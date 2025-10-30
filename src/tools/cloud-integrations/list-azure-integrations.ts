import { DatadogClient } from '../../lib/datadog-client.js';

export const listAzureIntegrations = async (client: DatadogClient) => {
  return client.listAzureIntegration();
};
