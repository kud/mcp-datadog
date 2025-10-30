import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetNotebookInput {
  notebookId: number;
}

export const getNotebook = async (
  client: DatadogClient,
  input: GetNotebookInput
) => {
  return client.getNotebook(input);
};
