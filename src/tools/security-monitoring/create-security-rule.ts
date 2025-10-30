import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface CreateSecurityRuleInput {
  body: v2.SecurityMonitoringRuleCreatePayload;
}

export const createSecurityRule = async (
  client: DatadogClient,
  input: CreateSecurityRuleInput
) => {
  return client.createSecurityMonitoringRule(input);
};
