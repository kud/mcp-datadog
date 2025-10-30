import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogGetSyntheticTestParams {
  publicId: string;
}

export async function datadogGetSyntheticTest(
  client: DatadogClient,
  input: DatadogGetSyntheticTestParams
): Promise<any> {
  return client.getTest(input);
}
