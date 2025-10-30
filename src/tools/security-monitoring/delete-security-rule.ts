import { DatadogClient } from '../../lib/datadog-client.js';

export interface DeleteSecurityRuleInput {
  ruleId: string;
}

export const deleteSecurityRule = async (
  client: DatadogClient,
  input: DeleteSecurityRuleInput
) => {
  return client.deleteSecurityMonitoringRule(input);
};
