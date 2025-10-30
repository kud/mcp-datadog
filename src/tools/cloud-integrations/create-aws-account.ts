import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface CreateAwsAccountInput {
  body: v1.AWSAccount;
}

export const createAwsAccount = async (
  client: DatadogClient,
  input: CreateAwsAccountInput
) => {
  return client.createAWSAccount(input);
};
