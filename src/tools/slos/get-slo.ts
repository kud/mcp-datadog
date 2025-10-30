import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogGetSloParams {
  sloId: string;
  withConfiguredAlertIds?: boolean;
}

export async function datadogGetSlo(
  client: DatadogClient,
  input: DatadogGetSloParams
): Promise<any> {
  return client.getSLO(input);
}
