import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogUpdateSyntheticTestParams {
  publicId: string;
  body: any;
}

export async function datadogUpdateSyntheticTest(
  client: DatadogClient,
  input: DatadogUpdateSyntheticTestParams
): Promise<any> {
  return client.updateAPITest(input);
}
