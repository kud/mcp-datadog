import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetUsageLogsInput {
  startHr: Date;
  endHr?: Date;
}

export const getUsageLogs = async (
  client: DatadogClient,
  input: GetUsageLogsInput
) => {
  return client.getUsageLogs(input);
};
