import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface GetServiceDefinitionInput {
  serviceName: string;
  schemaVersion?: v2.ServiceDefinitionSchemaVersions;
}

export const getServiceDefinition = async (
  client: DatadogClient,
  input: GetServiceDefinitionInput
) => {
  return client.getServiceDefinition(input);
};
