import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogGetIncidentParams {
  incidentId: string;
}

export async function datadogGetIncident(
  client: DatadogClient,
  input: DatadogGetIncidentParams
): Promise<any> {
  return client.getIncident(input);
}
