import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogUpdateUserParams {
  userId: string;
  body: any;
}

export async function datadogUpdateUser(
  client: DatadogClient,
  input: DatadogUpdateUserParams
): Promise<any> {
  return client.updateUser(input);
}
