import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface CreateIncidentTeamInput {
  body: v2.IncidentTeamCreateRequest;
}

export const createIncidentTeam = async (
  client: DatadogClient,
  input: CreateIncidentTeamInput
) => {
  return client.createIncidentTeam(input);
};
