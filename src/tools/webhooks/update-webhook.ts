import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface UpdateWebhookInput {
  webhookName: string;
  body: v1.WebhooksIntegrationUpdateRequest;
}

export const updateWebhook = async (
  client: DatadogClient,
  input: UpdateWebhookInput
) => {
  return client.updateWebhooksIntegration(input);
};
