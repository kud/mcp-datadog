import { DatadogClient } from '../lib/datadog-client.js';

export interface ListDowntimesInput {
  currentOnly?: boolean;
}

export const listDowntimes = async (client: DatadogClient, input: ListDowntimesInput) => {
  return client.listDowntimes({ currentOnly: input.currentOnly });
};
