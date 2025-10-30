import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface CreateIncidentServiceInput {
  body: v2.IncidentServiceCreateRequest;
}

export const createIncidentService = async (
  client: DatadogClient,
  input: CreateIncidentServiceInput
) => {
  return client.createIncidentService(input);
};
