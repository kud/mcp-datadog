import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface EnableAwsLogServicesInput {
  body: v1.AWSLogsServicesRequest;
}

export const enableAwsLogServices = async (
  client: DatadogClient,
  input: EnableAwsLogServicesInput
) => {
  return client.enableAWSLogServices(input);
};
