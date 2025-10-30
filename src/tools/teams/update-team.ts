import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface UpdateTeamInput {
  teamId: string;
  body: v2.TeamUpdateRequest;
}

export const updateTeam = async (
  client: DatadogClient,
  input: UpdateTeamInput
) => {
  return client.updateTeam(input);
};
