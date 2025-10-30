import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetSecurityRuleInput {
  ruleId: string;
}

export const getSecurityRule = async (
  client: DatadogClient,
  input: GetSecurityRuleInput
) => {
  return client.getSecurityMonitoringRule(input);
};
