import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogListSyntheticTestsParams {
  pageSize?: number;
  pageNumber?: number;
}

export async function datadogListSyntheticTests(
  client: DatadogClient,
  input: DatadogListSyntheticTestsParams
): Promise<any> {
  return client.listTests(input);
}
