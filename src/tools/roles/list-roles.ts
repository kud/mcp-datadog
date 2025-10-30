import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogListRolesParams {
  pageSize?: number;
  pageNumber?: number;
}

export async function datadogListRoles(
  client: DatadogClient,
  input: DatadogListRolesParams
): Promise<any> {
  return client.listRoles(input);
}
