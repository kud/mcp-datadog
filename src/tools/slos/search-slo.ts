import { DatadogClient } from '../../lib/datadog-client.js';

export interface SearchSloInput {
  query?: string;
  pageSize?: number;
  pageNumber?: number;
}

export const searchSlo = async (client: DatadogClient, input: SearchSloInput = {}) => {
  return client.searchSLO(input);
};
