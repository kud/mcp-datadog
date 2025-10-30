import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface ListTeamsInput {
  pageNumber?: number;
  pageSize?: number;
  sort?: v2.ListTeamsSort;
  include?: Array<v2.ListTeamsInclude>;
  filterKeyword?: string;
  filterMe?: boolean;
}

export const listTeams = async (
  client: DatadogClient,
  input: ListTeamsInput = {}
) => {
  return client.listTeams(input);
};
