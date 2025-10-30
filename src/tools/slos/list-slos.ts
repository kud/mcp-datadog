import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogListSlosParams {
  ids?: string;
  query?: string;
  tagsQuery?: string;
  limit?: number;
  offset?: number;
}

export async function datadogListSlos(
  client: DatadogClient,
  input: DatadogListSlosParams
): Promise<any> {
  return client.listSLOs(input);
}
