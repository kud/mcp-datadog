import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetApmRetentionFilterInput {
  filterId: string;
}

export const getApmRetentionFilter = async (
  client: DatadogClient,
  input: GetApmRetentionFilterInput
) => {
  return client.getApmRetentionFilter(input);
};
