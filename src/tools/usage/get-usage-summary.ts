import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetUsageSummaryInput {
  startMonth: Date;
  endMonth?: Date;
  includeOrgDetails?: boolean;
}

export const getUsageSummary = async (
  client: DatadogClient,
  input: GetUsageSummaryInput
) => {
  return client.getUsageSummary(input);
};
