import { DatadogClient } from '../../lib/datadog-client.js';


export async function datadogGetHostTotals(
  client: DatadogClient,
  _input: Record<string, never>
): Promise<any> {
  return client.getHostTotals();
}
