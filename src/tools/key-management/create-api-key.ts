import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface CreateApiKeyInput {
  body: v2.APIKeyCreateRequest;
}

export const createApiKey = async (
  client: DatadogClient,
  input: CreateApiKeyInput
) => {
  return client.createAPIKey(input);
};
