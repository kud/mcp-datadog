import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface DeleteGcpIntegrationInput {
  body: v1.GCPAccount;
}

export const deleteGcpIntegration = async (
  client: DatadogClient,
  input: DeleteGcpIntegrationInput
) => {
  return client.deleteGCPIntegration(input);
};
