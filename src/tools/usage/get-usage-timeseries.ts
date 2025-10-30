import { DatadogClient } from '../../lib/datadog-client.js';

export interface GetUsageTimeseriesInput {
  startHr: Date;
  endHr?: Date;
}

export const getUsageTimeseries = async (
  client: DatadogClient,
  input: GetUsageTimeseriesInput
) => {
  return client.getUsageTimeseries(input);
};
