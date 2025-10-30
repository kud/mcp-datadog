import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogCreateSloParams {
  body: any;
}

export async function datadogCreateSlo(
  client: DatadogClient,
  input: DatadogCreateSloParams
): Promise<any> {
  return client.createSLO(input);
}
