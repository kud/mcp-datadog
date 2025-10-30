import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogUnmuteHostParams {
  hostName: string;
}

export async function datadogUnmuteHost(
  client: DatadogClient,
  input: DatadogUnmuteHostParams
): Promise<any> {
  return client.unmuteHost(input);
}
