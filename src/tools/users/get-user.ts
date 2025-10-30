import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogGetUserParams {
  userId: string;
}

export async function datadogGetUser(
  client: DatadogClient,
  input: DatadogGetUserParams
): Promise<any> {
  return client.getUser(input);
}
