import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetOrganizationInput {
  publicId: string;
}

export const getOrganization = async (
  client: DatadogClient,
  input: GetOrganizationInput
) => {
  return client.getOrg(input);
};
