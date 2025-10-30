import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogUpdateDashboardParams {
  dashboardId: string;
  body: any;
}

export async function datadogUpdateDashboard(
  client: DatadogClient,
  input: DatadogUpdateDashboardParams
): Promise<any> {
  return client.updateDashboard(input);
}
