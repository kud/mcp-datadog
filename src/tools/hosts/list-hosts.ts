import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogListHostsParams {
  filter?: string;
  count?: number;
}

export async function datadogListHosts(
  client: DatadogClient,
  input: DatadogListHostsParams
): Promise<any> {
  return client.listHosts(input);
}
