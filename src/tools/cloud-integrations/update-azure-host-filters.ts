import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface UpdateAzureHostFiltersInput {
  body: v1.AzureAccount;
}

export const updateAzureHostFilters = async (
  client: DatadogClient,
  input: UpdateAzureHostFiltersInput
) => {
  return client.updateAzureHostFilters(input);
};
