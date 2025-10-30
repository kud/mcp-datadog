import { DatadogClient } from '../../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface ListSecuritySignalsInput {
  filterQuery?: string;
  filterFrom?: Date;
  filterTo?: Date;
  sort?: v2.SecurityMonitoringSignalsSort;
  pageCursor?: string;
  pageLimit?: number;
}

export const listSecuritySignals = async (
  client: DatadogClient,
  input: ListSecuritySignalsInput = {}
) => {
  return client.listSecurityMonitoringSignals(input);
};
