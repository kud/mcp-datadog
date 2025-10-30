import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogUpdateDowntimeParams {
  downtimeId: number;
  body: any;
}

export async function datadogUpdateDowntime(
  client: DatadogClient,
  input: DatadogUpdateDowntimeParams
): Promise<any> {
  return client.updateDowntime(input);
}
