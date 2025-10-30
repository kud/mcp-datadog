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

// Import existing tools from root tools directory
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

// Import spans tools
import { listSpansGet } from './tools/spans/list-spans-get.js';
import { listSpans } from './tools/spans/list-spans.js';
import { aggregateSpans } from './tools/spans/aggregate-spans.js';

// Import services tools
import { listServiceDefinitions } from './tools/services/list-service-definitions.js';
import { getServiceDefinition } from './tools/services/get-service-definition.js';

// Import monitors tools
import { datadogUpdateMonitor } from './tools/monitors/update-monitor.js';
import { datadogValidateMonitor } from './tools/monitors/validate-monitor.js';
import { datadogSearchMonitors } from './tools/monitors/search-monitors.js';

// Import dashboards tools
import { datadogCreateDashboard } from './tools/dashboards/create-dashboard.js';
import { datadogUpdateDashboard } from './tools/dashboards/update-dashboard.js';
import { datadogDeleteDashboard } from './tools/dashboards/delete-dashboard.js';

// Import downtimes tools
import { datadogCreateDowntime } from './tools/downtimes/create-downtime.js';
import { datadogGetDowntime } from './tools/downtimes/get-downtime.js';
import { datadogUpdateDowntime } from './tools/downtimes/update-downtime.js';
import { datadogCancelDowntime } from './tools/downtimes/cancel-downtime.js';

// Import SLOs tools
import { datadogCreateSlo } from './tools/slos/create-slo.js';
import { datadogGetSlo } from './tools/slos/get-slo.js';
import { datadogListSlos } from './tools/slos/list-slos.js';
import { datadogUpdateSlo } from './tools/slos/update-slo.js';
import { datadogDeleteSlo } from './tools/slos/delete-slo.js';
import { datadogGetSloHistory } from './tools/slos/get-slo-history.js';

// Import synthetics tools
import { datadogCreateSyntheticTest } from './tools/synthetics/create-synthetic-test.js';
import { datadogGetSyntheticTest } from './tools/synthetics/get-synthetic-test.js';
import { datadogListSyntheticTests } from './tools/synthetics/list-synthetic-tests.js';
import { datadogUpdateSyntheticTest } from './tools/synthetics/update-synthetic-test.js';
import { datadogDeleteSyntheticTests } from './tools/synthetics/delete-synthetic-tests.js';
import { datadogGetSyntheticTestResults } from './tools/synthetics/get-synthetic-test-results.js';
import { datadogTriggerSyntheticTests } from './tools/synthetics/trigger-synthetic-tests.js';
import { datadogListSyntheticLocations } from './tools/synthetics/list-synthetic-locations.js';

// Import incidents tools
import { datadogCreateIncident } from './tools/incidents/create-incident.js';
import { datadogGetIncident } from './tools/incidents/get-incident.js';
import { datadogListIncidents } from './tools/incidents/list-incidents.js';
import { datadogUpdateIncident } from './tools/incidents/update-incident.js';
import { datadogDeleteIncident } from './tools/incidents/delete-incident.js';

// Import incident-services tools
import { createIncidentService } from './tools/incident-services/create-incident-service.js';
import { getIncidentService } from './tools/incident-services/get-incident-service.js';
import { listIncidentServices } from './tools/incident-services/list-incident-services.js';
import { updateIncidentService } from './tools/incident-services/update-incident-service.js';
import { deleteIncidentService } from './tools/incident-services/delete-incident-service.js';

// Import incident-teams tools
import { createIncidentTeam } from './tools/incident-teams/create-incident-team.js';
import { getIncidentTeam } from './tools/incident-teams/get-incident-team.js';
import { listIncidentTeams } from './tools/incident-teams/list-incident-teams.js';
import { updateIncidentTeam } from './tools/incident-teams/update-incident-team.js';
import { deleteIncidentTeam } from './tools/incident-teams/delete-incident-team.js';

// Import users tools
import { datadogCreateUser } from './tools/users/create-user.js';
import { datadogGetUser } from './tools/users/get-user.js';
import { datadogListUsers } from './tools/users/list-users.js';
import { datadogUpdateUser } from './tools/users/update-user.js';
import { datadogDisableUser } from './tools/users/disable-user.js';

// Import roles tools
import { datadogCreateRole } from './tools/roles/create-role.js';
import { datadogGetRole } from './tools/roles/get-role.js';
import { datadogListRoles } from './tools/roles/list-roles.js';
import { datadogUpdateRole } from './tools/roles/update-role.js';
import { datadogDeleteRole } from './tools/roles/delete-role.js';

// Import tags tools
import { datadogCreateHostTags } from './tools/tags/create-host-tags.js';
import { datadogListHostTags } from './tools/tags/list-host-tags.js';
import { datadogDeleteHostTags } from './tools/tags/delete-host-tags.js';

// Import hosts tools
import { datadogListHosts } from './tools/hosts/list-hosts.js';
import { datadogGetHostTotals } from './tools/hosts/get-host-totals.js';
import { datadogMuteHost } from './tools/hosts/mute-host.js';
import { datadogUnmuteHost } from './tools/hosts/unmute-host.js';

// Import logs tools
import { datadogAggregateLogs } from './tools/logs/aggregate-logs.js';
import { datadogCreateLogsArchive } from './tools/logs/create-logs-archive.js';
import { datadogListLogsArchives } from './tools/logs/list-logs-archives.js';
import { datadogListLogsIndexes } from './tools/logs/list-logs-indexes.js';
import { datadogListLogsMetrics } from './tools/logs/list-logs-metrics.js';
import { datadogListLogsPipelines } from './tools/logs/list-logs-pipelines.js';

// Import metrics tools
import { datadogGetMetricMetadata } from './tools/metrics/get-metric-metadata.js';
import { datadogListActiveMetrics } from './tools/metrics/list-active-metrics.js';
import { datadogUpdateMetricMetadata } from './tools/metrics/update-metric-metadata.js';

// Import organizations tools
import { getOrganization } from './tools/organizations/get-organization.js';
import { listOrganizations } from './tools/organizations/list-organizations.js';
import { updateOrganization } from './tools/organizations/update-organization.js';

// Import teams tools
import { createTeam } from './tools/teams/create-team.js';
import { getTeam } from './tools/teams/get-team.js';
import { listTeams } from './tools/teams/list-teams.js';
import { updateTeam } from './tools/teams/update-team.js';
import { deleteTeam } from './tools/teams/delete-team.js';

// Import cloud-integrations tools
import { createAwsAccount } from './tools/cloud-integrations/create-aws-account.js';
import { listAwsAccounts } from './tools/cloud-integrations/list-aws-accounts.js';
import { deleteAwsAccount } from './tools/cloud-integrations/delete-aws-account.js';
import { createAzureIntegration } from './tools/cloud-integrations/create-azure-integration.js';
import { listAzureIntegrations } from './tools/cloud-integrations/list-azure-integrations.js';
import { createGcpIntegration } from './tools/cloud-integrations/create-gcp-integration.js';
import { listGcpIntegrations } from './tools/cloud-integrations/list-gcp-integrations.js';

// Import security-monitoring tools
import { createSecurityRule } from './tools/security-monitoring/create-security-rule.js';
import { getSecurityRule } from './tools/security-monitoring/get-security-rule.js';
import { listSecurityRules } from './tools/security-monitoring/list-security-rules.js';
import { updateSecurityRule } from './tools/security-monitoring/update-security-rule.js';
import { deleteSecurityRule } from './tools/security-monitoring/delete-security-rule.js';

// Import RUM tools
import { createRumApplication } from './tools/rum/create-rum-application.js';
import { getRumApplication } from './tools/rum/get-rum-application.js';
import { listRumApplications } from './tools/rum/list-rum-applications.js';
import { updateRumApplication } from './tools/rum/update-rum-application.js';
import { deleteRumApplication } from './tools/rum/delete-rum-application.js';

// Import dashboard-lists tools
import { createDashboardList } from './tools/dashboard-lists/create-dashboard-list.js';
import { getDashboardList } from './tools/dashboard-lists/get-dashboard-list.js';
import { listDashboardLists } from './tools/dashboard-lists/list-dashboard-lists.js';
import { updateDashboardList } from './tools/dashboard-lists/update-dashboard-list.js';
import { deleteDashboardList } from './tools/dashboard-lists/delete-dashboard-list.js';

// Import key-management tools
import { createApiKey } from './tools/key-management/create-api-key.js';
import { getApiKey } from './tools/key-management/get-api-key.js';
import { listApiKeys } from './tools/key-management/list-api-keys.js';
import { updateApiKey } from './tools/key-management/update-api-key.js';
import { deleteApiKey } from './tools/key-management/delete-api-key.js';
import { getApplicationKey } from './tools/key-management/get-application-key.js';
import { listApplicationKeys } from './tools/key-management/list-application-keys.js';
import { updateApplicationKey } from './tools/key-management/update-application-key.js';
import { deleteApplicationKey } from './tools/key-management/delete-application-key.js';

// Import notebooks tools
import { createNotebook } from './tools/notebooks/create-notebook.js';
import { getNotebook } from './tools/notebooks/get-notebook.js';
import { listNotebooks } from './tools/notebooks/list-notebooks.js';
import { updateNotebook } from './tools/notebooks/update-notebook.js';
import { deleteNotebook } from './tools/notebooks/delete-notebook.js';

// Import webhooks tools
import { createWebhook } from './tools/webhooks/create-webhook.js';
import { getWebhook } from './tools/webhooks/get-webhook.js';
import { updateWebhook } from './tools/webhooks/update-webhook.js';
import { deleteWebhook } from './tools/webhooks/delete-webhook.js';

// Import usage tools
import { getUsageHosts } from './tools/usage/get-usage-hosts.js';
import { getUsageLogs } from './tools/usage/get-usage-logs.js';
import { getUsageSummary } from './tools/usage/get-usage-summary.js';
import { getUsageTimeseries } from './tools/usage/get-usage-timeseries.js';

// Import apm-retention-filters tools
import { createApmRetentionFilter } from './tools/apm-retention-filters/create-apm-retention-filter.js';
import { getApmRetentionFilter } from './tools/apm-retention-filters/get-apm-retention-filter.js';
import { listApmRetentionFilters } from './tools/apm-retention-filters/list-apm-retention-filters.js';
import { updateApmRetentionFilter } from './tools/apm-retention-filters/update-apm-retention-filter.js';
import { deleteApmRetentionFilter } from './tools/apm-retention-filters/delete-apm-retention-filter.js';

// Import new tools
import { getEvent } from './tools/events/get-event.js';
import { submitServiceCheck } from './tools/service-checks/submit-service-check.js';
import { getHostTags } from './tools/tags/get-host-tags.js';
import { updateHostTags } from './tools/tags/update-host-tags.js';
import { searchSlo } from './tools/slos/search-slo.js';
import { getLogsArchive } from './tools/logs/get-logs-archive.js';
import { updateLogsArchive } from './tools/logs/update-logs-archive.js';
import { deleteLogsArchive } from './tools/logs/delete-logs-archive.js';
import { createLogsPipeline } from './tools/logs/create-logs-pipeline.js';
import { getLogsPipeline } from './tools/logs/get-logs-pipeline.js';
import { updateLogsPipeline } from './tools/logs/update-logs-pipeline.js';
import { deleteLogsPipeline } from './tools/logs/delete-logs-pipeline.js';
import { getLogsIndex } from './tools/logs/get-logs-index.js';
import { updateLogsIndex } from './tools/logs/update-logs-index.js';
import { createLogsMetric } from './tools/logs/create-logs-metric.js';
import { getLogsMetric } from './tools/logs/get-logs-metric.js';
import { updateLogsMetric } from './tools/logs/update-logs-metric.js';
import { deleteLogsMetric } from './tools/logs/delete-logs-metric.js';
import { searchIncidents } from './tools/incidents/search-incidents.js';
import { listRolePermissions } from './tools/roles/list-role-permissions.js';
import { addPermissionToRole } from './tools/roles/add-permission-to-role.js';
import { removePermissionFromRole } from './tools/roles/remove-permission-from-role.js';
import { listRoleUsers } from './tools/roles/list-role-users.js';
import { listAwsLogServices } from './tools/cloud-integrations/list-aws-log-services.js';
import { enableAwsLogServices } from './tools/cloud-integrations/enable-aws-log-services.js';
import { deleteAzureIntegration } from './tools/cloud-integrations/delete-azure-integration.js';
import { updateAzureIntegration } from './tools/cloud-integrations/update-azure-integration.js';
import { updateAzureHostFilters } from './tools/cloud-integrations/update-azure-host-filters.js';
import { deleteGcpIntegration } from './tools/cloud-integrations/delete-gcp-integration.js';
import { updateGcpIntegration } from './tools/cloud-integrations/update-gcp-integration.js';
import { listSecuritySignals } from './tools/security-monitoring/list-security-signals.js';
import { searchRumEvents } from './tools/rum/search-rum-events.js';
import { aggregateRumEvents } from './tools/rum/aggregate-rum-events.js';
import { createOrUpdateServiceDefinition } from './tools/services/create-or-update-service-definition.js';
import { deleteServiceDefinition } from './tools/services/delete-service-definition.js';
import { getUsageTopAvgMetrics } from './tools/usage/get-usage-top-avg-metrics.js';

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
    name: 'datadog_update_monitor',
    description: 'Update an existing Datadog monitor',
    inputSchema: {
      type: 'object',
      properties: {
        monitorId: {
          type: 'number',
          description: 'Monitor ID'
        },
        body: {
          type: 'object',
          description: 'Monitor configuration object',
          additionalProperties: true
        }
      },
      required: ['monitorId', 'body']
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
    name: 'datadog_validate_monitor',
    description: 'Validate a monitor configuration before creating or updating',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Monitor configuration to validate',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_search_monitors',
    description: 'Search for monitors using a query',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query'
        },
        page: {
          type: 'number',
          description: 'Page number for pagination'
        },
        perPage: {
          type: 'number',
          description: 'Results per page'
        },
        sort: {
          type: 'string',
          description: 'Sort field and direction'
        }
      },
      required: []
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
    name: 'datadog_create_dashboard',
    description: 'Create a new Datadog dashboard',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Dashboard configuration object',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_update_dashboard',
    description: 'Update an existing Datadog dashboard',
    inputSchema: {
      type: 'object',
      properties: {
        dashboardId: {
          type: 'string',
          description: 'Dashboard ID'
        },
        body: {
          type: 'object',
          description: 'Dashboard configuration object',
          additionalProperties: true
        }
      },
      required: ['dashboardId', 'body']
    }
  },
  {
    name: 'datadog_delete_dashboard',
    description: 'Delete a dashboard',
    inputSchema: {
      type: 'object',
      properties: {
        dashboardId: {
          type: 'string',
          description: 'Dashboard ID to delete'
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
    name: 'datadog_list_active_metrics',
    description: 'List active metrics from Datadog',
    inputSchema: {
      type: 'object',
      properties: {
        from: {
          type: 'number',
          description: 'Unix timestamp for start of query'
        },
        host: {
          type: 'string',
          description: 'Filter metrics by hostname'
        }
      },
      required: ['from']
    }
  },
  {
    name: 'datadog_get_metric_metadata',
    description: 'Get metadata for a specific metric',
    inputSchema: {
      type: 'object',
      properties: {
        metricName: {
          type: 'string',
          description: 'Name of the metric'
        }
      },
      required: ['metricName']
    }
  },
  {
    name: 'datadog_update_metric_metadata',
    description: 'Update metadata for a specific metric',
    inputSchema: {
      type: 'object',
      properties: {
        metricName: {
          type: 'string',
          description: 'Name of the metric'
        },
        body: {
          type: 'object',
          description: 'Metadata object',
          additionalProperties: true
        }
      },
      required: ['metricName', 'body']
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
    name: 'datadog_aggregate_logs',
    description: 'Aggregate logs with complex queries',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Log aggregation request body',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_create_logs_archive',
    description: 'Create a logs archive configuration',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Archive configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_list_logs_archives',
    description: 'List all logs archive configurations',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_list_logs_indexes',
    description: 'List all logs indexes',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_list_logs_metrics',
    description: 'List all log-based metrics',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_list_logs_pipelines',
    description: 'List all logs processing pipelines',
    inputSchema: {
      type: 'object',
      properties: {},
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
  },
  {
    name: 'datadog_create_downtime',
    description: 'Create a new scheduled downtime',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Downtime configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_downtime',
    description: 'Get details of a specific downtime',
    inputSchema: {
      type: 'object',
      properties: {
        downtimeId: {
          type: 'number',
          description: 'Downtime ID'
        }
      },
      required: ['downtimeId']
    }
  },
  {
    name: 'datadog_update_downtime',
    description: 'Update an existing downtime',
    inputSchema: {
      type: 'object',
      properties: {
        downtimeId: {
          type: 'number',
          description: 'Downtime ID'
        },
        body: {
          type: 'object',
          description: 'Downtime configuration',
          additionalProperties: true
        }
      },
      required: ['downtimeId', 'body']
    }
  },
  {
    name: 'datadog_cancel_downtime',
    description: 'Cancel a scheduled downtime',
    inputSchema: {
      type: 'object',
      properties: {
        downtimeId: {
          type: 'number',
          description: 'Downtime ID to cancel'
        }
      },
      required: ['downtimeId']
    }
  },
  {
    name: 'datadog_list_spans',
    description: 'List APM spans that match a search query (simple version with query parameters)',
    inputSchema: {
      type: 'object',
      properties: {
        filterQuery: {
          type: 'string',
          description: 'Search query following spans syntax (e.g., "service:my-service operation_name:http.request")'
        },
        filterFrom: {
          type: 'string',
          description: 'Minimum timestamp for requested spans (ISO8601, date math, or milliseconds)'
        },
        filterTo: {
          type: 'string',
          description: 'Maximum timestamp for requested spans (ISO8601, date math, or milliseconds)'
        },
        sort: {
          type: 'string',
          description: 'Order of spans in results (timestamp or -timestamp)',
          enum: ['timestamp', '-timestamp']
        },
        pageCursor: {
          type: 'string',
          description: 'Cursor for pagination from previous query'
        },
        pageLimit: {
          type: 'number',
          description: 'Maximum number of spans to return (default: 10)'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_list_spans_advanced',
    description: 'List APM spans with complex filtering using request body',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'SpansListRequest object with filter, sort, page, and options',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_aggregate_spans',
    description: 'Aggregate APM spans into buckets and compute metrics/timeseries',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'SpansAggregateRequest object with compute, filter, group_by, and options',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_list_services',
    description: 'List all service definitions from the Datadog Service Catalog',
    inputSchema: {
      type: 'object',
      properties: {
        pageSize: {
          type: 'number',
          description: 'Number of services per page (max: 100)'
        },
        pageNumber: {
          type: 'number',
          description: 'Specific page number to return'
        },
        schemaVersion: {
          type: 'string',
          description: 'Schema version desired in response (v2, v2.1, v2.2)'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_get_service',
    description: 'Get a single service definition from the Datadog Service Catalog',
    inputSchema: {
      type: 'object',
      properties: {
        serviceName: {
          type: 'string',
          description: 'Name of the service to retrieve'
        },
        schemaVersion: {
          type: 'string',
          description: 'Schema version desired in response (v2, v2.1, v2.2)'
        }
      },
      required: ['serviceName']
    }
  },
  {
    name: 'datadog_create_slo',
    description: 'Create a new Service Level Objective',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'SLO configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_slo',
    description: 'Get details of a specific SLO',
    inputSchema: {
      type: 'object',
      properties: {
        sloId: {
          type: 'string',
          description: 'SLO ID'
        }
      },
      required: ['sloId']
    }
  },
  {
    name: 'datadog_list_slos',
    description: 'List all Service Level Objectives',
    inputSchema: {
      type: 'object',
      properties: {
        ids: {
          type: 'string',
          description: 'Comma-separated list of SLO IDs to filter by'
        },
        query: {
          type: 'string',
          description: 'Query string to filter SLOs'
        },
        tagsQuery: {
          type: 'string',
          description: 'Filter SLOs by tags'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of SLOs to return'
        },
        offset: {
          type: 'number',
          description: 'Offset for pagination'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_update_slo',
    description: 'Update an existing SLO',
    inputSchema: {
      type: 'object',
      properties: {
        sloId: {
          type: 'string',
          description: 'SLO ID'
        },
        body: {
          type: 'object',
          description: 'SLO configuration',
          additionalProperties: true
        }
      },
      required: ['sloId', 'body']
    }
  },
  {
    name: 'datadog_delete_slo',
    description: 'Delete an SLO',
    inputSchema: {
      type: 'object',
      properties: {
        sloId: {
          type: 'string',
          description: 'SLO ID to delete'
        }
      },
      required: ['sloId']
    }
  },
  {
    name: 'datadog_get_slo_history',
    description: 'Get historical data for an SLO',
    inputSchema: {
      type: 'object',
      properties: {
        sloId: {
          type: 'string',
          description: 'SLO ID'
        },
        fromTs: {
          type: 'number',
          description: 'Start time (Unix timestamp)'
        },
        toTs: {
          type: 'number',
          description: 'End time (Unix timestamp)'
        }
      },
      required: ['sloId', 'fromTs', 'toTs']
    }
  },
  {
    name: 'datadog_create_synthetic_test',
    description: 'Create a new Synthetic test',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Synthetic test configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_synthetic_test',
    description: 'Get details of a specific Synthetic test',
    inputSchema: {
      type: 'object',
      properties: {
        publicId: {
          type: 'string',
          description: 'Test public ID'
        }
      },
      required: ['publicId']
    }
  },
  {
    name: 'datadog_list_synthetic_tests',
    description: 'List all Synthetic tests',
    inputSchema: {
      type: 'object',
      properties: {
        pageSize: {
          type: 'number',
          description: 'Number of tests per page'
        },
        pageNumber: {
          type: 'number',
          description: 'Page number to return'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_update_synthetic_test',
    description: 'Update an existing Synthetic test',
    inputSchema: {
      type: 'object',
      properties: {
        publicId: {
          type: 'string',
          description: 'Test public ID'
        },
        body: {
          type: 'object',
          description: 'Test configuration',
          additionalProperties: true
        }
      },
      required: ['publicId', 'body']
    }
  },
  {
    name: 'datadog_delete_synthetic_tests',
    description: 'Delete one or more Synthetic tests',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Object containing test IDs to delete',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_synthetic_test_results',
    description: 'Get results for a Synthetic test',
    inputSchema: {
      type: 'object',
      properties: {
        publicId: {
          type: 'string',
          description: 'Test public ID'
        },
        fromTs: {
          type: 'number',
          description: 'Start time (Unix timestamp)'
        },
        toTs: {
          type: 'number',
          description: 'End time (Unix timestamp)'
        }
      },
      required: ['publicId']
    }
  },
  {
    name: 'datadog_trigger_synthetic_tests',
    description: 'Trigger one or more Synthetic tests',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Object containing test IDs to trigger',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_list_synthetic_locations',
    description: 'List available Synthetic testing locations',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_create_incident',
    description: 'Create a new incident',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Incident configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_incident',
    description: 'Get details of a specific incident',
    inputSchema: {
      type: 'object',
      properties: {
        incidentId: {
          type: 'string',
          description: 'Incident ID'
        }
      },
      required: ['incidentId']
    }
  },
  {
    name: 'datadog_list_incidents',
    description: 'List all incidents',
    inputSchema: {
      type: 'object',
      properties: {
        pageSize: {
          type: 'number',
          description: 'Number of incidents per page'
        },
        pageOffset: {
          type: 'number',
          description: 'Offset for pagination'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_update_incident',
    description: 'Update an existing incident',
    inputSchema: {
      type: 'object',
      properties: {
        incidentId: {
          type: 'string',
          description: 'Incident ID'
        },
        body: {
          type: 'object',
          description: 'Incident configuration',
          additionalProperties: true
        }
      },
      required: ['incidentId', 'body']
    }
  },
  {
    name: 'datadog_delete_incident',
    description: 'Delete an incident',
    inputSchema: {
      type: 'object',
      properties: {
        incidentId: {
          type: 'string',
          description: 'Incident ID to delete'
        }
      },
      required: ['incidentId']
    }
  },
  {
    name: 'datadog_create_incident_service',
    description: 'Create a new incident service',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Incident service configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_incident_service',
    description: 'Get details of a specific incident service',
    inputSchema: {
      type: 'object',
      properties: {
        serviceId: {
          type: 'string',
          description: 'Service ID'
        }
      },
      required: ['serviceId']
    }
  },
  {
    name: 'datadog_list_incident_services',
    description: 'List all incident services',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_update_incident_service',
    description: 'Update an existing incident service',
    inputSchema: {
      type: 'object',
      properties: {
        serviceId: {
          type: 'string',
          description: 'Service ID'
        },
        body: {
          type: 'object',
          description: 'Service configuration',
          additionalProperties: true
        }
      },
      required: ['serviceId', 'body']
    }
  },
  {
    name: 'datadog_delete_incident_service',
    description: 'Delete an incident service',
    inputSchema: {
      type: 'object',
      properties: {
        serviceId: {
          type: 'string',
          description: 'Service ID to delete'
        }
      },
      required: ['serviceId']
    }
  },
  {
    name: 'datadog_create_incident_team',
    description: 'Create a new incident team',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Incident team configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_incident_team',
    description: 'Get details of a specific incident team',
    inputSchema: {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
          description: 'Team ID'
        }
      },
      required: ['teamId']
    }
  },
  {
    name: 'datadog_list_incident_teams',
    description: 'List all incident teams',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_update_incident_team',
    description: 'Update an existing incident team',
    inputSchema: {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
          description: 'Team ID'
        },
        body: {
          type: 'object',
          description: 'Team configuration',
          additionalProperties: true
        }
      },
      required: ['teamId', 'body']
    }
  },
  {
    name: 'datadog_delete_incident_team',
    description: 'Delete an incident team',
    inputSchema: {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
          description: 'Team ID to delete'
        }
      },
      required: ['teamId']
    }
  },
  {
    name: 'datadog_create_user',
    description: 'Create a new user',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'User configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_user',
    description: 'Get details of a specific user',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: 'User ID'
        }
      },
      required: ['userId']
    }
  },
  {
    name: 'datadog_list_users',
    description: 'List all users',
    inputSchema: {
      type: 'object',
      properties: {
        pageSize: {
          type: 'number',
          description: 'Number of users per page'
        },
        pageNumber: {
          type: 'number',
          description: 'Page number to return'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_update_user',
    description: 'Update an existing user',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: 'User ID'
        },
        body: {
          type: 'object',
          description: 'User configuration',
          additionalProperties: true
        }
      },
      required: ['userId', 'body']
    }
  },
  {
    name: 'datadog_disable_user',
    description: 'Disable a user account',
    inputSchema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          description: 'User ID to disable'
        }
      },
      required: ['userId']
    }
  },
  {
    name: 'datadog_create_role',
    description: 'Create a new role',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Role configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_role',
    description: 'Get details of a specific role',
    inputSchema: {
      type: 'object',
      properties: {
        roleId: {
          type: 'string',
          description: 'Role ID'
        }
      },
      required: ['roleId']
    }
  },
  {
    name: 'datadog_list_roles',
    description: 'List all roles',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_update_role',
    description: 'Update an existing role',
    inputSchema: {
      type: 'object',
      properties: {
        roleId: {
          type: 'string',
          description: 'Role ID'
        },
        body: {
          type: 'object',
          description: 'Role configuration',
          additionalProperties: true
        }
      },
      required: ['roleId', 'body']
    }
  },
  {
    name: 'datadog_delete_role',
    description: 'Delete a role',
    inputSchema: {
      type: 'object',
      properties: {
        roleId: {
          type: 'string',
          description: 'Role ID to delete'
        }
      },
      required: ['roleId']
    }
  },
  {
    name: 'datadog_create_host_tags',
    description: 'Create or update tags for a host',
    inputSchema: {
      type: 'object',
      properties: {
        hostName: {
          type: 'string',
          description: 'Hostname'
        },
        body: {
          type: 'object',
          description: 'Tags configuration',
          additionalProperties: true
        }
      },
      required: ['hostName', 'body']
    }
  },
  {
    name: 'datadog_list_host_tags',
    description: 'List all host tags',
    inputSchema: {
      type: 'object',
      properties: {
        source: {
          type: 'string',
          description: 'Filter by source'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_delete_host_tags',
    description: 'Delete all tags for a host',
    inputSchema: {
      type: 'object',
      properties: {
        hostName: {
          type: 'string',
          description: 'Hostname'
        }
      },
      required: ['hostName']
    }
  },
  {
    name: 'datadog_list_hosts',
    description: 'List all hosts',
    inputSchema: {
      type: 'object',
      properties: {
        filter: {
          type: 'string',
          description: 'Filter hosts by tag or name'
        },
        from: {
          type: 'number',
          description: 'Start time (Unix timestamp)'
        },
        count: {
          type: 'number',
          description: 'Number of hosts to return'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_get_host_totals',
    description: 'Get total number of active hosts',
    inputSchema: {
      type: 'object',
      properties: {
        from: {
          type: 'number',
          description: 'Unix timestamp for start of query'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_mute_host',
    description: 'Mute a host',
    inputSchema: {
      type: 'object',
      properties: {
        hostName: {
          type: 'string',
          description: 'Hostname to mute'
        },
        body: {
          type: 'object',
          description: 'Mute configuration',
          additionalProperties: true
        }
      },
      required: ['hostName', 'body']
    }
  },
  {
    name: 'datadog_unmute_host',
    description: 'Unmute a host',
    inputSchema: {
      type: 'object',
      properties: {
        hostName: {
          type: 'string',
          description: 'Hostname to unmute'
        }
      },
      required: ['hostName']
    }
  },
  {
    name: 'datadog_get_organization',
    description: 'Get details of a specific organization',
    inputSchema: {
      type: 'object',
      properties: {
        publicId: {
          type: 'string',
          description: 'Organization public ID'
        }
      },
      required: ['publicId']
    }
  },
  {
    name: 'datadog_list_organizations',
    description: 'List all organizations',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_update_organization',
    description: 'Update an organization',
    inputSchema: {
      type: 'object',
      properties: {
        publicId: {
          type: 'string',
          description: 'Organization public ID'
        },
        body: {
          type: 'object',
          description: 'Organization configuration',
          additionalProperties: true
        }
      },
      required: ['publicId', 'body']
    }
  },
  {
    name: 'datadog_create_team',
    description: 'Create a new team',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Team configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_team',
    description: 'Get details of a specific team',
    inputSchema: {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
          description: 'Team ID'
        }
      },
      required: ['teamId']
    }
  },
  {
    name: 'datadog_list_teams',
    description: 'List all teams',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_update_team',
    description: 'Update an existing team',
    inputSchema: {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
          description: 'Team ID'
        },
        body: {
          type: 'object',
          description: 'Team configuration',
          additionalProperties: true
        }
      },
      required: ['teamId', 'body']
    }
  },
  {
    name: 'datadog_delete_team',
    description: 'Delete a team',
    inputSchema: {
      type: 'object',
      properties: {
        teamId: {
          type: 'string',
          description: 'Team ID to delete'
        }
      },
      required: ['teamId']
    }
  },
  {
    name: 'datadog_create_aws_account',
    description: 'Create an AWS integration',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'AWS account configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_list_aws_accounts',
    description: 'List all AWS integrations',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_delete_aws_account',
    description: 'Delete an AWS integration',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'AWS account to delete',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_create_azure_integration',
    description: 'Create an Azure integration',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Azure integration configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_list_azure_integrations',
    description: 'List all Azure integrations',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_create_gcp_integration',
    description: 'Create a GCP integration',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'GCP integration configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_list_gcp_integrations',
    description: 'List all GCP integrations',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_create_security_rule',
    description: 'Create a new security monitoring rule',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Security rule configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_security_rule',
    description: 'Get details of a specific security monitoring rule',
    inputSchema: {
      type: 'object',
      properties: {
        ruleId: {
          type: 'string',
          description: 'Rule ID'
        }
      },
      required: ['ruleId']
    }
  },
  {
    name: 'datadog_list_security_rules',
    description: 'List all security monitoring rules',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_update_security_rule',
    description: 'Update an existing security monitoring rule',
    inputSchema: {
      type: 'object',
      properties: {
        ruleId: {
          type: 'string',
          description: 'Rule ID'
        },
        body: {
          type: 'object',
          description: 'Security rule configuration',
          additionalProperties: true
        }
      },
      required: ['ruleId', 'body']
    }
  },
  {
    name: 'datadog_delete_security_rule',
    description: 'Delete a security monitoring rule',
    inputSchema: {
      type: 'object',
      properties: {
        ruleId: {
          type: 'string',
          description: 'Rule ID to delete'
        }
      },
      required: ['ruleId']
    }
  },
  {
    name: 'datadog_create_rum_application',
    description: 'Create a new RUM application',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'RUM application configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_rum_application',
    description: 'Get details of a specific RUM application',
    inputSchema: {
      type: 'object',
      properties: {
        applicationId: {
          type: 'string',
          description: 'Application ID'
        }
      },
      required: ['applicationId']
    }
  },
  {
    name: 'datadog_list_rum_applications',
    description: 'List all RUM applications',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_update_rum_application',
    description: 'Update an existing RUM application',
    inputSchema: {
      type: 'object',
      properties: {
        applicationId: {
          type: 'string',
          description: 'Application ID'
        },
        body: {
          type: 'object',
          description: 'RUM application configuration',
          additionalProperties: true
        }
      },
      required: ['applicationId', 'body']
    }
  },
  {
    name: 'datadog_delete_rum_application',
    description: 'Delete a RUM application',
    inputSchema: {
      type: 'object',
      properties: {
        applicationId: {
          type: 'string',
          description: 'Application ID to delete'
        }
      },
      required: ['applicationId']
    }
  },
  {
    name: 'datadog_create_dashboard_list',
    description: 'Create a new dashboard list',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Dashboard list configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_dashboard_list',
    description: 'Get details of a specific dashboard list',
    inputSchema: {
      type: 'object',
      properties: {
        listId: {
          type: 'number',
          description: 'Dashboard list ID'
        }
      },
      required: ['listId']
    }
  },
  {
    name: 'datadog_list_dashboard_lists',
    description: 'List all dashboard lists',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_update_dashboard_list',
    description: 'Update an existing dashboard list',
    inputSchema: {
      type: 'object',
      properties: {
        listId: {
          type: 'number',
          description: 'Dashboard list ID'
        },
        body: {
          type: 'object',
          description: 'Dashboard list configuration',
          additionalProperties: true
        }
      },
      required: ['listId', 'body']
    }
  },
  {
    name: 'datadog_delete_dashboard_list',
    description: 'Delete a dashboard list',
    inputSchema: {
      type: 'object',
      properties: {
        listId: {
          type: 'number',
          description: 'Dashboard list ID to delete'
        }
      },
      required: ['listId']
    }
  },
  {
    name: 'datadog_create_api_key',
    description: 'Create a new API key',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'API key configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_api_key',
    description: 'Get details of a specific API key',
    inputSchema: {
      type: 'object',
      properties: {
        keyId: {
          type: 'string',
          description: 'API key ID'
        }
      },
      required: ['keyId']
    }
  },
  {
    name: 'datadog_list_api_keys',
    description: 'List all API keys',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_update_api_key',
    description: 'Update an existing API key',
    inputSchema: {
      type: 'object',
      properties: {
        keyId: {
          type: 'string',
          description: 'API key ID'
        },
        body: {
          type: 'object',
          description: 'API key configuration',
          additionalProperties: true
        }
      },
      required: ['keyId', 'body']
    }
  },
  {
    name: 'datadog_delete_api_key',
    description: 'Delete an API key',
    inputSchema: {
      type: 'object',
      properties: {
        keyId: {
          type: 'string',
          description: 'API key ID to delete'
        }
      },
      required: ['keyId']
    }
  },
  {
    name: 'datadog_get_application_key',
    description: 'Get details of a specific application key',
    inputSchema: {
      type: 'object',
      properties: {
        keyId: {
          type: 'string',
          description: 'Application key ID'
        }
      },
      required: ['keyId']
    }
  },
  {
    name: 'datadog_list_application_keys',
    description: 'List all application keys',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_update_application_key',
    description: 'Update an existing application key',
    inputSchema: {
      type: 'object',
      properties: {
        keyId: {
          type: 'string',
          description: 'Application key ID'
        },
        body: {
          type: 'object',
          description: 'Application key configuration',
          additionalProperties: true
        }
      },
      required: ['keyId', 'body']
    }
  },
  {
    name: 'datadog_delete_application_key',
    description: 'Delete an application key',
    inputSchema: {
      type: 'object',
      properties: {
        keyId: {
          type: 'string',
          description: 'Application key ID to delete'
        }
      },
      required: ['keyId']
    }
  },
  {
    name: 'datadog_create_notebook',
    description: 'Create a new notebook',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Notebook configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_notebook',
    description: 'Get details of a specific notebook',
    inputSchema: {
      type: 'object',
      properties: {
        notebookId: {
          type: 'number',
          description: 'Notebook ID'
        }
      },
      required: ['notebookId']
    }
  },
  {
    name: 'datadog_list_notebooks',
    description: 'List all notebooks',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_update_notebook',
    description: 'Update an existing notebook',
    inputSchema: {
      type: 'object',
      properties: {
        notebookId: {
          type: 'number',
          description: 'Notebook ID'
        },
        body: {
          type: 'object',
          description: 'Notebook configuration',
          additionalProperties: true
        }
      },
      required: ['notebookId', 'body']
    }
  },
  {
    name: 'datadog_delete_notebook',
    description: 'Delete a notebook',
    inputSchema: {
      type: 'object',
      properties: {
        notebookId: {
          type: 'number',
          description: 'Notebook ID to delete'
        }
      },
      required: ['notebookId']
    }
  },
  {
    name: 'datadog_create_webhook',
    description: 'Create a new webhook integration',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Webhook configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_webhook',
    description: 'Get details of a specific webhook',
    inputSchema: {
      type: 'object',
      properties: {
        webhookName: {
          type: 'string',
          description: 'Webhook name'
        }
      },
      required: ['webhookName']
    }
  },
  {
    name: 'datadog_update_webhook',
    description: 'Update an existing webhook',
    inputSchema: {
      type: 'object',
      properties: {
        webhookName: {
          type: 'string',
          description: 'Webhook name'
        },
        body: {
          type: 'object',
          description: 'Webhook configuration',
          additionalProperties: true
        }
      },
      required: ['webhookName', 'body']
    }
  },
  {
    name: 'datadog_delete_webhook',
    description: 'Delete a webhook',
    inputSchema: {
      type: 'object',
      properties: {
        webhookName: {
          type: 'string',
          description: 'Webhook name to delete'
        }
      },
      required: ['webhookName']
    }
  },
  {
    name: 'datadog_get_usage_hosts',
    description: 'Get host usage data',
    inputSchema: {
      type: 'object',
      properties: {
        startHr: {
          type: 'string',
          description: 'Start date (ISO 8601)'
        },
        endHr: {
          type: 'string',
          description: 'End date (ISO 8601)'
        }
      },
      required: ['startHr']
    }
  },
  {
    name: 'datadog_get_usage_logs',
    description: 'Get logs usage data',
    inputSchema: {
      type: 'object',
      properties: {
        startHr: {
          type: 'string',
          description: 'Start date (ISO 8601)'
        },
        endHr: {
          type: 'string',
          description: 'End date (ISO 8601)'
        }
      },
      required: ['startHr']
    }
  },
  {
    name: 'datadog_get_usage_summary',
    description: 'Get usage summary across all products',
    inputSchema: {
      type: 'object',
      properties: {
        startMonth: {
          type: 'string',
          description: 'Start month (ISO 8601)'
        },
        endMonth: {
          type: 'string',
          description: 'End month (ISO 8601)'
        }
      },
      required: ['startMonth']
    }
  },
  {
    name: 'datadog_get_usage_timeseries',
    description: 'Get usage timeseries data',
    inputSchema: {
      type: 'object',
      properties: {
        startHr: {
          type: 'string',
          description: 'Start date (ISO 8601)'
        },
        endHr: {
          type: 'string',
          description: 'End date (ISO 8601)'
        }
      },
      required: ['startHr']
    }
  },
  {
    name: 'datadog_create_apm_retention_filter',
    description: 'Create a new APM retention filter',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Retention filter configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_apm_retention_filter',
    description: 'Get details of a specific APM retention filter',
    inputSchema: {
      type: 'object',
      properties: {
        filterId: {
          type: 'string',
          description: 'Filter ID'
        }
      },
      required: ['filterId']
    }
  },
  {
    name: 'datadog_list_apm_retention_filters',
    description: 'List all APM retention filters',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_update_apm_retention_filter',
    description: 'Update an existing APM retention filter',
    inputSchema: {
      type: 'object',
      properties: {
        filterId: {
          type: 'string',
          description: 'Filter ID'
        },
        body: {
          type: 'object',
          description: 'Retention filter configuration',
          additionalProperties: true
        }
      },
      required: ['filterId', 'body']
    }
  },
  {
    name: 'datadog_delete_apm_retention_filter',
    description: 'Delete an APM retention filter',
    inputSchema: {
      type: 'object',
      properties: {
        filterId: {
          type: 'string',
          description: 'Filter ID to delete'
        }
      },
      required: ['filterId']
    }
  },
  {
    name: 'datadog_get_event',
    description: 'Get details of a specific event',
    inputSchema: {
      type: 'object',
      properties: {
        eventId: {
          type: 'number',
          description: 'Event ID'
        }
      },
      required: ['eventId']
    }
  },
  {
    name: 'datadog_submit_service_check',
    description: 'Submit service check results to Datadog',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'array',
          description: 'Array of service check objects',
          items: {
            type: 'object',
            additionalProperties: true
          }
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_host_tags',
    description: 'Get tags for a specific host',
    inputSchema: {
      type: 'object',
      properties: {
        hostName: {
          type: 'string',
          description: 'Hostname'
        }
      },
      required: ['hostName']
    }
  },
  {
    name: 'datadog_update_host_tags',
    description: 'Update tags for a specific host',
    inputSchema: {
      type: 'object',
      properties: {
        hostName: {
          type: 'string',
          description: 'Hostname'
        },
        body: {
          type: 'object',
          description: 'Host tags configuration',
          additionalProperties: true
        }
      },
      required: ['hostName', 'body']
    }
  },
  {
    name: 'datadog_search_slo',
    description: 'Search for Service Level Objectives',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query string'
        },
        pageSize: {
          type: 'number',
          description: 'Number of SLOs per page'
        },
        pageNumber: {
          type: 'number',
          description: 'Page number to return'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_get_logs_archive',
    description: 'Get details of a specific logs archive',
    inputSchema: {
      type: 'object',
      properties: {
        archiveId: {
          type: 'string',
          description: 'Archive ID'
        }
      },
      required: ['archiveId']
    }
  },
  {
    name: 'datadog_update_logs_archive',
    description: 'Update an existing logs archive',
    inputSchema: {
      type: 'object',
      properties: {
        archiveId: {
          type: 'string',
          description: 'Archive ID'
        },
        body: {
          type: 'object',
          description: 'Archive configuration',
          additionalProperties: true
        }
      },
      required: ['archiveId', 'body']
    }
  },
  {
    name: 'datadog_delete_logs_archive',
    description: 'Delete a logs archive',
    inputSchema: {
      type: 'object',
      properties: {
        archiveId: {
          type: 'string',
          description: 'Archive ID to delete'
        }
      },
      required: ['archiveId']
    }
  },
  {
    name: 'datadog_create_logs_pipeline',
    description: 'Create a new logs processing pipeline',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Pipeline configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_logs_pipeline',
    description: 'Get details of a specific logs pipeline',
    inputSchema: {
      type: 'object',
      properties: {
        pipelineId: {
          type: 'string',
          description: 'Pipeline ID'
        }
      },
      required: ['pipelineId']
    }
  },
  {
    name: 'datadog_update_logs_pipeline',
    description: 'Update an existing logs pipeline',
    inputSchema: {
      type: 'object',
      properties: {
        pipelineId: {
          type: 'string',
          description: 'Pipeline ID'
        },
        body: {
          type: 'object',
          description: 'Pipeline configuration',
          additionalProperties: true
        }
      },
      required: ['pipelineId', 'body']
    }
  },
  {
    name: 'datadog_delete_logs_pipeline',
    description: 'Delete a logs pipeline',
    inputSchema: {
      type: 'object',
      properties: {
        pipelineId: {
          type: 'string',
          description: 'Pipeline ID to delete'
        }
      },
      required: ['pipelineId']
    }
  },
  {
    name: 'datadog_get_logs_index',
    description: 'Get details of a specific logs index',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Index name'
        }
      },
      required: ['name']
    }
  },
  {
    name: 'datadog_update_logs_index',
    description: 'Update an existing logs index',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Index name'
        },
        body: {
          type: 'object',
          description: 'Index configuration',
          additionalProperties: true
        }
      },
      required: ['name', 'body']
    }
  },
  {
    name: 'datadog_create_logs_metric',
    description: 'Create a new log-based metric',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Logs metric configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_get_logs_metric',
    description: 'Get details of a specific log-based metric',
    inputSchema: {
      type: 'object',
      properties: {
        metricId: {
          type: 'string',
          description: 'Metric ID'
        }
      },
      required: ['metricId']
    }
  },
  {
    name: 'datadog_update_logs_metric',
    description: 'Update an existing log-based metric',
    inputSchema: {
      type: 'object',
      properties: {
        metricId: {
          type: 'string',
          description: 'Metric ID'
        },
        body: {
          type: 'object',
          description: 'Logs metric configuration',
          additionalProperties: true
        }
      },
      required: ['metricId', 'body']
    }
  },
  {
    name: 'datadog_delete_logs_metric',
    description: 'Delete a log-based metric',
    inputSchema: {
      type: 'object',
      properties: {
        metricId: {
          type: 'string',
          description: 'Metric ID to delete'
        }
      },
      required: ['metricId']
    }
  },
  {
    name: 'datadog_search_incidents',
    description: 'Search for incidents using a query',
    inputSchema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Search query string'
        }
      },
      required: ['query']
    }
  },
  {
    name: 'datadog_list_role_permissions',
    description: 'List all permissions for a specific role',
    inputSchema: {
      type: 'object',
      properties: {
        roleId: {
          type: 'string',
          description: 'Role ID'
        }
      },
      required: ['roleId']
    }
  },
  {
    name: 'datadog_add_permission_to_role',
    description: 'Add a permission to a role',
    inputSchema: {
      type: 'object',
      properties: {
        roleId: {
          type: 'string',
          description: 'Role ID'
        },
        body: {
          type: 'object',
          description: 'Permission relationship object',
          additionalProperties: true
        }
      },
      required: ['roleId', 'body']
    }
  },
  {
    name: 'datadog_remove_permission_from_role',
    description: 'Remove a permission from a role',
    inputSchema: {
      type: 'object',
      properties: {
        roleId: {
          type: 'string',
          description: 'Role ID'
        },
        body: {
          type: 'object',
          description: 'Permission relationship object',
          additionalProperties: true
        }
      },
      required: ['roleId', 'body']
    }
  },
  {
    name: 'datadog_list_role_users',
    description: 'List all users assigned to a specific role',
    inputSchema: {
      type: 'object',
      properties: {
        roleId: {
          type: 'string',
          description: 'Role ID'
        },
        pageSize: {
          type: 'number',
          description: 'Number of users per page'
        },
        pageNumber: {
          type: 'number',
          description: 'Page number to return'
        },
        sort: {
          type: 'string',
          description: 'Sort field'
        },
        sortDir: {
          type: 'string',
          description: 'Sort direction (asc or desc)'
        },
        filter: {
          type: 'string',
          description: 'Filter query'
        }
      },
      required: ['roleId']
    }
  },
  {
    name: 'datadog_list_aws_log_services',
    description: 'List available AWS log services that can be enabled',
    inputSchema: {
      type: 'object',
      properties: {},
      required: []
    }
  },
  {
    name: 'datadog_enable_aws_log_services',
    description: 'Enable AWS log collection for specific services',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'AWS log services configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_delete_azure_integration',
    description: 'Delete an Azure integration',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Azure account to delete',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_update_azure_integration',
    description: 'Update an existing Azure integration',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Azure integration configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_update_azure_host_filters',
    description: 'Update host filters for an Azure integration',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Azure host filters configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_delete_gcp_integration',
    description: 'Delete a GCP integration',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'GCP account to delete',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_update_gcp_integration',
    description: 'Update an existing GCP integration',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'GCP integration configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_list_security_signals',
    description: 'List security monitoring signals',
    inputSchema: {
      type: 'object',
      properties: {
        filterQuery: {
          type: 'string',
          description: 'Search query to filter signals'
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
          description: 'Sort order'
        },
        pageCursor: {
          type: 'string',
          description: 'Cursor for pagination'
        },
        pageLimit: {
          type: 'number',
          description: 'Maximum number of signals to return'
        }
      },
      required: []
    }
  },
  {
    name: 'datadog_search_rum_events',
    description: 'Search for RUM events',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'RUM search request configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_aggregate_rum_events',
    description: 'Aggregate RUM events',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'RUM aggregation request configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_create_or_update_service_definition',
    description: 'Create or update a service definition in the Service Catalog',
    inputSchema: {
      type: 'object',
      properties: {
        body: {
          type: 'object',
          description: 'Service definition configuration',
          additionalProperties: true
        }
      },
      required: ['body']
    }
  },
  {
    name: 'datadog_delete_service_definition',
    description: 'Delete a service definition from the Service Catalog',
    inputSchema: {
      type: 'object',
      properties: {
        serviceName: {
          type: 'string',
          description: 'Service name'
        }
      },
      required: ['serviceName']
    }
  },
  {
    name: 'datadog_get_usage_top_avg_metrics',
    description: 'Get top average custom metrics by usage',
    inputSchema: {
      type: 'object',
      properties: {
        month: {
          type: 'string',
          description: 'Month to query (ISO 8601 date format)'
        },
        day: {
          type: 'string',
          description: 'Day to query (ISO 8601 date format)'
        },
        names: {
          type: 'array',
          items: { type: 'string' },
          description: 'Filter by metric names'
        },
        limit: {
          type: 'number',
          description: 'Maximum number of metrics to return'
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
  'datadog_update_monitor': datadogUpdateMonitor,
  'datadog_delete_monitor': deleteMonitor,
  'datadog_validate_monitor': datadogValidateMonitor,
  'datadog_search_monitors': datadogSearchMonitors,
  'datadog_list_dashboards': listDashboards,
  'datadog_get_dashboard': getDashboard,
  'datadog_create_dashboard': datadogCreateDashboard,
  'datadog_update_dashboard': datadogUpdateDashboard,
  'datadog_delete_dashboard': datadogDeleteDashboard,
  'datadog_submit_metrics': submitMetrics,
  'datadog_query_metrics': queryMetrics,
  'datadog_list_active_metrics': datadogListActiveMetrics,
  'datadog_get_metric_metadata': datadogGetMetricMetadata,
  'datadog_update_metric_metadata': datadogUpdateMetricMetadata,
  'datadog_list_logs': listLogs,
  'datadog_aggregate_logs': datadogAggregateLogs,
  'datadog_create_logs_archive': datadogCreateLogsArchive,
  'datadog_list_logs_archives': datadogListLogsArchives,
  'datadog_list_logs_indexes': datadogListLogsIndexes,
  'datadog_list_logs_metrics': datadogListLogsMetrics,
  'datadog_list_logs_pipelines': datadogListLogsPipelines,
  'datadog_list_events': listEvents,
  'datadog_create_event': createEvent,
  'datadog_list_downtimes': listDowntimes,
  'datadog_create_downtime': datadogCreateDowntime,
  'datadog_get_downtime': datadogGetDowntime,
  'datadog_update_downtime': datadogUpdateDowntime,
  'datadog_cancel_downtime': datadogCancelDowntime,
  'datadog_list_spans': listSpansGet,
  'datadog_list_spans_advanced': listSpans,
  'datadog_aggregate_spans': aggregateSpans,
  'datadog_list_services': listServiceDefinitions,
  'datadog_get_service': getServiceDefinition,
  'datadog_create_slo': datadogCreateSlo,
  'datadog_get_slo': datadogGetSlo,
  'datadog_list_slos': datadogListSlos,
  'datadog_update_slo': datadogUpdateSlo,
  'datadog_delete_slo': datadogDeleteSlo,
  'datadog_get_slo_history': datadogGetSloHistory,
  'datadog_create_synthetic_test': datadogCreateSyntheticTest,
  'datadog_get_synthetic_test': datadogGetSyntheticTest,
  'datadog_list_synthetic_tests': datadogListSyntheticTests,
  'datadog_update_synthetic_test': datadogUpdateSyntheticTest,
  'datadog_delete_synthetic_tests': datadogDeleteSyntheticTests,
  'datadog_get_synthetic_test_results': datadogGetSyntheticTestResults,
  'datadog_trigger_synthetic_tests': datadogTriggerSyntheticTests,
  'datadog_list_synthetic_locations': datadogListSyntheticLocations,
  'datadog_create_incident': datadogCreateIncident,
  'datadog_get_incident': datadogGetIncident,
  'datadog_list_incidents': datadogListIncidents,
  'datadog_update_incident': datadogUpdateIncident,
  'datadog_delete_incident': datadogDeleteIncident,
  'datadog_create_incident_service': createIncidentService,
  'datadog_get_incident_service': getIncidentService,
  'datadog_list_incident_services': listIncidentServices,
  'datadog_update_incident_service': updateIncidentService,
  'datadog_delete_incident_service': deleteIncidentService,
  'datadog_create_incident_team': createIncidentTeam,
  'datadog_get_incident_team': getIncidentTeam,
  'datadog_list_incident_teams': listIncidentTeams,
  'datadog_update_incident_team': updateIncidentTeam,
  'datadog_delete_incident_team': deleteIncidentTeam,
  'datadog_create_user': datadogCreateUser,
  'datadog_get_user': datadogGetUser,
  'datadog_list_users': datadogListUsers,
  'datadog_update_user': datadogUpdateUser,
  'datadog_disable_user': datadogDisableUser,
  'datadog_create_role': datadogCreateRole,
  'datadog_get_role': datadogGetRole,
  'datadog_list_roles': datadogListRoles,
  'datadog_update_role': datadogUpdateRole,
  'datadog_delete_role': datadogDeleteRole,
  'datadog_create_host_tags': datadogCreateHostTags,
  'datadog_list_host_tags': datadogListHostTags,
  'datadog_delete_host_tags': datadogDeleteHostTags,
  'datadog_list_hosts': datadogListHosts,
  'datadog_get_host_totals': datadogGetHostTotals,
  'datadog_mute_host': datadogMuteHost,
  'datadog_unmute_host': datadogUnmuteHost,
  'datadog_get_organization': getOrganization,
  'datadog_list_organizations': listOrganizations,
  'datadog_update_organization': updateOrganization,
  'datadog_create_team': createTeam,
  'datadog_get_team': getTeam,
  'datadog_list_teams': listTeams,
  'datadog_update_team': updateTeam,
  'datadog_delete_team': deleteTeam,
  'datadog_create_aws_account': createAwsAccount,
  'datadog_list_aws_accounts': listAwsAccounts,
  'datadog_delete_aws_account': deleteAwsAccount,
  'datadog_create_azure_integration': createAzureIntegration,
  'datadog_list_azure_integrations': listAzureIntegrations,
  'datadog_create_gcp_integration': createGcpIntegration,
  'datadog_list_gcp_integrations': listGcpIntegrations,
  'datadog_create_security_rule': createSecurityRule,
  'datadog_get_security_rule': getSecurityRule,
  'datadog_list_security_rules': listSecurityRules,
  'datadog_update_security_rule': updateSecurityRule,
  'datadog_delete_security_rule': deleteSecurityRule,
  'datadog_create_rum_application': createRumApplication,
  'datadog_get_rum_application': getRumApplication,
  'datadog_list_rum_applications': listRumApplications,
  'datadog_update_rum_application': updateRumApplication,
  'datadog_delete_rum_application': deleteRumApplication,
  'datadog_create_dashboard_list': createDashboardList,
  'datadog_get_dashboard_list': getDashboardList,
  'datadog_list_dashboard_lists': listDashboardLists,
  'datadog_update_dashboard_list': updateDashboardList,
  'datadog_delete_dashboard_list': deleteDashboardList,
  'datadog_create_api_key': createApiKey,
  'datadog_get_api_key': getApiKey,
  'datadog_list_api_keys': listApiKeys,
  'datadog_update_api_key': updateApiKey,
  'datadog_delete_api_key': deleteApiKey,
  'datadog_get_application_key': getApplicationKey,
  'datadog_list_application_keys': listApplicationKeys,
  'datadog_update_application_key': updateApplicationKey,
  'datadog_delete_application_key': deleteApplicationKey,
  'datadog_create_notebook': createNotebook,
  'datadog_get_notebook': getNotebook,
  'datadog_list_notebooks': listNotebooks,
  'datadog_update_notebook': updateNotebook,
  'datadog_delete_notebook': deleteNotebook,
  'datadog_create_webhook': createWebhook,
  'datadog_get_webhook': getWebhook,
  'datadog_update_webhook': updateWebhook,
  'datadog_delete_webhook': deleteWebhook,
  'datadog_get_usage_hosts': getUsageHosts,
  'datadog_get_usage_logs': getUsageLogs,
  'datadog_get_usage_summary': getUsageSummary,
  'datadog_get_usage_timeseries': getUsageTimeseries,
  'datadog_create_apm_retention_filter': createApmRetentionFilter,
  'datadog_get_apm_retention_filter': getApmRetentionFilter,
  'datadog_list_apm_retention_filters': listApmRetentionFilters,
  'datadog_update_apm_retention_filter': updateApmRetentionFilter,
  'datadog_delete_apm_retention_filter': deleteApmRetentionFilter,
  'datadog_get_event': getEvent,
  'datadog_submit_service_check': submitServiceCheck,
  'datadog_get_host_tags': getHostTags,
  'datadog_update_host_tags': updateHostTags,
  'datadog_search_slo': searchSlo,
  'datadog_get_logs_archive': getLogsArchive,
  'datadog_update_logs_archive': updateLogsArchive,
  'datadog_delete_logs_archive': deleteLogsArchive,
  'datadog_create_logs_pipeline': createLogsPipeline,
  'datadog_get_logs_pipeline': getLogsPipeline,
  'datadog_update_logs_pipeline': updateLogsPipeline,
  'datadog_delete_logs_pipeline': deleteLogsPipeline,
  'datadog_get_logs_index': getLogsIndex,
  'datadog_update_logs_index': updateLogsIndex,
  'datadog_create_logs_metric': createLogsMetric,
  'datadog_get_logs_metric': getLogsMetric,
  'datadog_update_logs_metric': updateLogsMetric,
  'datadog_delete_logs_metric': deleteLogsMetric,
  'datadog_search_incidents': searchIncidents,
  'datadog_list_role_permissions': listRolePermissions,
  'datadog_add_permission_to_role': addPermissionToRole,
  'datadog_remove_permission_from_role': removePermissionFromRole,
  'datadog_list_role_users': listRoleUsers,
  'datadog_list_aws_log_services': listAwsLogServices,
  'datadog_enable_aws_log_services': enableAwsLogServices,
  'datadog_delete_azure_integration': deleteAzureIntegration,
  'datadog_update_azure_integration': updateAzureIntegration,
  'datadog_update_azure_host_filters': updateAzureHostFilters,
  'datadog_delete_gcp_integration': deleteGcpIntegration,
  'datadog_update_gcp_integration': updateGcpIntegration,
  'datadog_list_security_signals': listSecuritySignals,
  'datadog_search_rum_events': searchRumEvents,
  'datadog_aggregate_rum_events': aggregateRumEvents,
  'datadog_create_or_update_service_definition': createOrUpdateServiceDefinition,
  'datadog_delete_service_definition': deleteServiceDefinition,
  'datadog_get_usage_top_avg_metrics': getUsageTopAvgMetrics
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
