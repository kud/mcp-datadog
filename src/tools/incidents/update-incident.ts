import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogUpdateIncidentParams {
  incidentId: string;
  body: any;
}

export async function datadogUpdateIncident(
  client: DatadogClient,
  input: DatadogUpdateIncidentParams
): Promise<any> {
  return client.updateIncident(input);
}
