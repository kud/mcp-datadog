import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogCreateHostTagsParams {
  hostName: string;
  body: any;
}

export async function datadogCreateHostTags(
  client: DatadogClient,
  input: DatadogCreateHostTagsParams
): Promise<any> {
  return client.createHostTags(input);
}
