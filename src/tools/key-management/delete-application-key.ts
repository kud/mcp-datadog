import { DatadogClient } from '../../lib/datadog-client.js';

export interface DeleteApplicationKeyInput {
  appKeyId: string;
}

export const deleteApplicationKey = async (
  client: DatadogClient,
  input: DeleteApplicationKeyInput
) => {
  return client.deleteApplicationKey(input);
};
