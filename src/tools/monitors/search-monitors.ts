import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogSearchMonitorsParams {
  query?: string;
  page?: number;
  perPage?: number;
  sort?: string;
}

export async function datadogSearchMonitors(
  client: DatadogClient,
  input: DatadogSearchMonitorsParams
): Promise<any> {
  return client.searchMonitors(input);
}
