import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface UpdateDashboardListInput {
  listId: number;
  body: v1.DashboardList;
}

export const updateDashboardList = async (
  client: DatadogClient,
  input: UpdateDashboardListInput
) => {
  return client.updateDashboardList(input);
};
