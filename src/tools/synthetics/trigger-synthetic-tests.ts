import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogTriggerSyntheticTestsParams {
  body: any;
}

export async function datadogTriggerSyntheticTests(
  client: DatadogClient,
  input: DatadogTriggerSyntheticTestsParams
): Promise<any> {
  return client.triggerTests(input);
}
