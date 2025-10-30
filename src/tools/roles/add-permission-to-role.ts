import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface AddPermissionToRoleInput {
  roleId: string;
  body: v2.RelationshipToPermission;
}

export const addPermissionToRole = async (
  client: DatadogClient,
  input: AddPermissionToRoleInput
) => {
  return client.addPermissionToRole(input);
};
