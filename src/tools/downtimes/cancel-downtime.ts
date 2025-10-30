import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogCancelDowntimeParams {
  downtimeId: number;
}

export async function datadogCancelDowntime(
  client: DatadogClient,
  input: DatadogCancelDowntimeParams
): Promise<any> {
  return client.cancelDowntime(input);
}
