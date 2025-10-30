import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogGetMetricMetadataParams {
  metricName: string;
}

export async function datadogGetMetricMetadata(
  client: DatadogClient,
  input: DatadogGetMetricMetadataParams
): Promise<any> {
  return client.getMetricMetadata(input);
}
