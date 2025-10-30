#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool
} from '@modelcontextprotocol/sdk/types.js';
import { logger, McpError } from './common/index.js';
import { DatadogClient } from './lib/datadog-client.js';
import { listMonitors } from './tools/list-monitors.js';
import { getMonitor } from './tools/get-monitor.js';
import { createMonitor } from './tools/create-monitor.js';
import { deleteMonitor } from './tools/delete-monitor.js';
import { listDashboards } from './tools/list-dashboards.js';
import { getDashboard } from './tools/get-dashboard.js';
import { submitMetrics } from './tools/submit-metrics.js';
import { queryMetrics } from './tools/query-metrics.js';
import { listLogs } from './tools/list-logs.js';
import { listEvents } from './tools/list-events.js';
import { createEvent } from './tools/create-event.js';
import { listDowntimes } from './tools/list-downtimes.js';

// Tool definitions with proper MCP schema
const tools: Tool[] = [
  {
    name: 'datadog_list_monitors',
    description: 'List all Datadog monitors with optional filters',
    inputSchema: {
      type: 'object',
      properties: {
        groupStates: {
          type: 'string',
          description: 'Filter by monitor group states (comma-separated)'
        },
        name: {
          type: 'string',
          description: 'Filter monitors by name (substring match)'
        },
        tags: {
          type: 'string',
          description: 'Filter by tags (comma-separated)'
        },
        monitorTags: {
          type: 'string',
          description: 'Filter by monitor tags (comma-separated)'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_get_monitor',
    description: 'Get detailed information about a specific monitor',
    inputSchema: {
      type: 'object',
      properties: {
        monitorId: {
          type: 'number',
          description: 'Monitor ID'
        }
      },
      required: ['monitorId']
    }
  },
  {
    name: 'datadog_create_monitor',
    description: 'Create a new Datadog monitor',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Monitor name'
        },
        type: {
          type: 'string',
          description: 'Monitor type (e.g., metric alert, service check, log alert)'
        },
        query: {
          type: 'string',
          description: 'Monitor query'
        },
        message: {
          type: 'string',
          description: 'Notification message'
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Tags for the monitor'
        },
        options: {
          type: 'object',
          description: 'Monitor options (thresholds, etc.)',
          additionalProperties: true
        }
      },
      required: ['name', 'type', 'query']
    }
  },
  {
    name: 'datadog_delete_monitor',
    description: 'Delete a monitor',
    inputSchema: {
      type: 'object',
      properties: {
        monitorId: {
          type: 'number',
          description: 'Monitor ID to delete'
        }
      },
      required: ['monitorId']
    }
  },
  {
    name: 'datadog_list_dashboards',
    description: 'List all Datadog dashboards',
    inputSchema: {
      type: 'object',
      properties: {
        filterShared: {
          type: 'boolean',
          description: 'Filter by shared dashboards only'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_get_dashboard',
    description: 'Get detailed information about a specific dashboard',
    inputSchema: {
      type: 'object',
      properties: {
        dashboardId: {
          type: 'string',
          description: 'Dashboard ID'
        }
      },
      required: ['dashboardId']
    }
  },
  {
    name: 'datadog_submit_metrics',
    description: 'Submit custom metrics to Datadog',
    inputSchema: {
      type: 'object',
      properties: {
        series: {
          type: 'array',
          description: 'Array of metric series to submit',
          items: {
            type: 'object',
            properties: {
              metric: {
                type: 'string',
                description: 'Metric name'
              },
              type: {
                type: 'number',
                description: 'Metric type (0=count, 1=rate, 2=gauge)'
              },
              points: {
                type: 'array',
                description: 'Data points',
                items: {
                  type: 'object',
                  properties: {
                    timestamp: {
                      type: 'number',
                      description: 'Unix timestamp'
                    },
                    value: {
                      type: 'number',
                      description: 'Metric value'
                    }
                  },
                  required: ['timestamp', 'value']
                }
              },
              tags: {
                type: 'array',
                items: { type: 'string' },
                description: 'Metric tags'
              },
              unit: {
                type: 'string',
                description: 'Metric unit'
              }
            },
            required: ['metric', 'points']
          }
        }
      },
      required: ['series']
    }
  },
  {
    name: 'datadog_query_metrics',
    description: 'Query metrics data from Datadog',
    inputSchema: {
      type: 'object',
      properties: {
        from: {
          type: 'number',
          description: 'Start time (Unix timestamp)'
        },
        to: {
          type: 'number',
          description: 'End time (Unix timestamp)'
        },
        query: {
          type: 'string',
          description: 'Metric query string'
        }
      },
      required: ['from', 'to', 'query']
    }
  },
  {
    name: 'datadog_list_logs',
    description: 'Search and list logs from Datadog',
    inputSchema: {
      type: 'object',
      properties: {
        filterQuery: {
          type: 'string',
          description: 'Log search query'
        },
        filterFrom: {
          type: 'string',
          description: 'Start time (ISO 8601 format)'
        },
        filterTo: {
          type: 'string',
          description: 'End time (ISO 8601 format)'
        },
        sort: {
          type: 'string',
          description: 'Sort order (timestamp_ascending or timestamp_descending)'
        },
        pageLimit: {
          type: 'number',
          description: 'Maximum number of logs to return'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_list_events',
    description: 'List events from Datadog',
    inputSchema: {
      type: 'object',
      properties: {
        start: {
          type: 'number',
          description: 'Start time (Unix timestamp)'
        },
        end: {
          type: 'number',
          description: 'End time (Unix timestamp)'
        },
        priority: {
          type: 'string',
          description: 'Filter by priority (normal or low)'
        },
        sources: {
          type: 'string',
          description: 'Filter by sources (comma-separated)'
        },
        tags: {
          type: 'string',
          description: 'Filter by tags (comma-separated)'
        }
      },
      required: ['start', 'end']
    }
  },
  {
    name: 'datadog_create_event',
    description: 'Create a new event in Datadog',
    inputSchema: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'Event title'
        },
        text: {
          type: 'string',
          description: 'Event description'
        },
        tags: {
          type: 'array',
          items: { type: 'string' },
          description: 'Event tags'
        },
        alertType: {
          type: 'string',
          description: 'Alert type (error, warning, info, success)'
        },
        priority: {
          type: 'string',
          description: 'Priority (normal or low)'
        },
        aggregationKey: {
          type: 'string',
          description: 'Aggregation key for grouping events'
        }
      },
      required: ['title', 'text']
    }
  },
  {
    name: 'datadog_list_downtimes',
    description: 'List scheduled downtimes',
    inputSchema: {
      type: 'object',
      properties: {
        currentOnly: {
          type: 'boolean',
          description: 'Only return currently active downtimes'
        }
      },
      required: []
    }
  }
];

// Map tool names to handler functions
type ToolHandler = (client: DatadogClient, input: any) => Promise<any>;
const toolHandlers: Record<string, ToolHandler> = {
  'datadog_list_monitors': listMonitors,
  'datadog_get_monitor': getMonitor,
  'datadog_create_monitor': createMonitor,
  'datadog_delete_monitor': deleteMonitor,
  'datadog_list_dashboards': listDashboards,
  'datadog_get_dashboard': getDashboard,
  'datadog_submit_metrics': submitMetrics,
  'datadog_query_metrics': queryMetrics,
  'datadog_list_logs': listLogs,
  'datadog_list_events': listEvents,
  'datadog_create_event': createEvent,
  'datadog_list_downtimes': listDowntimes
};

// Create MCP server instance
const server = new Server(
  {
    name: 'datadog-mcp-server',
    version: '0.1.0'
  },
  {
    capabilities: {
      tools: {}
    }
  }
);

// Initialize Datadog client
let datadogClient: DatadogClient;
try {
  datadogClient = new DatadogClient();
  logger.info('Datadog MCP Server initialized successfully');
} catch (error: any) {
  logger.error('Failed to initialize Datadog client', { error: error.message });
  process.exit(1);
}

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return { tools };
});

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    const handler = toolHandlers[name];
    if (!handler) {
      throw new McpError('NOT_FOUND', `Unknown tool: ${name}`);
    }

    logger.info(`Executing tool: ${name}`, { args });
    const result = await handler(datadogClient, args || {});

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(result, null, 2)
        }
      ]
    };
  } catch (error: any) {
    logger.error(`Tool execution failed: ${name}`, { error: error.message, stack: error.stack });

    if (error instanceof McpError) {
      throw error;
    }

    // Wrap unknown errors in McpError
    throw new McpError(
      'INTERNAL_ERROR',
      `Tool execution failed: ${error.message}`,
      error.stack
    );
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  logger.info('Datadog MCP Server running on stdio');
}

main().catch((error) => {
  logger.error('Fatal error', { error: error.message, stack: error.stack });
  process.exit(1);
});
