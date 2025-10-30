import { DatadogClient } from '../../lib/datadog-client.js';

export interface DeleteApmRetentionFilterInput {
  filterId: string;
}

export const deleteApmRetentionFilter = async (
  client: DatadogClient,
  input: DeleteApmRetentionFilterInput
) => {
  return client.deleteApmRetentionFilter(input);
};
