import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface ListIncidentServicesInput {
  include?: v2.IncidentRelatedObject;
  pageSize?: number;
  pageOffset?: number;
  filter?: string;
}

export const listIncidentServices = async (
  client: DatadogClient,
  input: ListIncidentServicesInput = {}
) => {
  return client.listIncidentServices(input);
};
