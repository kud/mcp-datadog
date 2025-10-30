import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogDeleteSloParams {
  sloId: string;
  force?: string;
}

export async function datadogDeleteSlo(
  client: DatadogClient,
  input: DatadogDeleteSloParams
): Promise<any> {
  return client.deleteSLO(input);
}
