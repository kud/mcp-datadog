import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogUpdateMonitorParams {
  monitorId: number;
  body: any;
}

export async function datadogUpdateMonitor(
  client: DatadogClient,
  input: DatadogUpdateMonitorParams
): Promise<any> {
  return client.updateMonitor(input);
}
