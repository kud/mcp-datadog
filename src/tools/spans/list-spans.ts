import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface ListSpansInput {
  body: v2.SpansListRequest;
}

export const listSpans = async (client: DatadogClient, input: ListSpansInput) => {
  return client.listSpans(input);
};
