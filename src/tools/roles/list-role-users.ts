import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface ListRoleUsersInput {
  roleId: string;
  pageSize?: number;
  pageNumber?: number;
  sort?: string;
  sortDir?: v2.QuerySortOrder;
  filter?: string;
}

export const listRoleUsers = async (client: DatadogClient, input: ListRoleUsersInput) => {
  return client.listRoleUsers(input);
};
