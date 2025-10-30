import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogListActiveMetricsParams {
  from: number;
  host?: string;
}

export async function datadogListActiveMetrics(
  client: DatadogClient,
  input: DatadogListActiveMetricsParams
): Promise<any> {
  return client.listActiveMetrics(input);
}
