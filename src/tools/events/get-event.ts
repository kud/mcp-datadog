import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetEventInput {
  eventId: number;
}

export const getEvent = async (client: DatadogClient, input: GetEventInput) => {
  return client.getEvent(input);
};
