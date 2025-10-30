import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetTeamInput {
  teamId: string;
}

export const getTeam = async (
  client: DatadogClient,
  input: GetTeamInput
) => {
  return client.getTeam(input);
};
