import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogGetDowntimeParams {
  downtimeId: number;
}

export async function datadogGetDowntime(
  client: DatadogClient,
  input: DatadogGetDowntimeParams
): Promise<any> {
  return client.getDowntime(input);
}
