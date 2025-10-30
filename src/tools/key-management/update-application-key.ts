import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface UpdateApplicationKeyInput {
  appKeyId: string;
  body: v2.ApplicationKeyUpdateRequest;
}

export const updateApplicationKey = async (
  client: DatadogClient,
  input: UpdateApplicationKeyInput
) => {
  return client.updateApplicationKey(input);
};
