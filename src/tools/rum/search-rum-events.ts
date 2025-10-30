import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface SearchRumEventsInput {
  body: v2.RUMSearchEventsRequest;
}

export const searchRumEvents = async (
  client: DatadogClient,
  input: SearchRumEventsInput
) => {
  return client.searchRUMEvents(input);
};
