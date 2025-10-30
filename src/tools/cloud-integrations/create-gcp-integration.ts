import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface CreateGcpIntegrationInput {
  body: v1.GCPAccount;
}

export const createGcpIntegration = async (
  client: DatadogClient,
  input: CreateGcpIntegrationInput
) => {
  return client.createGCPIntegration(input);
};
