import { DatadogClient } from '../lib/datadog-client.js';

export interface QueryMetricsInput {
  from: number;
  to: number;
  query: string;
}

export const queryMetrics = async (client: DatadogClient, input: QueryMetricsInput) => {
  return client.queryMetrics({
    from: input.from,
    to: input.to,
    query: input.query,
  });
};
