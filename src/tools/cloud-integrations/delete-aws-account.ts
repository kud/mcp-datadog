import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface DeleteAwsAccountInput {
  body: v1.AWSAccountDeleteRequest;
}

export const deleteAwsAccount = async (
  client: DatadogClient,
  input: DeleteAwsAccountInput
) => {
  return client.deleteAWSAccount(input);
};
