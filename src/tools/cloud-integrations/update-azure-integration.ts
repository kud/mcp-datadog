import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface UpdateAzureIntegrationInput {
  body: v1.AzureAccount;
}

export const updateAzureIntegration = async (
  client: DatadogClient,
  input: UpdateAzureIntegrationInput
) => {
  return client.updateAzureIntegration(input);
};
