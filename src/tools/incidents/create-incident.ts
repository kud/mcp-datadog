import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogCreateIncidentParams {
  body: any;
}

export async function datadogCreateIncident(
  client: DatadogClient,
  input: DatadogCreateIncidentParams
): Promise<any> {
  return client.createIncident(input);
}
