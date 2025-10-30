import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogUpdateMetricMetadataParams {
  metricName: string;
  body: any;
}

export async function datadogUpdateMetricMetadata(
  client: DatadogClient,
  input: DatadogUpdateMetricMetadataParams
): Promise<any> {
  return client.updateMetricMetadata(input);
}
