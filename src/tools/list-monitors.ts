import { DatadogClient } from '../lib/datadog-client.js';

export interface ListMonitorsInput {
  groupStates?: string;
  name?: string;
  tags?: string;
  monitorTags?: string;
}

export const listMonitors = async (client: DatadogClient, input: ListMonitorsInput) => {
  return client.listMonitors(input);
};
