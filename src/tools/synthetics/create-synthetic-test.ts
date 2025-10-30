import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogCreateSyntheticTestParams {
  body: any;
}

export async function datadogCreateSyntheticTest(
  client: DatadogClient,
  input: DatadogCreateSyntheticTestParams
): Promise<any> {
  return client.createSyntheticAPITest(input);
}
