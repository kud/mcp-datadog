#!/usr/bin/env tsx
/**
 * Script to generate tool files for all Datadog API endpoints
 */
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface ToolDefinition {
  name: string;
  description: string;
  category: string;
  params: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  clientMethod: string;
}

const tools: ToolDefinition[] = [
  // Monitors
  {
    name: 'datadog_update_monitor',
    description: 'Update an existing monitor',
    category: 'monitors',
    clientMethod: 'updateMonitor',
    params: [
      { name: 'monitorId', type: 'number', required: true, description: 'Monitor ID' },
      { name: 'body', type: 'object', required: true, description: 'Monitor update data' }
    ]
  },
  {
    name: 'datadog_mute_monitor',
    description: 'Mute a monitor',
    category: 'monitors',
    clientMethod: 'muteMonitor',
    params: [
      { name: 'monitorId', type: 'number', required: true, description: 'Monitor ID' },
      { name: 'body', type: 'object', required: false, description: 'Mute settings' }
    ]
  },
  {
    name: 'datadog_unmute_monitor',
    description: 'Unmute a monitor',
    category: 'monitors',
    clientMethod: 'unmuteMonitor',
    params: [
      { name: 'monitorId', type: 'number', required: true, description: 'Monitor ID' }
    ]
  },
  {
    name: 'datadog_validate_monitor',
    description: 'Validate a monitor configuration',
    category: 'monitors',
    clientMethod: 'validateMonitor',
    params: [
      { name: 'body', type: 'object', required: true, description: 'Monitor configuration' }
    ]
  },
  {
    name: 'datadog_search_monitors',
    description: 'Search monitors',
    category: 'monitors',
    clientMethod: 'searchMonitors',
    params: [
      { name: 'query', type: 'string', required: false, description: 'Search query' },
      { name: 'page', type: 'number', required: false, description: 'Page number' },
      { name: 'perPage', type: 'number', required: false, description: 'Results per page' },
      { name: 'sort', type: 'string', required: false, description: 'Sort field' }
    ]
  },
  // Dashboards
  {
    name: 'datadog_create_dashboard',
    description: 'Create a new dashboard',
    category: 'dashboards',
    clientMethod: 'createDashboard',
    params: [
      { name: 'body', type: 'object', required: true, description: 'Dashboard configuration' }
    ]
  },
  {
    name: 'datadog_update_dashboard',
    description: 'Update an existing dashboard',
    category: 'dashboards',
    clientMethod: 'updateDashboard',
    params: [
      { name: 'dashboardId', type: 'string', required: true, description: 'Dashboard ID' },
      { name: 'body', type: 'object', required: true, description: 'Dashboard configuration' }
    ]
  },
  {
    name: 'datadog_delete_dashboard',
    description: 'Delete a dashboard',
    category: 'dashboards',
    clientMethod: 'deleteDashboard',
    params: [
      { name: 'dashboardId', type: 'string', required: true, description: 'Dashboard ID' }
    ]
  },
  // Downtimes
  {
    name: 'datadog_get_downtime',
    description: 'Get downtime by ID',
    category: 'downtimes',
    clientMethod: 'getDowntime',
    params: [
      { name: 'downtimeId', type: 'number', required: true, description: 'Downtime ID' }
    ]
  },
  {
    name: 'datadog_create_downtime',
    description: 'Create a scheduled downtime',
    category: 'downtimes',
    clientMethod: 'createDowntime',
    params: [
      { name: 'body', type: 'object', required: true, description: 'Downtime configuration' }
    ]
  },
  {
    name: 'datadog_update_downtime',
    description: 'Update a scheduled downtime',
    category: 'downtimes',
    clientMethod: 'updateDowntime',
    params: [
      { name: 'downtimeId', type: 'number', required: true, description: 'Downtime ID' },
      { name: 'body', type: 'object', required: true, description: 'Downtime configuration' }
    ]
  },
  {
    name: 'datadog_cancel_downtime',
    description: 'Cancel a scheduled downtime',
    category: 'downtimes',
    clientMethod: 'cancelDowntime',
    params: [
      { name: 'downtimeId', type: 'number', required: true, description: 'Downtime ID' }
    ]
  },
  // SLOs
  {
    name: 'datadog_list_slos',
    description: 'List all SLOs',
    category: 'slos',
    clientMethod: 'listSLOs',
    params: [
      { name: 'ids', type: 'string', required: false, description: 'SLO IDs' },
      { name: 'query', type: 'string', required: false, description: 'Search query' },
      { name: 'tagsQuery', type: 'string', required: false, description: 'Tags query' },
      { name: 'limit', type: 'number', required: false, description: 'Max results' },
      { name: 'offset', type: 'number', required: false, description: 'Pagination offset' }
    ]
  },
  {
    name: 'datadog_create_slo',
    description: 'Create a new SLO',
    category: 'slos',
    clientMethod: 'createSLO',
    params: [
      { name: 'body', type: 'object', required: true, description: 'SLO configuration' }
    ]
  },
  {
    name: 'datadog_get_slo',
    description: 'Get SLO details',
    category: 'slos',
    clientMethod: 'getSLO',
    params: [
      { name: 'sloId', type: 'string', required: true, description: 'SLO ID' },
      { name: 'withConfiguredAlertIds', type: 'boolean', required: false, description: 'Include alert IDs' }
    ]
  },
  {
    name: 'datadog_update_slo',
    description: 'Update an SLO',
    category: 'slos',
    clientMethod: 'updateSLO',
    params: [
      { name: 'sloId', type: 'string', required: true, description: 'SLO ID' },
      { name: 'body', type: 'object', required: true, description: 'SLO configuration' }
    ]
  },
  {
    name: 'datadog_delete_slo',
    description: 'Delete an SLO',
    category: 'slos',
    clientMethod: 'deleteSLO',
    params: [
      { name: 'sloId', type: 'string', required: true, description: 'SLO ID' },
      { name: 'force', type: 'string', required: false, description: 'Force delete' }
    ]
  },
  {
    name: 'datadog_get_slo_history',
    description: 'Get SLO history',
    category: 'slos',
    clientMethod: 'getSLOHistory',
    params: [
      { name: 'sloId', type: 'string', required: true, description: 'SLO ID' },
      { name: 'fromTs', type: 'number', required: true, description: 'Start timestamp' },
      { name: 'toTs', type: 'number', required: true, description: 'End timestamp' }
    ]
  },
  // Hosts
  {
    name: 'datadog_list_hosts',
    description: 'List all hosts',
    category: 'hosts',
    clientMethod: 'listHosts',
    params: [
      { name: 'filter', type: 'string', required: false, description: 'Filter query' },
      { name: 'count', type: 'number', required: false, description: 'Max results' }
    ]
  },
  {
    name: 'datadog_get_host_totals',
    description: 'Get host totals',
    category: 'hosts',
    clientMethod: 'getHostTotals',
    params: []
  },
  {
    name: 'datadog_mute_host',
    description: 'Mute a host',
    category: 'hosts',
    clientMethod: 'muteHost',
    params: [
      { name: 'hostName', type: 'string', required: true, description: 'Host name' },
      { name: 'body', type: 'object', required: false, description: 'Mute settings' }
    ]
  },
  {
    name: 'datadog_unmute_host',
    description: 'Unmute a host',
    category: 'hosts',
    clientMethod: 'unmuteHost',
    params: [
      { name: 'hostName', type: 'string', required: true, description: 'Host name' }
    ]
  },
  // Tags
  {
    name: 'datadog_list_host_tags',
    description: 'List all host tags',
    category: 'tags',
    clientMethod: 'listHostTags',
    params: [
      { name: 'source', type: 'string', required: false, description: 'Source filter' }
    ]
  },
  {
    name: 'datadog_create_host_tags',
    description: 'Add tags to a host',
    category: 'tags',
    clientMethod: 'createHostTags',
    params: [
      { name: 'hostName', type: 'string', required: true, description: 'Host name' },
      { name: 'body', type: 'object', required: true, description: 'Tags to add' }
    ]
  },
  {
    name: 'datadog_delete_host_tags',
    description: 'Delete all tags from a host',
    category: 'tags',
    clientMethod: 'deleteHostTags',
    params: [
      { name: 'hostName', type: 'string', required: true, description: 'Host name' }
    ]
  },
  // Synthetics
  {
    name: 'datadog_list_synthetic_tests',
    description: 'List all synthetic tests',
    category: 'synthetics',
    clientMethod: 'listTests',
    params: [
      { name: 'pageSize', type: 'number', required: false, description: 'Page size' },
      { name: 'pageNumber', type: 'number', required: false, description: 'Page number' }
    ]
  },
  {
    name: 'datadog_create_synthetic_test',
    description: 'Create a synthetic test',
    category: 'synthetics',
    clientMethod: 'createSyntheticTest',
    params: [
      { name: 'body', type: 'object', required: true, description: 'Test configuration' }
    ]
  },
  {
    name: 'datadog_get_synthetic_test',
    description: 'Get synthetic test details',
    category: 'synthetics',
    clientMethod: 'getTest',
    params: [
      { name: 'publicId', type: 'string', required: true, description: 'Test public ID' }
    ]
  },
  {
    name: 'datadog_update_synthetic_test',
    description: 'Update a synthetic test',
    category: 'synthetics',
    clientMethod: 'updateTest',
    params: [
      { name: 'publicId', type: 'string', required: true, description: 'Test public ID' },
      { name: 'body', type: 'object', required: true, description: 'Test configuration' }
    ]
  },
  {
    name: 'datadog_delete_synthetic_tests',
    description: 'Delete synthetic tests',
    category: 'synthetics',
    clientMethod: 'deleteTests',
    params: [
      { name: 'body', type: 'object', required: true, description: 'Public IDs to delete' }
    ]
  },
  {
    name: 'datadog_trigger_synthetic_tests',
    description: 'Trigger synthetic tests',
    category: 'synthetics',
    clientMethod: 'triggerTests',
    params: [
      { name: 'body', type: 'object', required: true, description: 'Tests to trigger' }
    ]
  },
  {
    name: 'datadog_get_synthetic_test_results',
    description: 'Get synthetic test results',
    category: 'synthetics',
    clientMethod: 'getTestResults',
    params: [
      { name: 'publicId', type: 'string', required: true, description: 'Test public ID' },
      { name: 'fromTs', type: 'number', required: false, description: 'Start timestamp' },
      { name: 'toTs', type: 'number', required: false, description: 'End timestamp' }
    ]
  },
  {
    name: 'datadog_list_synthetic_locations',
    description: 'List synthetic monitoring locations',
    category: 'synthetics',
    clientMethod: 'listLocations',
    params: []
  },
  // Metrics
  {
    name: 'datadog_list_active_metrics',
    description: 'List active metrics',
    category: 'metrics',
    clientMethod: 'listActiveMetrics',
    params: [
      { name: 'from', type: 'number', required: true, description: 'Start timestamp' },
      { name: 'host', type: 'string', required: false, description: 'Host filter' }
    ]
  },
  {
    name: 'datadog_get_metric_metadata',
    description: 'Get metric metadata',
    category: 'metrics',
    clientMethod: 'getMetricMetadata',
    params: [
      { name: 'metricName', type: 'string', required: true, description: 'Metric name' }
    ]
  },
  {
    name: 'datadog_update_metric_metadata',
    description: 'Update metric metadata',
    category: 'metrics',
    clientMethod: 'updateMetricMetadata',
    params: [
      { name: 'metricName', type: 'string', required: true, description: 'Metric name' },
      { name: 'body', type: 'object', required: true, description: 'Metadata' }
    ]
  },
  // Logs
  {
    name: 'datadog_aggregate_logs',
    description: 'Aggregate logs',
    category: 'logs',
    clientMethod: 'aggregateLogs',
    params: [
      { name: 'body', type: 'object', required: true, description: 'Aggregation request' }
    ]
  },
  {
    name: 'datadog_list_logs_archives',
    description: 'List log archives',
    category: 'logs',
    clientMethod: 'listLogsArchives',
    params: []
  },
  {
    name: 'datadog_create_logs_archive',
    description: 'Create log archive',
    category: 'logs',
    clientMethod: 'createLogsArchive',
    params: [
      { name: 'body', type: 'object', required: true, description: 'Archive configuration' }
    ]
  },
  {
    name: 'datadog_list_logs_pipelines',
    description: 'List log pipelines',
    category: 'logs',
    clientMethod: 'listLogsPipelines',
    params: []
  },
  {
    name: 'datadog_list_logs_indexes',
    description: 'List log indexes',
    category: 'logs',
    clientMethod: 'listLogsIndexes',
    params: []
  },
  {
    name: 'datadog_list_logs_metrics',
    description: 'List log-based metrics',
    category: 'logs',
    clientMethod: 'listLogsMetrics',
    params: []
  },
  // Users
  {
    name: 'datadog_list_users',
    description: 'List all users',
    category: 'users',
    clientMethod: 'listUsers',
    params: [
      { name: 'pageSize', type: 'number', required: false, description: 'Page size' },
      { name: 'pageNumber', type: 'number', required: false, description: 'Page number' },
      { name: 'filter', type: 'string', required: false, description: 'Filter query' }
    ]
  },
  {
    name: 'datadog_create_user',
    description: 'Create a new user',
    category: 'users',
    clientMethod: 'createUser',
    params: [
      { name: 'body', type: 'object', required: true, description: 'User data' }
    ]
  },
  {
    name: 'datadog_get_user',
    description: 'Get user details',
    category: 'users',
    clientMethod: 'getUser',
    params: [
      { name: 'userId', type: 'string', required: true, description: 'User ID' }
    ]
  },
  {
    name: 'datadog_update_user',
    description: 'Update a user',
    category: 'users',
    clientMethod: 'updateUser',
    params: [
      { name: 'userId', type: 'string', required: true, description: 'User ID' },
      { name: 'body', type: 'object', required: true, description: 'User data' }
    ]
  },
  {
    name: 'datadog_disable_user',
    description: 'Disable a user',
    category: 'users',
    clientMethod: 'disableUser',
    params: [
      { name: 'userId', type: 'string', required: true, description: 'User ID' }
    ]
  },
  // Roles
  {
    name: 'datadog_list_roles',
    description: 'List all roles',
    category: 'roles',
    clientMethod: 'listRoles',
    params: [
      { name: 'pageSize', type: 'number', required: false, description: 'Page size' },
      { name: 'pageNumber', type: 'number', required: false, description: 'Page number' }
    ]
  },
  {
    name: 'datadog_create_role',
    description: 'Create a new role',
    category: 'roles',
    clientMethod: 'createRole',
    params: [
      { name: 'body', type: 'object', required: true, description: 'Role data' }
    ]
  },
  {
    name: 'datadog_get_role',
    description: 'Get role details',
    category: 'roles',
    clientMethod: 'getRole',
    params: [
      { name: 'roleId', type: 'string', required: true, description: 'Role ID' }
    ]
  },
  {
    name: 'datadog_update_role',
    description: 'Update a role',
    category: 'roles',
    clientMethod: 'updateRole',
    params: [
      { name: 'roleId', type: 'string', required: true, description: 'Role ID' },
      { name: 'body', type: 'object', required: true, description: 'Role data' }
    ]
  },
  {
    name: 'datadog_delete_role',
    description: 'Delete a role',
    category: 'roles',
    clientMethod: 'deleteRole',
    params: [
      { name: 'roleId', type: 'string', required: true, description: 'Role ID' }
    ]
  },
  // Incidents
  {
    name: 'datadog_list_incidents',
    description: 'List all incidents',
    category: 'incidents',
    clientMethod: 'listIncidents',
    params: [
      { name: 'pageSize', type: 'number', required: false, description: 'Page size' },
      { name: 'pageOffset', type: 'number', required: false, description: 'Page offset' }
    ]
  },
  {
    name: 'datadog_create_incident',
    description: 'Create an incident',
    category: 'incidents',
    clientMethod: 'createIncident',
    params: [
      { name: 'body', type: 'object', required: true, description: 'Incident data' }
    ]
  },
  {
    name: 'datadog_get_incident',
    description: 'Get incident details',
    category: 'incidents',
    clientMethod: 'getIncident',
    params: [
      { name: 'incidentId', type: 'string', required: true, description: 'Incident ID' }
    ]
  },
  {
    name: 'datadog_update_incident',
    description: 'Update an incident',
    category: 'incidents',
    clientMethod: 'updateIncident',
    params: [
      { name: 'incidentId', type: 'string', required: true, description: 'Incident ID' },
      { name: 'body', type: 'object', required: true, description: 'Incident data' }
    ]
  },
  {
    name: 'datadog_delete_incident',
    description: 'Delete an incident',
    category: 'incidents',
    clientMethod: 'deleteIncident',
    params: [
      { name: 'incidentId', type: 'string', required: true, description: 'Incident ID' }
    ]
  },
];

function generateToolFile(tool: ToolDefinition): string {
  const paramsInterface = tool.params.length > 0 ? `
interface ${toPascalCase(tool.name)}Params {
${tool.params.map(p => `  ${p.name}${p.required ? '' : '?'}: ${p.type};`).join('\n')}
}
` : '';

  const paramsType = tool.params.length > 0 ? `${toPascalCase(tool.name)}Params` : 'Record<string, never>';

  const paramsArg = tool.params.length > 0 ? 'input' : '_input';

  return `import { DatadogClient } from '../../lib/datadog-client.js';

${paramsInterface}
export async function ${toCamelCase(tool.name)}(
  client: DatadogClient,
  ${paramsArg}: ${paramsType}
): Promise<any> {
  return client.${tool.clientMethod}(${tool.params.length > 0 ? 'input' : ''});
}
`;
}

function toPascalCase(str: string): string {
  return str.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

// Generate all tool files
for (const tool of tools) {
  const dir = join(__dirname, '..', 'src', 'tools', tool.category);
  mkdirSync(dir, { recursive: true });

  const filename = tool.name.replace('datadog_', '').replace(/_/g, '-') + '.ts';
  const filepath = join(dir, filename);
  const content = generateToolFile(tool);

  writeFileSync(filepath, content, 'utf-8');
  console.log(`Created: ${filepath}`);
}

console.log(`\nGenerated ${tools.length} tool files!`);
