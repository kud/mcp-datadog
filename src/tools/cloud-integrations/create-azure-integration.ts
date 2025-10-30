import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface CreateAzureIntegrationInput {
  body: v1.AzureAccount;
}

export const createAzureIntegration = async (
  client: DatadogClient,
  input: CreateAzureIntegrationInput
) => {
  return client.createAzureIntegration(input);
};
