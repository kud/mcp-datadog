import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogCreateDowntimeParams {
  body: any;
}

export async function datadogCreateDowntime(
  client: DatadogClient,
  input: DatadogCreateDowntimeParams
): Promise<any> {
  return client.createDowntime(input);
}
