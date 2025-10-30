import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface SubmitServiceCheckInput {
  body: v1.ServiceCheck[];
}

export const submitServiceCheck = async (
  client: DatadogClient,
  input: SubmitServiceCheckInput
) => {
  return client.submitServiceCheck(input);
};
