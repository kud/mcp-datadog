import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetRumApplicationInput {
  id: string;
}

export const getRumApplication = async (
  client: DatadogClient,
  input: GetRumApplicationInput
) => {
  return client.getRUMApplication(input);
};
