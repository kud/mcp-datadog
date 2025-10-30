import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetApiKeyInput {
  apiKeyId: string;
  include?: string;
}

export const getApiKey = async (
  client: DatadogClient,
  input: GetApiKeyInput
) => {
  return client.getAPIKey(input);
};
