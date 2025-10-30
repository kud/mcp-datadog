import { DatadogClient } from '../lib/datadog-client.js';

export interface DeleteMonitorInput {
  monitorId: number;
}

export const deleteMonitor = async (client: DatadogClient, input: DeleteMonitorInput) => {
  return client.deleteMonitor({ monitorId: input.monitorId });
};
