import { DatadogClient } from '../../lib/datadog-client.js';

export interface ListSecurityRulesInput {
  pageSize?: number;
  pageNumber?: number;
}

export const listSecurityRules = async (
  client: DatadogClient,
  input: ListSecurityRulesInput = {}
) => {
  return client.listSecurityMonitoringRules(input);
};
