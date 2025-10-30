import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetHostTagsInput {
  hostName: string;
}

export const getHostTags = async (client: DatadogClient, input: GetHostTagsInput) => {
  return client.getHostTags(input);
};
