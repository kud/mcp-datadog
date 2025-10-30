import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetDashboardListInput {
  listId: number;
}

export const getDashboardList = async (
  client: DatadogClient,
  input: GetDashboardListInput
) => {
  return client.getDashboardList(input);
};
