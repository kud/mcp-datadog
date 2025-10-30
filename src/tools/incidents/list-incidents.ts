import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogListIncidentsParams {
  pageSize?: number;
  pageOffset?: number;
}

export async function datadogListIncidents(
  client: DatadogClient,
  input: DatadogListIncidentsParams
): Promise<any> {
  return client.listIncidents(input);
}
