import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogUpdateSloParams {
  sloId: string;
  body: any;
}

export async function datadogUpdateSlo(
  client: DatadogClient,
  input: DatadogUpdateSloParams
): Promise<any> {
  return client.updateSLO(input);
}
