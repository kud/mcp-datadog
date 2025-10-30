import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface UpdateIncidentServiceInput {
  serviceId: string;
  body: v2.IncidentServiceUpdateRequest;
}

export const updateIncidentService = async (
  client: DatadogClient,
  input: UpdateIncidentServiceInput
) => {
  return client.updateIncidentService(input);
};
