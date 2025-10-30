import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface AggregateRumEventsInput {
  body: v2.RUMAggregateRequest;
}

export const aggregateRumEvents = async (
  client: DatadogClient,
  input: AggregateRumEventsInput
) => {
  return client.aggregateRUMEvents(input);
};
