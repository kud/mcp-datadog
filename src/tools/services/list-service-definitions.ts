import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface ListServiceDefinitionsInput {
  pageSize?: number;
  pageNumber?: number;
  schemaVersion?: v2.ServiceDefinitionSchemaVersions;
}

export const listServiceDefinitions = async (
  client: DatadogClient,
  input: ListServiceDefinitionsInput = {}
) => {
  return client.listServiceDefinitions(input);
};
