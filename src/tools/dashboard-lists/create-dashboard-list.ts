import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface CreateDashboardListInput {
  body: v1.DashboardList;
}

export const createDashboardList = async (
  client: DatadogClient,
  input: CreateDashboardListInput
) => {
  return client.createDashboardList(input);
};
