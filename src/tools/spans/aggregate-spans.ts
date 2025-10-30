import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface AggregateSpansInput {
  body: v2.SpansAggregateRequest;
}

export const aggregateSpans = async (client: DatadogClient, input: AggregateSpansInput) => {
  return client.aggregateSpans(input);
};
