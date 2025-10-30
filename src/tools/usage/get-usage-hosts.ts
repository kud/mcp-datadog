import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetUsageHostsInput {
  startHr: Date;
  endHr?: Date;
}

export const getUsageHosts = async (
  client: DatadogClient,
  input: GetUsageHostsInput
) => {
  return client.getUsageHosts(input);
};
