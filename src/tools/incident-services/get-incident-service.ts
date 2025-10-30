import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface GetIncidentServiceInput {
  serviceId: string;
  include?: v2.IncidentRelatedObject;
}

export const getIncidentService = async (
  client: DatadogClient,
  input: GetIncidentServiceInput
) => {
  return client.getIncidentService(input);
};
