import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogCreateUserParams {
  body: any;
}

export async function datadogCreateUser(
  client: DatadogClient,
  input: DatadogCreateUserParams
): Promise<any> {
  return client.createUser(input);
}
