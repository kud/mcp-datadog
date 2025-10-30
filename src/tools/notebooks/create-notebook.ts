import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface CreateNotebookInput {
  body: v1.NotebookCreateRequest;
}

export const createNotebook = async (
  client: DatadogClient,
  input: CreateNotebookInput
) => {
  return client.createNotebook(input);
};
