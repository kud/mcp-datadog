import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface DeleteAzureIntegrationInput {
  body: v1.AzureAccount;
}

export const deleteAzureIntegration = async (
  client: DatadogClient,
  input: DeleteAzureIntegrationInput
) => {
  return client.deleteAzureIntegration(input);
};
