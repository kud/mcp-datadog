import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetWebhookInput {
  webhookName: string;
}

export const getWebhook = async (
  client: DatadogClient,
  input: GetWebhookInput
) => {
  return client.getWebhooksIntegration(input);
};
