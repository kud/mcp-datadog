import { DatadogClient } from '../lib/datadog-client.js';

export interface GetMonitorInput {
  monitorId: number;
}

export const getMonitor = async (client: DatadogClient, input: GetMonitorInput) => {
  return client.getMonitor({ monitorId: input.monitorId });
};
