import { DatadogClient } from '../../lib/datadog-client.js';

export interface DeleteIncidentTeamInput {
  teamId: string;
}

export const deleteIncidentTeam = async (
  client: DatadogClient,
  input: DeleteIncidentTeamInput
) => {
  return client.deleteIncidentTeam(input);
};
