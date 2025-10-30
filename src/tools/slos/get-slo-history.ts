import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogGetSloHistoryParams {
  sloId: string;
  fromTs: number;
  toTs: number;
}

export async function datadogGetSloHistory(
  client: DatadogClient,
  input: DatadogGetSloHistoryParams
): Promise<any> {
  return client.getSLOHistory(input);
}
