import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogDeleteDashboardParams {
  dashboardId: string;
}

export async function datadogDeleteDashboard(
  client: DatadogClient,
  input: DatadogDeleteDashboardParams
): Promise<any> {
  return client.deleteDashboard(input);
}
