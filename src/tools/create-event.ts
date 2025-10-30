import { DatadogClient } from '../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface CreateEventInput {
  title: string;
  text: string;
  tags?: string[];
  alertType?: string;
  priority?: string;
  aggregationKey?: string;
}

export const createEvent = async (client: DatadogClient, input: CreateEventInput) => {
  const body: v1.EventCreateRequest = {
    title: input.title,
    text: input.text,
    tags: input.tags,
    alertType: input.alertType as v1.EventAlertType,
    priority: input.priority as v1.EventPriority,
    aggregationKey: input.aggregationKey,
  };

  return client.createEvent({ body });
};
