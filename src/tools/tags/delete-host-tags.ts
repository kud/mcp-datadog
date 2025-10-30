import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogDeleteHostTagsParams {
  hostName: string;
}

export async function datadogDeleteHostTags(
  client: DatadogClient,
  input: DatadogDeleteHostTagsParams
): Promise<any> {
  return client.deleteHostTags(input);
}
