import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogDeleteIncidentParams {
  incidentId: string;
}

export async function datadogDeleteIncident(
  client: DatadogClient,
  input: DatadogDeleteIncidentParams
): Promise<any> {
  return client.deleteIncident(input);
}
