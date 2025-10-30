import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface CreateWebhookInput {
  body: v1.WebhooksIntegration;
}

export const createWebhook = async (
  client: DatadogClient,
  input: CreateWebhookInput
) => {
  return client.createWebhooksIntegration(input);
};
