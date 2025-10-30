import { DatadogClient } from '../../lib/datadog-client.js';

export interface DeleteWebhookInput {
  webhookName: string;
}

export const deleteWebhook = async (
  client: DatadogClient,
  input: DeleteWebhookInput
) => {
  return client.deleteWebhooksIntegration(input);
};
