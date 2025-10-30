import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface UpdateIncidentTeamInput {
  teamId: string;
  body: v2.IncidentTeamUpdateRequest;
}

export const updateIncidentTeam = async (
  client: DatadogClient,
  input: UpdateIncidentTeamInput
) => {
  return client.updateIncidentTeam(input);
};
