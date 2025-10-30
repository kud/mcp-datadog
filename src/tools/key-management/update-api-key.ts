import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface UpdateApiKeyInput {
  apiKeyId: string;
  body: v2.APIKeyUpdateRequest;
}

export const updateApiKey = async (
  client: DatadogClient,
  input: UpdateApiKeyInput
) => {
  return client.updateAPIKey(input);
};
