import { DatadogClient } from '../../lib/datadog-client.js';

export const listAwsLogServices = async (client: DatadogClient) => {
  return client.listAWSLogServices();
};
