import { DatadogClient } from '../../lib/datadog-client.js';

export interface DeleteServiceDefinitionInput {
  serviceName: string;
}

export const deleteServiceDefinition = async (
  client: DatadogClient,
  input: DeleteServiceDefinitionInput
) => {
  return client.deleteServiceDefinition(input);
};
