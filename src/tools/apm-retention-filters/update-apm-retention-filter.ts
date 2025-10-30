import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface UpdateApmRetentionFilterInput {
  filterId: string;
  body: v2.RetentionFilterUpdateRequest;
}

export const updateApmRetentionFilter = async (
  client: DatadogClient,
  input: UpdateApmRetentionFilterInput
) => {
  return client.updateApmRetentionFilter(input);
};
