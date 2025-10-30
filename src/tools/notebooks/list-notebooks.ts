import { DatadogClient } from '../../lib/datadog-client.js';

export const listNotebooks = async (client: DatadogClient) => {
  return client.listNotebooks();
};
