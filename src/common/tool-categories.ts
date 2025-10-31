import { Tool } from '@modelcontextprotocol/sdk/types.js';

export type ToolCategory =
  | 'monitors'
  | 'dashboards'
  | 'metrics'
  | 'logs'
  | 'events'
  | 'downtimes'
  | 'slos'
  | 'synthetics'
  | 'incidents'
  | 'users'
  | 'roles'
  | 'tags'
  | 'hosts'
  | 'organizations'
  | 'teams'
  | 'integrations'
  | 'security'
  | 'rum'
  | 'apm'
  | 'service-catalog'
  | 'dashboard-lists'
  | 'api-keys'
  | 'notebooks'
  | 'webhooks'
  | 'usage';

/**
 * Maps tool names to their categories
 */
export const TOOL_CATEGORY_MAP: Record<string, ToolCategory> = {
  // Monitors
  'datadog_list_monitors': 'monitors',
  'datadog_get_monitor': 'monitors',
  'datadog_create_monitor': 'monitors',
  'datadog_update_monitor': 'monitors',
  'datadog_delete_monitor': 'monitors',
  'datadog_validate_monitor': 'monitors',
  'datadog_search_monitors': 'monitors',

  // Dashboards
  'datadog_list_dashboards': 'dashboards',
  'datadog_get_dashboard': 'dashboards',
  'datadog_create_dashboard': 'dashboards',
  'datadog_update_dashboard': 'dashboards',
  'datadog_delete_dashboard': 'dashboards',

  // Metrics
  'datadog_submit_metrics': 'metrics',
  'datadog_query_metrics': 'metrics',
  'datadog_list_active_metrics': 'metrics',
  'datadog_get_metric_metadata': 'metrics',
  'datadog_update_metric_metadata': 'metrics',

  // Logs
  'datadog_list_logs': 'logs',
  'datadog_aggregate_logs': 'logs',
  'datadog_create_logs_archive': 'logs',
  'datadog_list_logs_archives': 'logs',
  'datadog_list_logs_indexes': 'logs',
  'datadog_list_logs_metrics': 'logs',
  'datadog_list_logs_pipelines': 'logs',
  'datadog_get_logs_archive': 'logs',
  'datadog_update_logs_archive': 'logs',
  'datadog_delete_logs_archive': 'logs',
  'datadog_create_logs_pipeline': 'logs',
  'datadog_get_logs_pipeline': 'logs',
  'datadog_update_logs_pipeline': 'logs',
  'datadog_delete_logs_pipeline': 'logs',
  'datadog_get_logs_index': 'logs',
  'datadog_update_logs_index': 'logs',
  'datadog_create_logs_metric': 'logs',
  'datadog_get_logs_metric': 'logs',
  'datadog_update_logs_metric': 'logs',
  'datadog_delete_logs_metric': 'logs',

  // Events
  'datadog_list_events': 'events',
  'datadog_create_event': 'events',
  'datadog_get_event': 'events',

  // Downtimes
  'datadog_list_downtimes': 'downtimes',
  'datadog_create_downtime': 'downtimes',
  'datadog_get_downtime': 'downtimes',
  'datadog_update_downtime': 'downtimes',
  'datadog_cancel_downtime': 'downtimes',

  // SLOs
  'datadog_create_slo': 'slos',
  'datadog_get_slo': 'slos',
  'datadog_list_slos': 'slos',
  'datadog_update_slo': 'slos',
  'datadog_delete_slo': 'slos',
  'datadog_get_slo_history': 'slos',
  'datadog_search_slo': 'slos',

  // Synthetics
  'datadog_create_synthetic_test': 'synthetics',
  'datadog_get_synthetic_test': 'synthetics',
  'datadog_list_synthetic_tests': 'synthetics',
  'datadog_update_synthetic_test': 'synthetics',
  'datadog_delete_synthetic_tests': 'synthetics',
  'datadog_get_synthetic_test_results': 'synthetics',
  'datadog_trigger_synthetic_tests': 'synthetics',
  'datadog_list_synthetic_locations': 'synthetics',

  // Incidents
  'datadog_create_incident': 'incidents',
  'datadog_get_incident': 'incidents',
  'datadog_list_incidents': 'incidents',
  'datadog_update_incident': 'incidents',
  'datadog_delete_incident': 'incidents',
  'datadog_create_incident_service': 'incidents',
  'datadog_get_incident_service': 'incidents',
  'datadog_list_incident_services': 'incidents',
  'datadog_update_incident_service': 'incidents',
  'datadog_delete_incident_service': 'incidents',
  'datadog_create_incident_team': 'incidents',
  'datadog_get_incident_team': 'incidents',
  'datadog_list_incident_teams': 'incidents',
  'datadog_update_incident_team': 'incidents',
  'datadog_delete_incident_team': 'incidents',
  'datadog_search_incidents': 'incidents',

  // Users
  'datadog_create_user': 'users',
  'datadog_get_user': 'users',
  'datadog_list_users': 'users',
  'datadog_update_user': 'users',
  'datadog_disable_user': 'users',

  // Roles
  'datadog_create_role': 'roles',
  'datadog_get_role': 'roles',
  'datadog_list_roles': 'roles',
  'datadog_update_role': 'roles',
  'datadog_delete_role': 'roles',
  'datadog_list_role_permissions': 'roles',
  'datadog_add_permission_to_role': 'roles',
  'datadog_remove_permission_from_role': 'roles',
  'datadog_list_role_users': 'roles',

  // Tags & Hosts
  'datadog_create_host_tags': 'tags',
  'datadog_list_host_tags': 'tags',
  'datadog_delete_host_tags': 'tags',
  'datadog_get_host_tags': 'tags',
  'datadog_update_host_tags': 'tags',
  'datadog_list_hosts': 'hosts',
  'datadog_get_host_totals': 'hosts',
  'datadog_mute_host': 'hosts',
  'datadog_unmute_host': 'hosts',

  // Organizations & Teams
  'datadog_get_organization': 'organizations',
  'datadog_list_organizations': 'organizations',
  'datadog_update_organization': 'organizations',
  'datadog_create_team': 'teams',
  'datadog_get_team': 'teams',
  'datadog_list_teams': 'teams',
  'datadog_update_team': 'teams',
  'datadog_delete_team': 'teams',

  // Integrations
  'datadog_create_aws_account': 'integrations',
  'datadog_list_aws_accounts': 'integrations',
  'datadog_delete_aws_account': 'integrations',
  'datadog_list_aws_log_services': 'integrations',
  'datadog_enable_aws_log_services': 'integrations',
  'datadog_create_azure_integration': 'integrations',
  'datadog_list_azure_integrations': 'integrations',
  'datadog_delete_azure_integration': 'integrations',
  'datadog_update_azure_integration': 'integrations',
  'datadog_update_azure_host_filters': 'integrations',
  'datadog_create_gcp_integration': 'integrations',
  'datadog_list_gcp_integrations': 'integrations',
  'datadog_delete_gcp_integration': 'integrations',
  'datadog_update_gcp_integration': 'integrations',

  // Security
  'datadog_create_security_rule': 'security',
  'datadog_get_security_rule': 'security',
  'datadog_list_security_rules': 'security',
  'datadog_update_security_rule': 'security',
  'datadog_delete_security_rule': 'security',
  'datadog_list_security_signals': 'security',

  // RUM
  'datadog_create_rum_application': 'rum',
  'datadog_get_rum_application': 'rum',
  'datadog_list_rum_applications': 'rum',
  'datadog_update_rum_application': 'rum',
  'datadog_delete_rum_application': 'rum',
  'datadog_search_rum_events': 'rum',
  'datadog_aggregate_rum_events': 'rum',

  // APM
  'datadog_list_spans': 'apm',
  'datadog_list_spans_advanced': 'apm',
  'datadog_aggregate_spans': 'apm',
  'datadog_create_apm_retention_filter': 'apm',
  'datadog_get_apm_retention_filter': 'apm',
  'datadog_list_apm_retention_filters': 'apm',
  'datadog_update_apm_retention_filter': 'apm',
  'datadog_delete_apm_retention_filter': 'apm',

  // Service Catalog
  'datadog_list_services': 'service-catalog',
  'datadog_get_service': 'service-catalog',
  'datadog_create_or_update_service_definition': 'service-catalog',
  'datadog_delete_service_definition': 'service-catalog',

  // Dashboard Lists
  'datadog_create_dashboard_list': 'dashboard-lists',
  'datadog_get_dashboard_list': 'dashboard-lists',
  'datadog_list_dashboard_lists': 'dashboard-lists',
  'datadog_update_dashboard_list': 'dashboard-lists',
  'datadog_delete_dashboard_list': 'dashboard-lists',

  // API Keys
  'datadog_create_api_key': 'api-keys',
  'datadog_get_api_key': 'api-keys',
  'datadog_list_api_keys': 'api-keys',
  'datadog_update_api_key': 'api-keys',
  'datadog_delete_api_key': 'api-keys',
  'datadog_get_application_key': 'api-keys',
  'datadog_list_application_keys': 'api-keys',
  'datadog_update_application_key': 'api-keys',
  'datadog_delete_application_key': 'api-keys',

  // Notebooks
  'datadog_create_notebook': 'notebooks',
  'datadog_get_notebook': 'notebooks',
  'datadog_list_notebooks': 'notebooks',
  'datadog_update_notebook': 'notebooks',
  'datadog_delete_notebook': 'notebooks',

  // Webhooks
  'datadog_create_webhook': 'webhooks',
  'datadog_get_webhook': 'webhooks',
  'datadog_update_webhook': 'webhooks',
  'datadog_delete_webhook': 'webhooks',

  // Usage & Service Checks
  'datadog_get_usage_hosts': 'usage',
  'datadog_get_usage_logs': 'usage',
  'datadog_get_usage_summary': 'usage',
  'datadog_get_usage_timeseries': 'usage',
  'datadog_get_usage_top_avg_metrics': 'usage',
  'datadog_submit_service_check': 'events',
};

/**
 * Essential tools preset - focused on debugging and understanding traces
 * These are the core tools developers need to investigate issues
 */
export const ESSENTIAL_CATEGORIES: ToolCategory[] = [
  'apm',              // Traces and spans - the core of debugging
  'service-catalog',  // Service definitions and relationships
  'logs',             // Log viewing and searching
  'metrics',          // Metric queries (not submission)
  'events',           // Events to understand what happened
  'monitors',         // View monitors to see what's alerting (read-only focus)
];

/**
 * Monitoring preset - focus on monitoring and alerting management
 */
export const MONITORING_CATEGORIES: ToolCategory[] = [
  'monitors',
  'downtimes',
  'slos',
  'synthetics',
  'incidents',
];

/**
 * Observability preset - comprehensive observability stack
 */
export const OBSERVABILITY_CATEGORIES: ToolCategory[] = [
  'apm',
  'logs',
  'metrics',
  'rum',
  'service-catalog',
  'events',
];

/**
 * Management preset - for workspace and resource management
 */
export const MANAGEMENT_CATEGORIES: ToolCategory[] = [
  'dashboards',
  'dashboard-lists',
  'users',
  'roles',
  'teams',
  'organizations',
  'api-keys',
  'notebooks',
  'webhooks',
];

/**
 * Filters tools based on enabled categories
 * @param tools - Array of all tools
 * @param categoriesStr - Comma-separated string of categories (or preset name). Defaults to 'essential' if not specified.
 * @returns Filtered array of tools
 */
export function filterToolsByCategories(
  tools: Tool[],
  categoriesStr?: string
): Tool[] {
  // Default to 'essential' preset if not specified
  const filterString = categoriesStr || 'essential';

  // Handle presets
  let enabledCategories: ToolCategory[];
  const lower = filterString.toLowerCase();

  if (lower === 'essential') {
    enabledCategories = ESSENTIAL_CATEGORIES;
  } else if (lower === 'monitoring') {
    enabledCategories = MONITORING_CATEGORIES;
  } else if (lower === 'observability') {
    enabledCategories = OBSERVABILITY_CATEGORIES;
  } else if (lower === 'management') {
    enabledCategories = MANAGEMENT_CATEGORIES;
  } else if (lower === 'all') {
    // Special keyword to disable filtering
    return tools;
  } else {
    // Parse comma-separated categories
    enabledCategories = filterString
      .split(',')
      .map((c) => c.trim() as ToolCategory)
      .filter((c) => c);
  }

  // Filter tools based on enabled categories
  return tools.filter((tool) => {
    const category = TOOL_CATEGORY_MAP[tool.name];
    return category && enabledCategories.includes(category);
  });
}

/**
 * Gets a summary of available tool categories and their counts
 */
export function getToolCategorySummary(tools: Tool[]): Record<ToolCategory, number> {
  const summary: Record<string, number> = {};

  for (const tool of tools) {
    const category = TOOL_CATEGORY_MAP[tool.name];
    if (category) {
      summary[category] = (summary[category] || 0) + 1;
    }
  }

  return summary as Record<ToolCategory, number>;
}
