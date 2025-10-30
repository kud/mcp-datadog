import { DatadogClient } from '../../lib/datadog-client.js';

export interface SearchIncidentsInput {
  query: string;
}

export const searchIncidents = async (
  client: DatadogClient,
  input: SearchIncidentsInput
) => {
  return client.searchIncidents(input);
};
