import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogGetSyntheticTestResultsParams {
  publicId: string;
  fromTs?: number;
  toTs?: number;
}

export async function datadogGetSyntheticTestResults(
  client: DatadogClient,
  input: DatadogGetSyntheticTestResultsParams
): Promise<any> {
  return client.getTestResults(input);
}
