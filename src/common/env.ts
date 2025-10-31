export interface DatadogEnv {
  DD_API_KEY: string;
  DD_APP_KEY: string;
  DD_SITE?: string;
  DD_TOOL_CATEGORIES?: string;
}

export const loadDatadogEnv = (): DatadogEnv => {
  const { DD_API_KEY, DD_APP_KEY, DD_SITE, DD_TOOL_CATEGORIES } = process.env;

  if (!DD_API_KEY) {
    throw new Error(
      'Missing DD_API_KEY environment variable. Get your API key from https://app.datadoghq.com/organization-settings/api-keys'
    );
  }

  if (!DD_APP_KEY) {
    throw new Error(
      'Missing DD_APP_KEY environment variable. Get your Application key from https://app.datadoghq.com/organization-settings/application-keys'
    );
  }

  return {
    DD_API_KEY,
    DD_APP_KEY,
    DD_SITE, // Optional: defaults to 'datadoghq.com', can be 'datadoghq.eu' for EU, etc.
    DD_TOOL_CATEGORIES, // Optional: comma-separated list of tool categories to enable (e.g., 'monitors,dashboards,metrics')
  };
};
