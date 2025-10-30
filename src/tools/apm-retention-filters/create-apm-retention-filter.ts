import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface CreateApmRetentionFilterInput {
  body: v2.RetentionFilterCreateRequest;
}

export const createApmRetentionFilter = async (
  client: DatadogClient,
  input: CreateApmRetentionFilterInput
) => {
  return client.createApmRetentionFilter(input);
};
