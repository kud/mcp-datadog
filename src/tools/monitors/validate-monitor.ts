import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogValidateMonitorParams {
  body: any;
}

export async function datadogValidateMonitor(
  client: DatadogClient,
  input: DatadogValidateMonitorParams
): Promise<any> {
  return client.validateMonitor(input);
}
