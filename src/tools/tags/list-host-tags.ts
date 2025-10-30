import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogListHostTagsParams {
  source?: string;
}

export async function datadogListHostTags(
  client: DatadogClient,
  input: DatadogListHostTagsParams
): Promise<any> {
  return client.listHostTags(input);
}
