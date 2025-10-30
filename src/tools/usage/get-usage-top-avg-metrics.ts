import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetUsageTopAvgMetricsInput {
  month?: Date;
  day?: Date;
  names?: string[];
  limit?: number;
}

export const getUsageTopAvgMetrics = async (
  client: DatadogClient,
  input: GetUsageTopAvgMetricsInput = {}
) => {
  return client.getUsageTopAvgMetrics(input);
};
