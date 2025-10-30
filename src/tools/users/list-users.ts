import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogListUsersParams {
  pageSize?: number;
  pageNumber?: number;
  filter?: string;
}

export async function datadogListUsers(
  client: DatadogClient,
  input: DatadogListUsersParams
): Promise<any> {
  return client.listUsers(input);
}
