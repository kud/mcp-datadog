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

- **📊 Monitor Management** - List, create, update, and delete monitors
- **📈 Metrics Operations** - Submit custom metrics and query metric data
- **📝 Logs Management** - Search and retrieve logs from Datadog
- **🎨 Dashboard Access** - View and manage Datadog dashboards
- **🔔 Events** - Create and list events
- **⏱️ Downtime Scheduling** - Manage scheduled downtimes
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
npx @kud/mcp-datadog
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
      "args": ["-y", "@kud/mcp-datadog"],
      "env": {
        "DD_API_KEY": "your-api-key",
        "DD_APP_KEY": "your-app-key",
        "DD_SITE": "datadoghq.com"
      }
    }
  }
}
```

**Config file locations:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`

### Claude Code CLI

Add to your `.clauderc`:

```json
{
  "mcpServers": {
    "datadog": {
      "command": "npx",
      "args": ["-y", "@kud/mcp-datadog"],
      "env": {
        "DD_API_KEY": "your-api-key",
        "DD_APP_KEY": "your-app-key"
      }
    }
  }
}
```

### Other MCP Clients

The server works with any MCP-compatible client. Refer to your client's documentation for configuration details.

---

## 🛠️ Available Tools

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

#### `datadog_delete_monitor`
Delete a monitor.

**Parameters:**
- `monitorId` (required): Monitor ID to delete

---

### Dashboard Operations

#### `datadog_list_dashboards`
List all Datadog dashboards.

**Parameters:**
- `filterShared` (optional): Filter by shared dashboards only

#### `datadog_get_dashboard`
Get detailed information about a specific dashboard.

**Parameters:**
- `dashboardId` (required): Dashboard ID

---

### Metrics Operations

#### `datadog_submit_metrics`
Submit custom metrics to Datadog.

**Parameters:**
- `series` (required): Array of metric series

**Metric Types:**
- `0`: Count
- `1`: Rate
- `2`: Gauge

**Example:**
```json
{
  "series": [
    {
      "metric": "my.custom.metric",
      "type": 2,
      "points": [
        {
          "timestamp": 1234567890,
          "value": 42.5
        }
      ],
      "tags": ["env:production"],
      "unit": "percent"
    }
  ]
}
```

#### `datadog_query_metrics`
Query metrics data from Datadog.

**Parameters:**
- `from` (required): Start time (Unix timestamp)
- `to` (required): End time (Unix timestamp)
- `query` (required): Metric query string

**Example:**
```json
{
  "from": 1234567890,
  "to": 1234571490,
  "query": "avg:system.cpu.user{*}"
}
```

---

### Logs Operations

#### `datadog_list_logs`
Search and list logs from Datadog.

**Parameters:**
- `filterQuery` (optional): Log search query
- `filterFrom` (optional): Start time (ISO 8601 format)
- `filterTo` (optional): End time (ISO 8601 format)
- `sort` (optional): Sort order
- `pageLimit` (optional): Maximum number of logs to return

**Example:**
```json
{
  "filterQuery": "status:error service:api",
  "filterFrom": "2024-01-01T00:00:00Z",
  "filterTo": "2024-01-01T23:59:59Z",
  "pageLimit": 100
}
```

---

### Events Operations

#### `datadog_list_events`
List events from Datadog.

**Parameters:**
- `start` (required): Start time (Unix timestamp)
- `end` (required): End time (Unix timestamp)
- `priority` (optional): Filter by priority (normal or low)
- `sources` (optional): Filter by sources (comma-separated)
- `tags` (optional): Filter by tags (comma-separated)

#### `datadog_create_event`
Create a new event in Datadog.

**Parameters:**
- `title` (required): Event title
- `text` (required): Event description
- `tags` (optional): Event tags
- `alertType` (optional): Alert type (error, warning, info, success)
- `priority` (optional): Priority (normal or low)
- `aggregationKey` (optional): Aggregation key for grouping events

**Example:**
```json
{
  "title": "Deployment completed",
  "text": "Version 1.2.3 deployed to production",
  "tags": ["env:production", "version:1.2.3"],
  "alertType": "success",
  "priority": "normal"
}
```

---

### Downtime Operations

#### `datadog_list_downtimes`
List scheduled downtimes.

**Parameters:**
- `currentOnly` (optional): Only return currently active downtimes

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
