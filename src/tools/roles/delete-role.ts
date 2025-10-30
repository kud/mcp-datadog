import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogDeleteRoleParams {
  roleId: string;
}

export async function datadogDeleteRole(
  client: DatadogClient,
  input: DatadogDeleteRoleParams
): Promise<any> {
  return client.deleteRole(input);
}
