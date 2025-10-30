import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogDisableUserParams {
  userId: string;
}

export async function datadogDisableUser(
  client: DatadogClient,
  input: DatadogDisableUserParams
): Promise<any> {
  return client.disableUser(input);
}
