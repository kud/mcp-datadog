import { DatadogClient } from '../lib/datadog-client.js';

export interface GetDashboardInput {
  dashboardId: string;
}

export const getDashboard = async (client: DatadogClient, input: GetDashboardInput) => {
  return client.getDashboard({ dashboardId: input.dashboardId });
};
