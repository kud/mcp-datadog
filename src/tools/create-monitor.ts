import { DatadogClient } from '../lib/datadog-client.js';
import { v1 } from '@datadog/datadog-api-client';

export interface CreateMonitorInput {
  name: string;
  type: string;
  query: string;
  message?: string;
  tags?: string[];
  options?: Record<string, any>;
}

export const createMonitor = async (client: DatadogClient, input: CreateMonitorInput) => {
  const monitor: v1.Monitor = {
    name: input.name,
    type: input.type as v1.MonitorType,
    query: input.query,
    message: input.message,
    tags: input.tags,
    options: input.options,
  };

  return client.createMonitor({ body: monitor });
};
