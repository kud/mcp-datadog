import { DatadogClient } from '../../lib/datadog-client.js';


interface DatadogMuteHostParams {
  hostName: string;
  body: any;
}

export async function datadogMuteHost(
  client: DatadogClient,
  input: DatadogMuteHostParams
): Promise<any> {
  return client.muteHost(input);
}
