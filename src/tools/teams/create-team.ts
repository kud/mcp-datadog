import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface CreateTeamInput {
  body: v2.TeamCreateRequest;
}

export const createTeam = async (
  client: DatadogClient,
  input: CreateTeamInput
) => {
  return client.createTeam(input);
};
