import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface UpdateGcpIntegrationInput {
  body: v1.GCPAccount;
}

export const updateGcpIntegration = async (
  client: DatadogClient,
  input: UpdateGcpIntegrationInput
) => {
  return client.updateGCPIntegration(input);
};
