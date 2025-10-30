import { DatadogClient } from '../lib/datadog-client.js';

export interface ListEventsInput {
  start: number;
  end: number;
  priority?: string;
  sources?: string;
  tags?: string;
}

export const listEvents = async (client: DatadogClient, input: ListEventsInput) => {
  return client.listEvents({
    start: input.start,
    end: input.end,
    priority: input.priority as any,
    sources: input.sources,
    tags: input.tags,
  });
};
