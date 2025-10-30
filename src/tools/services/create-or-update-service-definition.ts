import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface CreateOrUpdateServiceDefinitionInput {
  body: v2.ServiceDefinitionV2Dot2;
}

export const createOrUpdateServiceDefinition = async (
  client: DatadogClient,
  input: CreateOrUpdateServiceDefinitionInput
) => {
  return client.createOrUpdateServiceDefinitions(input);
};
