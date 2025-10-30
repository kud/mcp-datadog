import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogCreateRoleParams {
  body: any;
}

export async function datadogCreateRole(
  client: DatadogClient,
  input: DatadogCreateRoleParams
): Promise<any> {
  return client.createRole(input);
}
