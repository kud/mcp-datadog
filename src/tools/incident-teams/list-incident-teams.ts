import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface ListIncidentTeamsInput {
  include?: v2.IncidentRelatedObject;
  pageSize?: number;
  pageOffset?: number;
  filter?: string;
}

export const listIncidentTeams = async (
  client: DatadogClient,
  input: ListIncidentTeamsInput = {}
) => {
  return client.listIncidentTeams(input);
};
