import { DatadogClient } from '../../lib/datadog-client.js';

export interface DeleteIncidentServiceInput {
  serviceId: string;
}

export const deleteIncidentService = async (
  client: DatadogClient,
  input: DeleteIncidentServiceInput
) => {
  return client.deleteIncidentService(input);
};
