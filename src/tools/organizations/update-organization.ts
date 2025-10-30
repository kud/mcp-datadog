import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface UpdateOrganizationInput {
  publicId: string;
  body: v1.Organization;
}

export const updateOrganization = async (
  client: DatadogClient,
  input: UpdateOrganizationInput
) => {
  return client.updateOrg(input);
};
