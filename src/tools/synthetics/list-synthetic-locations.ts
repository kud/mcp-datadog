import { DatadogClient } from '../../lib/datadog-client.js';


export async function datadogListSyntheticLocations(
  client: DatadogClient,
  _input: Record<string, never>
): Promise<any> {
  return client.listLocations();
}
