import { DatadogClient } from '../../lib/datadog-client.js';

export interface DeleteDashboardListInput {
  listId: number;
}

export const deleteDashboardList = async (
  client: DatadogClient,
  input: DeleteDashboardListInput
) => {
  return client.deleteDashboardList(input);
};
