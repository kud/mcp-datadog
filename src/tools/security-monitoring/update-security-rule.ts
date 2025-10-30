import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface UpdateSecurityRuleInput {
  ruleId: string;
  body: v2.SecurityMonitoringRuleUpdatePayload;
}

export const updateSecurityRule = async (
  client: DatadogClient,
  input: UpdateSecurityRuleInput
) => {
  return client.updateSecurityMonitoringRule(input);
};
