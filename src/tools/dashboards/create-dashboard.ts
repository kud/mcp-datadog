import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogCreateDashboardParams {
  body: any;
}

export async function datadogCreateDashboard(
  client: DatadogClient,
  input: DatadogCreateDashboardParams
): Promise<any> {
  return client.createDashboard(input);
}
