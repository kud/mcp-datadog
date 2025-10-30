import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogUpdateRoleParams {
  roleId: string;
  body: any;
}

export async function datadogUpdateRole(
  client: DatadogClient,
  input: DatadogUpdateRoleParams
): Promise<any> {
  return client.updateRole(input);
}
