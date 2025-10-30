import { DatadogClient } from '../../lib/datadog-client.js';

export interface DeleteRumApplicationInput {
  id: string;
}

export const deleteRumApplication = async (
  client: DatadogClient,
  input: DeleteRumApplicationInput
) => {
  return client.deleteRUMApplication(input);
};
