import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogGetRoleParams {
  roleId: string;
}

export async function datadogGetRole(
  client: DatadogClient,
  input: DatadogGetRoleParams
): Promise<any> {
  return client.getRole(input);
}
