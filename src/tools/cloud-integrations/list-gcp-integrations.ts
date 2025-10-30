import { DatadogClient } from '../../lib/datadog-client.js';

export const listGcpIntegrations = async (client: DatadogClient) => {
  return client.listGCPIntegration();
};
