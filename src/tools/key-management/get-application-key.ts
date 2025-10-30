import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetApplicationKeyInput {
  appKeyId: string;
  include?: string;
}

export const getApplicationKey = async (
  client: DatadogClient,
  input: GetApplicationKeyInput
) => {
  return client.getApplicationKey(input);
};
