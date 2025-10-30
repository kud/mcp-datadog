import { DatadogClient } from '../../lib/datadog-client.js';

export const listAwsAccounts = async (client: DatadogClient) => {
  return client.listAWSAccounts();
};
