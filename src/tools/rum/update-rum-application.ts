import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface UpdateRumApplicationInput {
  id: string;
  body: v2.RUMApplicationUpdateRequest;
}

export const updateRumApplication = async (
  client: DatadogClient,
  input: UpdateRumApplicationInput
) => {
  return client.updateRUMApplication(input);
};
