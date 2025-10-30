import { DatadogClient } from '../../lib/datadog-client.js';

export interface DeleteNotebookInput {
  notebookId: number;
}

export const deleteNotebook = async (
  client: DatadogClient,
  input: DeleteNotebookInput
) => {
  return client.deleteNotebook(input);
};
