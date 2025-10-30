import { DatadogClient } from '../../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface UpdateNotebookInput {
  notebookId: number;
  body: v1.NotebookUpdateRequest;
}

export const updateNotebook = async (
  client: DatadogClient,
  input: UpdateNotebookInput
) => {
  return client.updateNotebook(input);
};
