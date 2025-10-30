import { client, v1, v2 } from '@datadog/datadog-api-client';
import { logger, loadDatadogEnv } from '../common/index.js';

export interface DatadogCredentials {
  apiKey: string;
  appKey: string;
  site?: string;
}

export class DatadogClient {
  private configuration: client.Configuration;

  // Core Monitoring APIs
  public metricsApi: v2.MetricsApi;
  public metricsApiV1: v1.MetricsApi;
  public monitorsApi: v1.MonitorsApi;
  public dashboardsApi: v1.DashboardsApi;
  public logsApi: v2.LogsApi;
  public logsApiV1: v1.LogsApi;
  public eventsApi: v1.EventsApi;
  public downtimesApi: v1.DowntimesApi;
  public serviceChecksApi: v1.ServiceChecksApi;
  public tagsApi: v1.TagsApi;
  public hostsApi: v1.HostsApi;

  // SLOs
  public slosApi: v1.ServiceLevelObjectivesApi;

  // APM
  public spansApi: v2.SpansApi;
  public apmRetentionFiltersApi: v2.APMRetentionFiltersApi;

  // Synthetic Monitoring
  public syntheticsApi: v1.SyntheticsApi;

  // Incidents & Service Management
  public incidentsApi: v2.IncidentsApi;
  public incidentServicesApi: v2.IncidentServicesApi;
  public incidentTeamsApi: v2.IncidentTeamsApi;

  // Users, Roles & Organizations
  public usersApi: v2.UsersApi;
  public rolesApi: v2.RolesApi;
  public organizationsApi: v1.OrganizationsApi;
  public teamsApi: v2.TeamsApi;

  // Cloud Integrations
  public awsIntegrationApi: v1.AWSIntegrationApi;
  public awsLogsIntegrationApi: v1.AWSLogsIntegrationApi;
  public azureIntegrationApi: v1.AzureIntegrationApi;
  public gcpIntegrationApi: v1.GCPIntegrationApi;

  // Security
  public securityMonitoringApi: v2.SecurityMonitoringApi;

  // RUM
  public rumApi: v2.RUMApi;

  // Service Catalog
  public serviceDefinitionApi: v2.ServiceDefinitionApi;

  // Logs Configuration
  public logsArchivesApi: v2.LogsArchivesApi;
  public logsPipelinesApi: v1.LogsPipelinesApi;
  public logsIndexesApi: v1.LogsIndexesApi;
  public logsMetricsApi: v2.LogsMetricsApi;

  // Dashboard Lists
  public dashboardListsApi: v1.DashboardListsApi;

  // Key Management
  public keyManagementApi: v2.KeyManagementApi;

  // Notebooks
  public notebooksApi: v1.NotebooksApi;

  // Webhooks
  public webhooksIntegrationApi: v1.WebhooksIntegrationApi;

  // Usage & Billing
  public usageMeteringApi: v1.UsageMeteringApi;

  constructor(credentials?: DatadogCredentials) {
    if (credentials) {
      // Use credentials provided by the caller
      this.configuration = client.createConfiguration({
        authMethods: {
          apiKeyAuth: credentials.apiKey,
          appKeyAuth: credentials.appKey,
        },
      });

      // Set server variables if site is provided (for EU, etc.)
      if (credentials.site) {
        this.configuration.setServerVariables({
          site: credentials.site,
        });
      }
    } else {
      // Fall back to environment variables (DD_API_KEY, DD_APP_KEY)
      const env = loadDatadogEnv();
      this.configuration = client.createConfiguration({
        authMethods: {
          apiKeyAuth: env.DD_API_KEY,
          appKeyAuth: env.DD_APP_KEY,
        },
      });

      if (env.DD_SITE) {
        this.configuration.setServerVariables({
          site: env.DD_SITE,
        });
      }
    }

    // Initialize Core Monitoring API instances
    this.metricsApi = new v2.MetricsApi(this.configuration);
    this.metricsApiV1 = new v1.MetricsApi(this.configuration);
    this.monitorsApi = new v1.MonitorsApi(this.configuration);
    this.dashboardsApi = new v1.DashboardsApi(this.configuration);
    this.logsApi = new v2.LogsApi(this.configuration);
    this.logsApiV1 = new v1.LogsApi(this.configuration);
    this.eventsApi = new v1.EventsApi(this.configuration);
    this.downtimesApi = new v1.DowntimesApi(this.configuration);
    this.serviceChecksApi = new v1.ServiceChecksApi(this.configuration);
    this.tagsApi = new v1.TagsApi(this.configuration);
    this.hostsApi = new v1.HostsApi(this.configuration);

    // Initialize SLOs
    this.slosApi = new v1.ServiceLevelObjectivesApi(this.configuration);

    // Initialize APM
    this.spansApi = new v2.SpansApi(this.configuration);
    this.apmRetentionFiltersApi = new v2.APMRetentionFiltersApi(this.configuration);

    // Initialize Synthetic Monitoring
    this.syntheticsApi = new v1.SyntheticsApi(this.configuration);

    // Initialize Incidents & Service Management
    this.incidentsApi = new v2.IncidentsApi(this.configuration);
    this.incidentServicesApi = new v2.IncidentServicesApi(this.configuration);
    this.incidentTeamsApi = new v2.IncidentTeamsApi(this.configuration);

    // Initialize Users, Roles & Organizations
    this.usersApi = new v2.UsersApi(this.configuration);
    this.rolesApi = new v2.RolesApi(this.configuration);
    this.organizationsApi = new v1.OrganizationsApi(this.configuration);
    this.teamsApi = new v2.TeamsApi(this.configuration);

    // Initialize Cloud Integrations
    this.awsIntegrationApi = new v1.AWSIntegrationApi(this.configuration);
    this.awsLogsIntegrationApi = new v1.AWSLogsIntegrationApi(this.configuration);
    this.azureIntegrationApi = new v1.AzureIntegrationApi(this.configuration);
    this.gcpIntegrationApi = new v1.GCPIntegrationApi(this.configuration);

    // Initialize Security
    this.securityMonitoringApi = new v2.SecurityMonitoringApi(this.configuration);

    // Initialize RUM
    this.rumApi = new v2.RUMApi(this.configuration);

    // Initialize Service Catalog
    this.serviceDefinitionApi = new v2.ServiceDefinitionApi(this.configuration);

    // Initialize Logs Configuration
    this.logsArchivesApi = new v2.LogsArchivesApi(this.configuration);
    this.logsPipelinesApi = new v1.LogsPipelinesApi(this.configuration);
    this.logsIndexesApi = new v1.LogsIndexesApi(this.configuration);
    this.logsMetricsApi = new v2.LogsMetricsApi(this.configuration);

    // Initialize Dashboard Lists
    this.dashboardListsApi = new v1.DashboardListsApi(this.configuration);

    // Initialize Key Management
    this.keyManagementApi = new v2.KeyManagementApi(this.configuration);

    // Initialize Notebooks
    this.notebooksApi = new v1.NotebooksApi(this.configuration);

    // Initialize Webhooks
    this.webhooksIntegrationApi = new v1.WebhooksIntegrationApi(this.configuration);

    // Initialize Usage & Billing
    this.usageMeteringApi = new v1.UsageMeteringApi(this.configuration);

    logger.info('DatadogClient initialized with all API endpoints');
  }

  // Metrics operations
  async submitMetrics(body: v2.MetricPayload): Promise<v2.IntakePayloadAccepted> {
    return this.metricsApi.submitMetrics({ body });
  }

  async queryMetrics(params: {
    from: number;
    to: number;
    query: string;
  }): Promise<v1.MetricsQueryResponse> {
    return this.metricsApiV1.queryMetrics(params);
  }

  async listActiveMetrics(params: { from: number; host?: string }): Promise<v1.MetricsListResponse> {
    return this.metricsApiV1.listActiveMetrics(params);
  }

  async getMetricMetadata(params: { metricName: string }): Promise<v1.MetricMetadata> {
    return this.metricsApiV1.getMetricMetadata(params);
  }

  async updateMetricMetadata(params: {
    metricName: string;
    body: v1.MetricMetadata;
  }): Promise<v1.MetricMetadata> {
    return this.metricsApiV1.updateMetricMetadata(params);
  }

  // Monitor operations
  async listMonitors(params?: {
    groupStates?: string;
    name?: string;
    tags?: string;
    monitorTags?: string;
    withDowntimes?: boolean;
    idOffset?: number;
    pageSize?: number;
    page?: number;
  }): Promise<v1.Monitor[]> {
    return this.monitorsApi.listMonitors(params);
  }

  async getMonitor(params: { monitorId: number }): Promise<v1.Monitor> {
    return this.monitorsApi.getMonitor(params);
  }

  async createMonitor(params: { body: v1.Monitor }): Promise<v1.Monitor> {
    return this.monitorsApi.createMonitor(params);
  }

  async updateMonitor(params: {
    monitorId: number;
    body: v1.MonitorUpdateRequest;
  }): Promise<v1.Monitor> {
    return this.monitorsApi.updateMonitor(params);
  }

  async deleteMonitor(params: { monitorId: number }): Promise<v1.DeletedMonitor> {
    return this.monitorsApi.deleteMonitor(params);
  }

  async validateMonitor(params: { body: v1.Monitor }): Promise<any> {
    return this.monitorsApi.validateMonitor(params);
  }

  async searchMonitors(params?: {
    query?: string;
    page?: number;
    perPage?: number;
    sort?: string;
  }): Promise<v1.MonitorSearchResponse> {
    return this.monitorsApi.searchMonitors(params);
  }

  // Note: muteMonitor and unmuteMonitor are not available in the current SDK version
  // Use updateMonitor with options.silenced property instead

  // Dashboard operations
  async listDashboards(params?: { filterShared?: boolean }): Promise<v1.DashboardSummary> {
    return this.dashboardsApi.listDashboards(params);
  }

  async getDashboard(params: { dashboardId: string }): Promise<v1.Dashboard> {
    return this.dashboardsApi.getDashboard(params);
  }

  async createDashboard(params: { body: v1.Dashboard }): Promise<v1.Dashboard> {
    return this.dashboardsApi.createDashboard(params);
  }

  async updateDashboard(params: {
    dashboardId: string;
    body: v1.Dashboard;
  }): Promise<v1.Dashboard> {
    return this.dashboardsApi.updateDashboard(params);
  }

  async deleteDashboard(params: { dashboardId: string }): Promise<v1.DashboardDeleteResponse> {
    return this.dashboardsApi.deleteDashboard(params);
  }

  // Logs operations
  async listLogs(params: { body: v2.LogsListRequest }): Promise<v2.LogsListResponse> {
    return this.logsApi.listLogs(params);
  }

  async aggregateLogs(params: { body: v2.LogsAggregateRequest }): Promise<v2.LogsAggregateResponse> {
    return this.logsApi.aggregateLogs(params);
  }

  // Events operations
  async listEvents(params: {
    start: number;
    end: number;
    priority?: v1.EventPriority;
    sources?: string;
    tags?: string;
    unaggregated?: boolean;
    excludeAggregate?: boolean;
    page?: number;
  }): Promise<v1.EventListResponse> {
    return this.eventsApi.listEvents(params);
  }

  async getEvent(params: { eventId: number }): Promise<v1.EventResponse> {
    return this.eventsApi.getEvent(params);
  }

  async createEvent(params: { body: v1.EventCreateRequest }): Promise<v1.EventCreateResponse> {
    return this.eventsApi.createEvent(params);
  }

  // Downtime operations
  async listDowntimes(params?: {
    currentOnly?: boolean;
    withCreator?: boolean;
  }): Promise<v1.Downtime[]> {
    return this.downtimesApi.listDowntimes(params);
  }

  async getDowntime(params: { downtimeId: number }): Promise<v1.Downtime> {
    return this.downtimesApi.getDowntime(params);
  }

  async createDowntime(params: { body: v1.Downtime }): Promise<v1.Downtime> {
    return this.downtimesApi.createDowntime(params);
  }

  async updateDowntime(params: { downtimeId: number; body: v1.Downtime }): Promise<v1.Downtime> {
    return this.downtimesApi.updateDowntime(params);
  }

  async cancelDowntime(params: { downtimeId: number }): Promise<void> {
    return this.downtimesApi.cancelDowntime(params);
  }

  // Service Checks operations
  async submitServiceCheck(params: { body: v1.ServiceCheck[] }): Promise<v1.IntakePayloadAccepted> {
    return this.serviceChecksApi.submitServiceCheck(params);
  }

  // Tags operations
  async getHostTags(params: { hostName: string }): Promise<v1.HostTags> {
    return this.tagsApi.getHostTags(params);
  }

  async updateHostTags(params: {
    hostName: string;
    body: v1.HostTags;
  }): Promise<v1.HostTags> {
    return this.tagsApi.updateHostTags(params);
  }

  async createHostTags(params: {
    hostName: string;
    body: v1.HostTags;
  }): Promise<v1.HostTags> {
    return this.tagsApi.createHostTags(params);
  }

  async deleteHostTags(params: { hostName: string }): Promise<void> {
    return this.tagsApi.deleteHostTags(params);
  }

  async listHostTags(params?: { source?: string }): Promise<v1.TagToHosts> {
    return this.tagsApi.listHostTags(params);
  }

  // Hosts operations
  async listHosts(params?: {
    filter?: string;
    sortField?: string;
    sortDir?: string;
    start?: number;
    count?: number;
    from?: number;
    includeMutedHostsData?: boolean;
    includeHostsMetadata?: boolean;
  }): Promise<v1.HostListResponse> {
    return this.hostsApi.listHosts(params);
  }

  async getHostTotals(params?: { from?: number }): Promise<v1.HostTotals> {
    return this.hostsApi.getHostTotals(params);
  }

  async muteHost(params: {
    hostName: string;
    body: v1.HostMuteSettings;
  }): Promise<v1.HostMuteResponse> {
    return this.hostsApi.muteHost(params);
  }

  async unmuteHost(params: { hostName: string }): Promise<v1.HostMuteResponse> {
    return this.hostsApi.unmuteHost(params);
  }

  // SLO operations
  async listSLOs(params?: {
    ids?: string;
    query?: string;
    tagsQuery?: string;
    metricsQuery?: string;
    limit?: number;
    offset?: number;
  }): Promise<v1.SLOListResponse> {
    return this.slosApi.listSLOs(params);
  }

  async createSLO(params: { body: v1.ServiceLevelObjectiveRequest }): Promise<v1.SLOListResponse> {
    return this.slosApi.createSLO(params);
  }

  async getSLO(params: {
    sloId: string;
    withConfiguredAlertIds?: boolean;
  }): Promise<v1.SLOResponse> {
    return this.slosApi.getSLO(params);
  }

  async updateSLO(params: {
    sloId: string;
    body: v1.ServiceLevelObjective;
  }): Promise<v1.SLOListResponse> {
    return this.slosApi.updateSLO(params);
  }

  async deleteSLO(params: {
    sloId: string;
    force?: string;
  }): Promise<v1.SLODeleteResponse> {
    return this.slosApi.deleteSLO(params);
  }

  async getSLOHistory(params: {
    sloId: string;
    fromTs: number;
    toTs: number;
    target?: number;
  }): Promise<v1.SLOHistoryResponse> {
    return this.slosApi.getSLOHistory(params);
  }

  async searchSLO(params?: {
    query?: string;
    pageSize?: number;
    pageNumber?: number;
  }): Promise<v1.SearchSLOResponse> {
    return this.slosApi.searchSLO(params);
  }

  // Synthetic Monitoring operations
  async listTests(params?: { pageSize?: number; pageNumber?: number }): Promise<v1.SyntheticsListTestsResponse> {
    return this.syntheticsApi.listTests(params);
  }

  async createSyntheticAPITest(params: { body: v1.SyntheticsAPITest }): Promise<v1.SyntheticsAPITest> {
    return this.syntheticsApi.createSyntheticsAPITest(params);
  }

  async createSyntheticBrowserTest(params: { body: v1.SyntheticsBrowserTest }): Promise<v1.SyntheticsBrowserTest> {
    return this.syntheticsApi.createSyntheticsBrowserTest(params);
  }

  async getTest(params: { publicId: string }): Promise<v1.SyntheticsTestDetails> {
    return this.syntheticsApi.getTest(params);
  }

  async updateAPITest(params: {
    publicId: string;
    body: v1.SyntheticsAPITest;
  }): Promise<v1.SyntheticsAPITest> {
    return this.syntheticsApi.updateAPITest(params);
  }

  async updateBrowserTest(params: {
    publicId: string;
    body: v1.SyntheticsBrowserTest;
  }): Promise<v1.SyntheticsBrowserTest> {
    return this.syntheticsApi.updateBrowserTest(params);
  }

  async deleteTests(params: { body: v1.SyntheticsDeleteTestsPayload }): Promise<v1.SyntheticsDeleteTestsResponse> {
    return this.syntheticsApi.deleteTests(params);
  }

  async triggerTests(params: { body: v1.SyntheticsTriggerBody }): Promise<v1.SyntheticsTriggerCITestsResponse> {
    return this.syntheticsApi.triggerCITests(params);
  }

  async getTestResults(params: {
    publicId: string;
    fromTs?: number;
    toTs?: number;
    probeDc?: string[];
  }): Promise<v1.SyntheticsGetAPITestLatestResultsResponse> {
    return this.syntheticsApi.getAPITestLatestResults(params);
  }

  async listLocations(): Promise<v1.SyntheticsLocations> {
    return this.syntheticsApi.listLocations();
  }

  // Logs Archives operations
  async listLogsArchives(): Promise<v2.LogsArchives> {
    return this.logsArchivesApi.listLogsArchives();
  }

  async createLogsArchive(params: { body: v2.LogsArchiveCreateRequest }): Promise<v2.LogsArchive> {
    return this.logsArchivesApi.createLogsArchive(params);
  }

  async getLogsArchive(params: { archiveId: string }): Promise<v2.LogsArchive> {
    return this.logsArchivesApi.getLogsArchive(params);
  }

  async updateLogsArchive(params: {
    archiveId: string;
    body: v2.LogsArchiveCreateRequest;
  }): Promise<v2.LogsArchive> {
    return this.logsArchivesApi.updateLogsArchive(params);
  }

  async deleteLogsArchive(params: { archiveId: string }): Promise<void> {
    return this.logsArchivesApi.deleteLogsArchive(params);
  }

  // Logs Pipelines operations
  async listLogsPipelines(): Promise<v1.LogsPipeline[]> {
    return this.logsPipelinesApi.listLogsPipelines();
  }

  async createLogsPipeline(params: { body: v1.LogsPipeline }): Promise<v1.LogsPipeline> {
    return this.logsPipelinesApi.createLogsPipeline(params);
  }

  async getLogsPipeline(params: { pipelineId: string }): Promise<v1.LogsPipeline> {
    return this.logsPipelinesApi.getLogsPipeline(params);
  }

  async updateLogsPipeline(params: {
    pipelineId: string;
    body: v1.LogsPipeline;
  }): Promise<v1.LogsPipeline> {
    return this.logsPipelinesApi.updateLogsPipeline(params);
  }

  async deleteLogsPipeline(params: { pipelineId: string }): Promise<void> {
    return this.logsPipelinesApi.deleteLogsPipeline(params);
  }

  // Logs Indexes operations
  async listLogsIndexes(): Promise<v1.LogsIndexListResponse> {
    return this.logsIndexesApi.listLogIndexes();
  }

  async getLogsIndex(params: { name: string }): Promise<v1.LogsIndex> {
    return this.logsIndexesApi.getLogsIndex(params);
  }

  async updateLogsIndex(params: { name: string; body: v1.LogsIndex }): Promise<v1.LogsIndex> {
    return this.logsIndexesApi.updateLogsIndex(params);
  }

  // Logs Metrics operations
  async listLogsMetrics(): Promise<v2.LogsMetricsResponse> {
    return this.logsMetricsApi.listLogsMetrics();
  }

  async createLogsMetric(params: { body: v2.LogsMetricCreateRequest }): Promise<v2.LogsMetricResponse> {
    return this.logsMetricsApi.createLogsMetric(params);
  }

  async getLogsMetric(params: { metricId: string }): Promise<v2.LogsMetricResponse> {
    return this.logsMetricsApi.getLogsMetric(params);
  }

  async updateLogsMetric(params: {
    metricId: string;
    body: v2.LogsMetricUpdateRequest;
  }): Promise<v2.LogsMetricResponse> {
    return this.logsMetricsApi.updateLogsMetric(params);
  }

  async deleteLogsMetric(params: { metricId: string }): Promise<void> {
    return this.logsMetricsApi.deleteLogsMetric(params);
  }

  // APM Retention Filters operations
  async listApmRetentionFilters(): Promise<v2.RetentionFiltersResponse> {
    return this.apmRetentionFiltersApi.listApmRetentionFilters();
  }

  async createApmRetentionFilter(params: {
    body: v2.RetentionFilterCreateRequest;
  }): Promise<v2.RetentionFilterResponse> {
    return this.apmRetentionFiltersApi.createApmRetentionFilter(params);
  }

  async getApmRetentionFilter(params: { filterId: string }): Promise<v2.RetentionFilterResponse> {
    return this.apmRetentionFiltersApi.getApmRetentionFilter(params);
  }

  async updateApmRetentionFilter(params: {
    filterId: string;
    body: v2.RetentionFilterUpdateRequest;
  }): Promise<v2.RetentionFilterResponse> {
    return this.apmRetentionFiltersApi.updateApmRetentionFilter(params);
  }

  async deleteApmRetentionFilter(params: { filterId: string }): Promise<void> {
    return this.apmRetentionFiltersApi.deleteApmRetentionFilter(params);
  }

  // Spans operations
  async listSpans(params: { body: v2.SpansListRequest }): Promise<v2.SpansListResponse> {
    return this.spansApi.listSpans(params);
  }

  async aggregateSpans(params: { body: v2.SpansAggregateRequest }): Promise<v2.SpansAggregateResponse> {
    return this.spansApi.aggregateSpans(params);
  }

  // Incidents operations
  async listIncidents(params?: {
    include?: Array<v2.IncidentRelatedObject>;
    pageSize?: number;
    pageOffset?: number;
  }): Promise<v2.IncidentsResponse> {
    return this.incidentsApi.listIncidents(params);
  }

  async createIncident(params: { body: v2.IncidentCreateRequest }): Promise<v2.IncidentResponse> {
    return this.incidentsApi.createIncident(params);
  }

  async getIncident(params: {
    incidentId: string;
    include?: Array<v2.IncidentRelatedObject>;
  }): Promise<v2.IncidentResponse> {
    return this.incidentsApi.getIncident(params);
  }

  async updateIncident(params: {
    incidentId: string;
    body: v2.IncidentUpdateRequest;
    include?: Array<v2.IncidentRelatedObject>;
  }): Promise<v2.IncidentResponse> {
    return this.incidentsApi.updateIncident(params);
  }

  async deleteIncident(params: { incidentId: string }): Promise<void> {
    return this.incidentsApi.deleteIncident(params);
  }

  async searchIncidents(params: { query: string }): Promise<v2.IncidentSearchResponse> {
    return this.incidentsApi.searchIncidents(params);
  }

  // Incident Services operations
  async listIncidentServices(params?: {
    include?: v2.IncidentRelatedObject;
    pageSize?: number;
    pageOffset?: number;
    filter?: string;
  }): Promise<v2.IncidentServicesResponse> {
    return this.incidentServicesApi.listIncidentServices(params);
  }

  async createIncidentService(params: {
    body: v2.IncidentServiceCreateRequest;
  }): Promise<v2.IncidentServiceResponse> {
    return this.incidentServicesApi.createIncidentService(params);
  }

  async getIncidentService(params: {
    serviceId: string;
    include?: v2.IncidentRelatedObject;
  }): Promise<v2.IncidentServiceResponse> {
    return this.incidentServicesApi.getIncidentService(params);
  }

  async updateIncidentService(params: {
    serviceId: string;
    body: v2.IncidentServiceUpdateRequest;
  }): Promise<v2.IncidentServiceResponse> {
    return this.incidentServicesApi.updateIncidentService(params);
  }

  async deleteIncidentService(params: { serviceId: string }): Promise<void> {
    return this.incidentServicesApi.deleteIncidentService(params);
  }

  // Incident Teams operations
  async listIncidentTeams(params?: {
    include?: v2.IncidentRelatedObject;
    pageSize?: number;
    pageOffset?: number;
    filter?: string;
  }): Promise<v2.IncidentTeamsResponse> {
    return this.incidentTeamsApi.listIncidentTeams(params);
  }

  async createIncidentTeam(params: { body: v2.IncidentTeamCreateRequest }): Promise<v2.IncidentTeamResponse> {
    return this.incidentTeamsApi.createIncidentTeam(params);
  }

  async getIncidentTeam(params: {
    teamId: string;
    include?: v2.IncidentRelatedObject;
  }): Promise<v2.IncidentTeamResponse> {
    return this.incidentTeamsApi.getIncidentTeam(params);
  }

  async updateIncidentTeam(params: {
    teamId: string;
    body: v2.IncidentTeamUpdateRequest;
  }): Promise<v2.IncidentTeamResponse> {
    return this.incidentTeamsApi.updateIncidentTeam(params);
  }

  async deleteIncidentTeam(params: { teamId: string }): Promise<void> {
    return this.incidentTeamsApi.deleteIncidentTeam(params);
  }

  // Users operations
  async listUsers(params?: {
    pageSize?: number;
    pageNumber?: number;
    sort?: string;
    sortDir?: v2.QuerySortOrder;
    filter?: string;
    filterStatus?: string;
  }): Promise<v2.UsersResponse> {
    return this.usersApi.listUsers(params);
  }

  async createUser(params: { body: v2.UserCreateRequest }): Promise<v2.UserResponse> {
    return this.usersApi.createUser(params);
  }

  async getUser(params: { userId: string }): Promise<v2.UserResponse> {
    return this.usersApi.getUser(params);
  }

  async updateUser(params: { userId: string; body: v2.UserUpdateRequest }): Promise<v2.UserResponse> {
    return this.usersApi.updateUser(params);
  }

  async disableUser(params: { userId: string }): Promise<void> {
    return this.usersApi.disableUser(params);
  }

  // Roles operations
  async listRoles(params?: {
    pageSize?: number;
    pageNumber?: number;
    sort?: v2.RolesSort;
    sortDir?: v2.QuerySortOrder;
    filter?: string;
  }): Promise<v2.RolesResponse> {
    return this.rolesApi.listRoles(params);
  }

  async createRole(params: { body: v2.RoleCreateRequest }): Promise<v2.RoleCreateResponse> {
    return this.rolesApi.createRole(params);
  }

  async getRole(params: { roleId: string }): Promise<v2.RoleResponse> {
    return this.rolesApi.getRole(params);
  }

  async updateRole(params: { roleId: string; body: v2.RoleUpdateRequest }): Promise<v2.RoleUpdateResponse> {
    return this.rolesApi.updateRole(params);
  }

  async deleteRole(params: { roleId: string }): Promise<void> {
    return this.rolesApi.deleteRole(params);
  }

  async listRolePermissions(params: { roleId: string }): Promise<v2.PermissionsResponse> {
    return this.rolesApi.listRolePermissions(params);
  }

  async addPermissionToRole(params: {
    roleId: string;
    body: v2.RelationshipToPermission;
  }): Promise<v2.PermissionsResponse> {
    return this.rolesApi.addPermissionToRole(params);
  }

  async removePermissionFromRole(params: {
    roleId: string;
    body: v2.RelationshipToPermission;
  }): Promise<v2.PermissionsResponse> {
    return this.rolesApi.removePermissionFromRole(params);
  }

  async listRoleUsers(params: {
    roleId: string;
    pageSize?: number;
    pageNumber?: number;
    sort?: string;
    sortDir?: v2.QuerySortOrder;
    filter?: string;
  }): Promise<v2.UsersResponse> {
    return this.rolesApi.listRoleUsers(params);
  }

  // Teams operations
  async listTeams(params?: {
    pageNumber?: number;
    pageSize?: number;
    sort?: v2.ListTeamsSort;
    include?: Array<v2.ListTeamsInclude>;
    filterKeyword?: string;
    filterMe?: boolean;
  }): Promise<v2.TeamsResponse> {
    return this.teamsApi.listTeams(params);
  }

  async createTeam(params: { body: v2.TeamCreateRequest }): Promise<v2.TeamResponse> {
    return this.teamsApi.createTeam(params);
  }

  async getTeam(params: { teamId: string }): Promise<v2.TeamResponse> {
    return this.teamsApi.getTeam(params);
  }

  async updateTeam(params: { teamId: string; body: v2.TeamUpdateRequest }): Promise<v2.TeamResponse> {
    return this.teamsApi.updateTeam(params);
  }

  async deleteTeam(params: { teamId: string }): Promise<void> {
    return this.teamsApi.deleteTeam(params);
  }

  // Organizations operations
  async listOrgs(): Promise<v1.OrganizationListResponse> {
    return this.organizationsApi.listOrgs();
  }

  async getOrg(params: { publicId: string }): Promise<v1.OrganizationResponse> {
    return this.organizationsApi.getOrg(params);
  }

  async updateOrg(params: { publicId: string; body: v1.Organization }): Promise<v1.OrganizationResponse> {
    return this.organizationsApi.updateOrg(params);
  }

  // Note: uploadIdPMetadata requires file upload handling, not yet implemented
  // async uploadIdPMetadata(params: { publicId: string; idpFile: any }): Promise<v1.IdpResponse> {
  //   return this.organizationsApi.uploadIdPForOrg(params);
  // }

  // AWS Integration operations
  async listAWSAccounts(): Promise<v1.AWSAccountListResponse> {
    return this.awsIntegrationApi.listAWSAccounts();
  }

  async createAWSAccount(params: { body: v1.AWSAccount }): Promise<v1.AWSAccountCreateResponse> {
    return this.awsIntegrationApi.createAWSAccount(params);
  }

  async deleteAWSAccount(params: { body: v1.AWSAccountDeleteRequest }): Promise<any> {
    return this.awsIntegrationApi.deleteAWSAccount(params);
  }

  async listAWSLogServices(): Promise<v1.AWSLogsListServicesResponse[]> {
    return this.awsLogsIntegrationApi.listAWSLogsServices();
  }

  async enableAWSLogServices(params: { body: v1.AWSLogsServicesRequest }): Promise<any> {
    return this.awsLogsIntegrationApi.enableAWSLogServices(params);
  }

  // Azure Integration operations
  async listAzureIntegration(): Promise<v1.AzureAccount[]> {
    return this.azureIntegrationApi.listAzureIntegration();
  }

  async createAzureIntegration(params: { body: v1.AzureAccount }): Promise<any> {
    return this.azureIntegrationApi.createAzureIntegration(params);
  }

  async deleteAzureIntegration(params: { body: v1.AzureAccount }): Promise<any> {
    return this.azureIntegrationApi.deleteAzureIntegration(params);
  }

  async updateAzureIntegration(params: { body: v1.AzureAccount }): Promise<any> {
    return this.azureIntegrationApi.updateAzureIntegration(params);
  }

  async updateAzureHostFilters(params: { body: v1.AzureAccount }): Promise<any> {
    return this.azureIntegrationApi.updateAzureHostFilters(params);
  }

  // GCP Integration operations
  async listGCPIntegration(): Promise<v1.GCPAccount[]> {
    return this.gcpIntegrationApi.listGCPIntegration();
  }

  async createGCPIntegration(params: { body: v1.GCPAccount }): Promise<any> {
    return this.gcpIntegrationApi.createGCPIntegration(params);
  }

  async deleteGCPIntegration(params: { body: v1.GCPAccount }): Promise<any> {
    return this.gcpIntegrationApi.deleteGCPIntegration(params);
  }

  async updateGCPIntegration(params: { body: v1.GCPAccount }): Promise<any> {
    return this.gcpIntegrationApi.updateGCPIntegration(params);
  }

  // Security Monitoring operations
  async listSecurityMonitoringRules(params?: {
    pageSize?: number;
    pageNumber?: number;
  }): Promise<v2.SecurityMonitoringListRulesResponse> {
    return this.securityMonitoringApi.listSecurityMonitoringRules(params);
  }

  async createSecurityMonitoringRule(params: {
    body: v2.SecurityMonitoringRuleCreatePayload;
  }): Promise<v2.SecurityMonitoringRuleResponse> {
    return this.securityMonitoringApi.createSecurityMonitoringRule(params);
  }

  async getSecurityMonitoringRule(params: { ruleId: string }): Promise<v2.SecurityMonitoringRuleResponse> {
    return this.securityMonitoringApi.getSecurityMonitoringRule(params);
  }

  async updateSecurityMonitoringRule(params: {
    ruleId: string;
    body: v2.SecurityMonitoringRuleUpdatePayload;
  }): Promise<v2.SecurityMonitoringRuleResponse> {
    return this.securityMonitoringApi.updateSecurityMonitoringRule(params);
  }

  async deleteSecurityMonitoringRule(params: { ruleId: string }): Promise<void> {
    return this.securityMonitoringApi.deleteSecurityMonitoringRule(params);
  }

  async listSecurityMonitoringSignals(params?: {
    filterQuery?: string;
    filterFrom?: Date;
    filterTo?: Date;
    sort?: v2.SecurityMonitoringSignalsSort;
    pageCursor?: string;
    pageLimit?: number;
  }): Promise<v2.SecurityMonitoringSignalsListResponse> {
    return this.securityMonitoringApi.listSecurityMonitoringSignals(params);
  }

  // RUM operations
  async searchRUMEvents(params: { body: v2.RUMSearchEventsRequest }): Promise<v2.RUMEventsResponse> {
    return this.rumApi.searchRUMEvents(params);
  }

  async aggregateRUMEvents(params: { body: v2.RUMAggregateRequest }): Promise<v2.RUMAggregationBucketsResponse> {
    return this.rumApi.aggregateRUMEvents(params);
  }

  async listRUMApplications(): Promise<v2.RUMApplicationsResponse> {
    return this.rumApi.getRUMApplications();
  }

  async createRUMApplication(params: { body: v2.RUMApplicationCreateRequest }): Promise<v2.RUMApplicationResponse> {
    return this.rumApi.createRUMApplication(params);
  }

  async getRUMApplication(params: { id: string }): Promise<v2.RUMApplicationResponse> {
    return this.rumApi.getRUMApplication(params);
  }

  async updateRUMApplication(params: {
    id: string;
    body: v2.RUMApplicationUpdateRequest;
  }): Promise<v2.RUMApplicationResponse> {
    return this.rumApi.updateRUMApplication(params);
  }

  async deleteRUMApplication(params: { id: string }): Promise<void> {
    return this.rumApi.deleteRUMApplication(params);
  }

  // Service Definition operations
  async listServiceDefinitions(params?: {
    pageSize?: number;
    pageNumber?: number;
    schemaVersion?: v2.ServiceDefinitionSchemaVersions;
  }): Promise<v2.ServiceDefinitionsListResponse> {
    return this.serviceDefinitionApi.listServiceDefinitions(params);
  }

  async createOrUpdateServiceDefinitions(params: {
    body: v2.ServiceDefinitionV2Dot2;
  }): Promise<v2.ServiceDefinitionCreateResponse> {
    return this.serviceDefinitionApi.createOrUpdateServiceDefinitions(params);
  }

  async getServiceDefinition(params: {
    serviceName: string;
    schemaVersion?: v2.ServiceDefinitionSchemaVersions;
  }): Promise<v2.ServiceDefinitionGetResponse> {
    return this.serviceDefinitionApi.getServiceDefinition(params);
  }

  async deleteServiceDefinition(params: { serviceName: string }): Promise<void> {
    return this.serviceDefinitionApi.deleteServiceDefinition(params);
  }

  // Dashboard Lists operations
  async listDashboardLists(): Promise<v1.DashboardListListResponse> {
    return this.dashboardListsApi.listDashboardLists();
  }

  async createDashboardList(params: { body: v1.DashboardList }): Promise<v1.DashboardList> {
    return this.dashboardListsApi.createDashboardList(params);
  }

  async getDashboardList(params: { listId: number }): Promise<v1.DashboardList> {
    return this.dashboardListsApi.getDashboardList(params);
  }

  async updateDashboardList(params: {
    listId: number;
    body: v1.DashboardList;
  }): Promise<v1.DashboardList> {
    return this.dashboardListsApi.updateDashboardList(params);
  }

  async deleteDashboardList(params: { listId: number }): Promise<v1.DashboardListDeleteResponse> {
    return this.dashboardListsApi.deleteDashboardList(params);
  }

  // Note: Dashboard list item management methods not available in current SDK version
  // async addDashboardsToDashboardList(params: {
  //   listId: number;
  //   body: any;
  // }): Promise<any> {
  //   return this.dashboardListsApi.createDashboardListItems(params);
  // }

  // async deleteDashboardsFromDashboardList(params: {
  //   listId: number;
  //   body: any;
  // }): Promise<any> {
  //   return this.dashboardListsApi.deleteDashboardListItems(params);
  // }

  // Key Management operations
  async listAPIKeys(params?: {
    pageSize?: number;
    pageNumber?: number;
    sort?: v2.APIKeysSort;
    sortDir?: v2.QuerySortOrder;
    filter?: string;
    filterCreatedAtStart?: string;
    filterCreatedAtEnd?: string;
    filterModifiedAtStart?: string;
    filterModifiedAtEnd?: string;
    include?: string;
  }): Promise<v2.APIKeysResponse> {
    return this.keyManagementApi.listAPIKeys(params);
  }

  async createAPIKey(params: { body: v2.APIKeyCreateRequest }): Promise<v2.APIKeyResponse> {
    return this.keyManagementApi.createAPIKey(params);
  }

  async getAPIKey(params: { apiKeyId: string; include?: string }): Promise<v2.APIKeyResponse> {
    return this.keyManagementApi.getAPIKey(params);
  }

  async updateAPIKey(params: {
    apiKeyId: string;
    body: v2.APIKeyUpdateRequest;
  }): Promise<v2.APIKeyResponse> {
    return this.keyManagementApi.updateAPIKey(params);
  }

  async deleteAPIKey(params: { apiKeyId: string }): Promise<void> {
    return this.keyManagementApi.deleteAPIKey(params);
  }

  async listApplicationKeys(params?: {
    pageSize?: number;
    pageNumber?: number;
    sort?: v2.ApplicationKeysSort;
    sortDir?: v2.QuerySortOrder;
    filter?: string;
    filterCreatedAtStart?: string;
    filterCreatedAtEnd?: string;
    include?: string;
  }): Promise<v2.ListApplicationKeysResponse> {
    return this.keyManagementApi.listApplicationKeys(params);
  }

  // Note: createApplicationKey method not available in current SDK version
  // async createApplicationKey(params: {
  //   body: v2.ApplicationKeyCreateRequest;
  // }): Promise<v2.ApplicationKeyResponse> {
  //   return this.keyManagementApi.createApplicationKey(params);
  // }

  async getApplicationKey(params: {
    appKeyId: string;
    include?: string;
  }): Promise<v2.ApplicationKeyResponse> {
    return this.keyManagementApi.getApplicationKey(params);
  }

  async updateApplicationKey(params: {
    appKeyId: string;
    body: v2.ApplicationKeyUpdateRequest;
  }): Promise<v2.ApplicationKeyResponse> {
    return this.keyManagementApi.updateApplicationKey(params);
  }

  async deleteApplicationKey(params: { appKeyId: string }): Promise<void> {
    return this.keyManagementApi.deleteApplicationKey(params);
  }

  // Notebooks operations
  async listNotebooks(): Promise<v1.NotebooksResponse> {
    return this.notebooksApi.listNotebooks();
  }

  async createNotebook(params: { body: v1.NotebookCreateRequest }): Promise<v1.NotebookResponse> {
    return this.notebooksApi.createNotebook(params);
  }

  async getNotebook(params: { notebookId: number }): Promise<v1.NotebookResponse> {
    return this.notebooksApi.getNotebook(params);
  }

  async updateNotebook(params: {
    notebookId: number;
    body: v1.NotebookUpdateRequest;
  }): Promise<v1.NotebookResponse> {
    return this.notebooksApi.updateNotebook(params);
  }

  async deleteNotebook(params: { notebookId: number }): Promise<void> {
    return this.notebooksApi.deleteNotebook(params);
  }

  // Webhooks Integration operations
  async createWebhooksIntegration(params: {
    body: v1.WebhooksIntegration;
  }): Promise<v1.WebhooksIntegration> {
    return this.webhooksIntegrationApi.createWebhooksIntegration(params);
  }

  async getWebhooksIntegration(params: { webhookName: string }): Promise<v1.WebhooksIntegration> {
    return this.webhooksIntegrationApi.getWebhooksIntegration(params);
  }

  async updateWebhooksIntegration(params: {
    webhookName: string;
    body: v1.WebhooksIntegrationUpdateRequest;
  }): Promise<v1.WebhooksIntegration> {
    return this.webhooksIntegrationApi.updateWebhooksIntegration(params);
  }

  async deleteWebhooksIntegration(params: { webhookName: string }): Promise<void> {
    return this.webhooksIntegrationApi.deleteWebhooksIntegration(params);
  }

  // Usage & Billing operations
  async getUsageSummary(params: {
    startMonth: Date;
    endMonth?: Date;
    includeOrgDetails?: boolean;
  }): Promise<v1.UsageSummaryResponse> {
    return this.usageMeteringApi.getUsageSummary(params);
  }

  async getUsageHosts(params: { startHr: Date; endHr?: Date }): Promise<v1.UsageHostsResponse> {
    return this.usageMeteringApi.getUsageHosts(params);
  }

  async getUsageLogs(params: { startHr: Date; endHr?: Date }): Promise<v1.UsageLogsResponse> {
    return this.usageMeteringApi.getUsageLogs(params);
  }

  async getUsageTimeseries(params: {
    startHr: Date;
    endHr?: Date;
  }): Promise<v1.UsageTimeseriesResponse> {
    return this.usageMeteringApi.getUsageTimeseries(params);
  }

  async getUsageTopAvgMetrics(params: {
    month?: Date;
    day?: Date;
    names?: string[];
    limit?: number;
  }): Promise<v1.UsageTopAvgMetricsResponse> {
    return this.usageMeteringApi.getUsageTopAvgMetrics(params);
  }
}
