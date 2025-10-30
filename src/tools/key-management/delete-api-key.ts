import { DatadogClient } from '../../lib/datadog-client.js';

export interface DeleteApiKeyInput {
  apiKeyId: string;
}

export const deleteApiKey = async (
  client: DatadogClient,
  input: DeleteApiKeyInput
) => {
  return client.deleteAPIKey(input);
};
