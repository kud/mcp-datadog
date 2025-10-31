# Datadog MCP Server

```
██████╗  █████╗ ████████╗ █████╗ ██████╗  ██████╗  ██████╗     ███╗   ███╗ ██████╗██████╗
██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗██╔════╝     ████╗ ████║██╔════╝██╔══██╗
██║  ██║███████║   ██║   ███████║██║  ██║██║   ██║██║  ███╗    ██╔████╔██║██║     ██████╔╝
██║  ██║██╔══██║   ██║   ██╔══██║██║  ██║██║   ██║██║   ██║    ██║╚██╔╝██║██║     ██╔═══╝
██████╔╝██║  ██║   ██║   ██║  ██║██████╔╝╚██████╔╝╚██████╔╝    ██║ ╚═╝ ██║╚██████╗██║
╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚═════╝  ╚═════╝  ╚═════╝     ╚═╝     ╚═╝ ╚═════╝╚═╝
```

<div align="center">

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20+-green?logo=node.js&logoColor=white)](https://nodejs.org/)
[![MCP](https://img.shields.io/badge/MCP-1.0-purple?logo=anthropic)](https://modelcontextprotocol.io/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

**A Datadog MCP server for monitoring, metrics, logs, dashboards, and observability**

[Features](#-features) • [Quick Start](#-quick-start) • [Installation](#-installation) • [Tools](#-available-tools) • [Development](#-development)

</div>

---

## 🌟 Features

### **176 Tools Across All Datadog APIs** ✨ **100% Coverage**

- **📊 Monitors** - Full CRUD + search, validate, update
- **📈 Metrics** - Submit, query, list active, manage metadata
- **📝 Logs** - List, aggregate, archives, pipelines, indexes, metrics
- **🎨 Dashboards** - Full CRUD + dashboard lists management
- **🔔 Events** - Create and list events
- **⏱️ Downtimes** - Full CRUD operations
- **🔍 APM & Tracing** - List/aggregate spans, retention filters, service catalog
- **🎯 SLOs** - Full CRUD + history tracking
- **🤖 Synthetics** - Full test management (API & Browser tests)
- **🚨 Incidents** - Full CRUD + incident services & teams
- **👥 Users & Roles** - Complete IAM management
- **🏷️ Tags & Hosts** - Tag management, host monitoring & muting
- **🏢 Organizations & Teams** - Multi-org and team management
- **☁️ Cloud Integrations** - AWS, Azure, and GCP integrations
- **🔒 Security Monitoring** - Security rules and monitoring
- **📱 RUM** - Real User Monitoring application management
- **🔑 Key Management** - API keys and application keys
- **📔 Notebooks** - Collaborative notebook management
- **🔗 Webhooks** - Webhook integration management
- **💰 Usage & Billing** - Usage tracking and billing information
- **🔐 Secure Authentication** - API and Application key support
- **🌍 Multi-Region** - Support for US, EU, and other Datadog sites
- **⚡ Modern Stack** - TypeScript 5.3+, ES2023, Official Datadog SDK
- **📦 MCP Protocol** - Native integration with Claude Desktop, Claude Code CLI

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- Datadog API and Application keys ([how to get them](#-authentication))

### Installation

**Option 1: Via npx (recommended):**
```bash
npx --yes @kud/mcp-datadog@latest
```

**Option 2: Via npm global install:**
```bash
npm install -g @kud/mcp-datadog
```

**Option 3: From source:**
```bash
git clone <repository-url>
cd mcp-datadog
npm install
npm run build
npm start
```

### Authentication

You need two keys from your Datadog account:

1. **API Key**: [Organization Settings > API Keys](https://app.datadoghq.com/organization-settings/api-keys)
2. **Application Key**: [Organization Settings > Application Keys](https://app.datadoghq.com/organization-settings/application-keys)

Set them as environment variables:

```bash
export DD_API_KEY="your-datadog-api-key"
export DD_APP_KEY="your-datadog-application-key"

# Optional: for EU or other regions
export DD_SITE="datadoghq.eu"  # Default: datadoghq.com

# Optional: Filter tools by category (see Tool Filtering section below)
# Defaults to 'essential' if not specified
export DD_TOOL_CATEGORIES="essential"  # or "all", "monitoring", "observability", etc.
```

### 🎯 Tool Filtering

**By default, the server uses the `essential` preset** which focuses on debugging and understanding traces - the core tools developers need to investigate issues (~30-40 tools).

You can change this behavior using the `DD_TOOL_CATEGORIES` environment variable.

**Available Presets:**

- `essential` (default) - **Trace debugging focused**: APM/spans, service catalog, logs, metrics queries, events, monitors (read-only) - **~35 tools**
- `observability` - **Full observability stack**: APM, logs, metrics, RUM, service catalog, events - **~50 tools**
- `monitoring` - **Alerting management**: monitors, downtimes, SLOs, synthetics, incidents - **~45 tools**
- `management` - **Workspace management**: dashboards, users, roles, teams, organizations, keys, notebooks - **~40 tools**
- `all` - **All tools**: Disable filtering and expose all 176 tools - **~176 tools**

**Custom Categories:**

You can also specify a comma-separated list of specific categories:

```bash
# Only enable monitors and dashboards
export DD_TOOL_CATEGORIES="monitors,dashboards"

# Enable metrics, logs, and APM
export DD_TOOL_CATEGORIES="metrics,logs,apm"
```

**Available Categories:**

`monitors`, `dashboards`, `metrics`, `logs`, `events`, `downtimes`, `slos`, `synthetics`, `incidents`, `users`, `roles`, `tags`, `hosts`, `organizations`, `teams`, `integrations`, `security`, `rum`, `apm`, `service-catalog`, `dashboard-lists`, `api-keys`, `notebooks`, `webhooks`, `usage`

**Example Usage:**

```bash
# Use default (essential preset for trace debugging)
npx @kud/mcp-datadog@latest

# Use all tools
export DD_TOOL_CATEGORIES="all"
npx @kud/mcp-datadog@latest

# Use specific preset
export DD_TOOL_CATEGORIES="observability"
npx @kud/mcp-datadog@latest

# Use specific categories
export DD_TOOL_CATEGORIES="monitors,metrics,dashboards"
npx @kud/mcp-datadog@latest
```

---

## 📦 Installation Guides

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "datadog": {
      "command": "npx",
      "args": ["--yes", "@kud/mcp-datadog@latest"],
      "env": {
        "DD_API_KEY": "your-api-key",
        "DD_APP_KEY": "your-app-key",
        "DD_SITE": "datadoghq.com"
      }
    }
  }
}
```

To use all tools or a different preset, add `"DD_TOOL_CATEGORIES": "all"` to the env section.

**Config file locations:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Claude Code CLI

**Option 1: Using the CLI command (recommended):**

```bash
# Default (essential preset)
claude mcp add --transport stdio --scope user datadog \
  --env DD_API_KEY=your-api-key \
  --env DD_APP_KEY=your-app-key \
  --env DD_SITE=datadoghq.com \
  -- npx --yes @kud/mcp-datadog@latest

# Or with all tools enabled
claude mcp add --transport stdio --scope user datadog \
  --env DD_API_KEY=your-api-key \
  --env DD_APP_KEY=your-app-key \
  --env DD_SITE=datadoghq.com \
  --env DD_TOOL_CATEGORIES=all \
  -- npx --yes @kud/mcp-datadog@latest
```

**Option 2: Manual configuration in `.clauderc`:**

```json
{
  "mcpServers": {
    "datadog": {
      "command": "npx",
      "args": ["--yes", "@kud/mcp-datadog@latest"],
      "env": {
        "DD_API_KEY": "your-api-key",
        "DD_APP_KEY": "your-app-key",
        "DD_SITE": "datadoghq.com"
      }
    }
  }
}
```

Optionally add `"DD_TOOL_CATEGORIES": "all"` to the env section for all tools.

### Other MCP Clients

The server works with any MCP-compatible client. Refer to your client's documentation for configuration details.

---

## 🛠️ Available Tools

**176 tools available across 28 categories** covering 100% of the Datadog API surface.

> **Note**: For the complete list of all 176 tools with full parameter specifications, see the tool definitions in `src/index.ts` or use your MCP client's tool listing feature.

### Quick Reference by Category

| Category | Tools | Operations |
|----------|-------|------------|
| **Monitors** | 7 | list, get, create, update, delete, search, validate |
| **Metrics** | 5 | submit, query, list_active, get_metadata, update_metadata |
| **Logs** | 18 | list, aggregate, archives (full CRUD), pipelines (full CRUD), indexes (get, list, update), metrics (full CRUD) |
| **Dashboards** | 8 | list, get, create, update, delete, lists (full CRUD) |
| **Events** | 3 | list, get, create |
| **Service Checks** | 1 | submit_service_check |
| **Downtimes** | 5 | list, get, create, update, cancel |
| **APM & Tracing** | 8 | list_spans, aggregate_spans, retention_filters (full CRUD) |
| **Service Catalog** | 4 | list_services, get_service, create_or_update, delete |
| **SLOs** | 7 | list, get, create, update, delete, get_history, search |
| **Synthetics** | 8 | list, get, create, update, delete, get_results, trigger, list_locations |
| **Incidents** | 16 | incidents (full CRUD + search), services (full CRUD), teams (full CRUD) |
| **Users** | 5 | list, get, create, update, disable |
| **Roles** | 9 | list, get, create, update, delete, list_permissions, add/remove_permission, list_users |
| **Tags** | 5 | list_host_tags, get_host_tags, create_host_tags, update_host_tags, delete_host_tags |
| **Hosts** | 4 | list, get_totals, mute, unmute |
| **Organizations** | 3 | list, get, update |
| **Teams** | 5 | list, get, create, update, delete |
| **Cloud Integrations** | 12 | AWS (list, create, delete, log_services), Azure (full CRUD + host_filters), GCP (full CRUD) |
| **Security Monitoring** | 6 | list_rules, get_rule, create_rule, update_rule, delete_rule, list_signals |
| **RUM** | 7 | list_applications, get_application, create_application, update_application, delete_application, search_events, aggregate_events |
| **Dashboard Lists** | 5 | list, get, create, update, delete |
| **Key Management** | 9 | API keys (full CRUD + list), App keys (full CRUD + list) |
| **Notebooks** | 5 | list, get, create, update, delete |
| **Webhooks** | 4 | get, create, update, delete |
| **Usage & Billing** | 5 | get_summary, get_hosts, get_logs, get_timeseries, get_top_avg_metrics |

---

### Sample Tool Usage

Below are examples for key tool categories. All tools follow similar patterns.

### Monitor Operations

#### `datadog_list_monitors`
List all Datadog monitors with optional filters.

**Parameters:**
- `groupStates` (optional): Filter by monitor group states
- `name` (optional): Filter monitors by name
- `tags` (optional): Filter by tags
- `monitorTags` (optional): Filter by monitor tags

**Example:**
```json
{
  "name": "cpu",
  "tags": "env:production"
}
```

#### `datadog_get_monitor`
Get detailed information about a specific monitor.

**Parameters:**
- `monitorId` (required): Monitor ID

#### `datadog_create_monitor`
Create a new Datadog monitor.

**Parameters:**
- `name` (required): Monitor name
- `type` (required): Monitor type (e.g., "metric alert", "service check")
- `query` (required): Monitor query
- `message` (optional): Notification message
- `tags` (optional): Array of tags
- `options` (optional): Monitor options (thresholds, etc.)

**Example:**
```json
{
  "name": "High CPU Usage",
  "type": "metric alert",
  "query": "avg(last_5m):avg:system.cpu.user{*} > 90",
  "message": "CPU usage is above 90%",
  "tags": ["env:production", "team:backend"]
}
```

---

### Additional Tool Categories

All other tool categories (SLOs, Synthetics, Incidents, Users, Roles, Teams, Organizations, Cloud Integrations, Security, RUM, Notebooks, Webhooks, Usage, etc.) follow the same pattern with consistent CRUD operations where applicable.

**To discover all tools:**
- In Claude Desktop/Code: Tools are auto-discovered
- Via MCP Inspector: `npm run inspector`
- In code: See `src/index.ts` for full tool definitions

---

### Dashboard Operations

**Key tools**: `datadog_list_dashboards`, `datadog_get_dashboard`, `datadog_create_dashboard`, `datadog_update_dashboard`, `datadog_delete_dashboard`

---

### Metrics Operations

**Key tools**: `datadog_submit_metrics`, `datadog_query_metrics`, `datadog_list_active_metrics`, `datadog_get_metric_metadata`, `datadog_update_metric_metadata`

**Example** - Submit custom metrics:
```json
{
  "series": [{
    "metric": "my.custom.metric",
    "type": 2,
    "points": [{"timestamp": 1234567890, "value": 42.5}],
    "tags": ["env:production"]
  }]
}
```

---

### Other Operations

**Logs**: `datadog_list_logs`, `datadog_aggregate_logs`, plus archives, pipelines, indexes, and metrics management

**Events**: `datadog_list_events`, `datadog_create_event`

**Downtimes**: Full CRUD operations with `datadog_list_downtimes`, `datadog_get_downtime`, `datadog_create_downtime`, etc.

**APM & Tracing**: `datadog_list_spans`, `datadog_aggregate_spans`, retention filters, service catalog

**For complete documentation of all 139 tools**, see:
- Tool definitions in `src/index.ts`
- Interactive discovery via MCP Inspector: `npm run inspector`
- Your MCP client's tool listing feature

---

## 🔧 Development

### Building

```bash
npm run build        # Compile TypeScript
npm run build:watch  # Watch mode
npm run clean        # Clean build artifacts
```

### Running

```bash
npm run dev          # Development mode with tsx
npm start            # Production mode (requires build)
```

### Testing

```bash
npm test             # Run tests
npm run test:watch   # Watch mode
npm run test:ui      # UI mode
npm run test:coverage # Coverage report
```

### Type Checking

```bash
npm run typecheck
```

### MCP Inspector

Use the MCP Inspector to debug and test tools:

```bash
npm run inspect      # Inspector with built code
npm run inspect:dev  # Inspector with source code
```

---

## 📁 Architecture

```
src/
├── index.ts              # MCP server entry point
├── lib/
│   └── datadog-client.ts # Datadog API client wrapper
├── common/
│   ├── env.ts            # Environment configuration
│   ├── errors.ts         # Error handling
│   ├── http.ts           # HTTP utilities
│   ├── logger.ts         # Logging utilities
│   └── index.ts          # Barrel exports
└── tools/
    ├── list-monitors.ts  # Monitor listing
    ├── get-monitor.ts    # Get monitor details
    ├── create-monitor.ts # Create monitor
    ├── submit-metrics.ts # Submit metrics
    ├── query-metrics.ts  # Query metrics
    ├── list-logs.ts      # List logs
    └── ...               # Other tool implementations
```

---

## 🔒 Security Best Practices

1. **Never commit API keys**: Always use environment variables
2. **Use read-only keys when possible**: Create separate API keys with minimal permissions
3. **Rotate keys regularly**: Change your API and Application keys periodically
4. **Monitor API usage**: Keep track of API calls in your Datadog account
5. **Use .env files for local development**: Add `.env` to your `.gitignore`

---

## ❓ Troubleshooting

### "Missing DD_API_KEY environment variable"
Make sure you've set the `DD_API_KEY` environment variable with your Datadog API key.

### "Missing DD_APP_KEY environment variable"
Make sure you've set the `DD_APP_KEY` environment variable with your Datadog Application key.

### Authentication errors
- Verify your API and Application keys are correct
- Check that your keys have the necessary permissions
- Ensure you're using the correct `DD_SITE` for your region

### Connection issues
- Check your internet connection
- Verify you can access the Datadog API from your network
- Check if you need to configure a proxy

---

## 📚 API Reference

For detailed information about the Datadog API, refer to:
- [Datadog API Documentation](https://docs.datadoghq.com/api/latest/)
- [Datadog TypeScript Client](https://github.com/DataDog/datadog-api-client-typescript)

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📄 License

MIT

---

## 🔗 Links

- [Datadog API Documentation](https://docs.datadoghq.com/api/latest/)
- [Datadog TypeScript Client](https://github.com/DataDog/datadog-api-client-typescript)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [Datadog Community](https://datadoghq.com/community/)

---

<div align="center">

**Made with ❤️ for the Datadog and MCP communities**

</div>
