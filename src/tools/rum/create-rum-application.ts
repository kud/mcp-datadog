import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface CreateRumApplicationInput {
  body: v2.RUMApplicationCreateRequest;
}

export const createRumApplication = async (
  client: DatadogClient,
  input: CreateRumApplicationInput
) => {
  return client.createRUMApplication(input);
};
