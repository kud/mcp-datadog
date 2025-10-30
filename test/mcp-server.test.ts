import { describe, it, expect } from 'vitest';

describe('Datadog MCP Server', () => {
  it('should export DatadogClient', async () => {
    const { DatadogClient } = await import('../src/lib/datadog-client.js');
    expect(DatadogClient).toBeDefined();
  });

  it('should export environment configuration', async () => {
    const { loadDatadogEnv } = await import('../src/common/env.js');
    expect(loadDatadogEnv).toBeDefined();
  });

  it('should export common utilities', async () => {
    const common = await import('../src/common/index.js');
    expect(common.logger).toBeDefined();
    expect(common.McpError).toBeDefined();
  });

  it('should export tool implementations', async () => {
    const { listMonitors } = await import('../src/tools/list-monitors.js');
    const { getMonitor } = await import('../src/tools/get-monitor.js');
    const { submitMetrics } = await import('../src/tools/submit-metrics.js');

    expect(listMonitors).toBeDefined();
    expect(getMonitor).toBeDefined();
    expect(submitMetrics).toBeDefined();
  });
});

describe('Environment Configuration', () => {
  it('should validate required environment variables', async () => {
    const { loadDatadogEnv } = await import('../src/common/env.js');

    // Save original env
    const originalApiKey = process.env.DD_API_KEY;
    const originalAppKey = process.env.DD_APP_KEY;

    // Clear env vars
    delete process.env.DD_API_KEY;
    delete process.env.DD_APP_KEY;

    expect(() => loadDatadogEnv()).toThrow('Missing DD_API_KEY');

    // Restore env
    if (originalApiKey) process.env.DD_API_KEY = originalApiKey;
    if (originalAppKey) process.env.DD_APP_KEY = originalAppKey;
  });
});
