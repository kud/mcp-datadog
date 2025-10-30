import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface GetIncidentTeamInput {
  teamId: string;
  include?: v2.IncidentRelatedObject;
}

export const getIncidentTeam = async (
  client: DatadogClient,
  input: GetIncidentTeamInput
) => {
  return client.getIncidentTeam(input);
};
