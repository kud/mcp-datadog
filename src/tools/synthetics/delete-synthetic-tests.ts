import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogDeleteSyntheticTestsParams {
  body: any;
}

export async function datadogDeleteSyntheticTests(
  client: DatadogClient,
  input: DatadogDeleteSyntheticTestsParams
): Promise<any> {
  return client.deleteTests(input);
}
