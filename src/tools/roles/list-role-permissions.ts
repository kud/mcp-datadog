import { DatadogClient } from '../../lib/datadog-client.js';

export interface ListRolePermissionsInput {
  roleId: string;
}

export const listRolePermissions = async (
  client: DatadogClient,
  input: ListRolePermissionsInput
) => {
  return client.listRolePermissions(input);
};
