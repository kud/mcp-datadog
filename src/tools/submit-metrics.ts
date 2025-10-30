import { DatadogClient } from '../lib/datadog-client.js';
import { v2 } from '@datadog/datadog-api-client';

export interface SubmitMetricsInput {
  series: Array<{
    metric: string;
    type?: number;
    points: Array<{
      timestamp: number;
      value: number;
    }>;
    tags?: string[];
    unit?: string;
  }>;
}

export const submitMetrics = async (client: DatadogClient, input: SubmitMetricsInput) => {
  const payload: v2.MetricPayload = {
    series: input.series.map((s) => ({
      metric: s.metric,
      type: s.type as v2.MetricIntakeType,
      points: s.points.map((p) => ({
        timestamp: p.timestamp,
        value: p.value,
      })),
      tags: s.tags,
      unit: s.unit,
    })),
  };

  return client.submitMetrics(payload);
};
