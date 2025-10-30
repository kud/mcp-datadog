import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface RemovePermissionFromRoleInput {
  roleId: string;
  body: v2.RelationshipToPermission;
}

export const removePermissionFromRole = async (
  client: DatadogClient,
  input: RemovePermissionFromRoleInput
) => {
  return client.removePermissionFromRole(input);
};
