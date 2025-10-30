import { DatadogClient } from '../../lib/datadog-client.js';

export interface DeleteTeamInput {
  teamId: string;
}

export const deleteTeam = async (
  client: DatadogClient,
  input: DeleteTeamInput
) => {
  return client.deleteTeam(input);
};
