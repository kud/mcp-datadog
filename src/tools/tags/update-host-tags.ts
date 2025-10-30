import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface UpdateHostTagsInput {
  hostName: string;
  body: v1.HostTags;
}

export const updateHostTags = async (client: DatadogClient, input: UpdateHostTagsInput) => {
  return client.updateHostTags(input);
};
