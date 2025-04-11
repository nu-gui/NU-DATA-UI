# NU-DATA-UI

## Overview
The NU DATA UI system is a multi-tenant SaaS platform designed to centralize and streamline data enrichment, contact management, campaign analytics, and external system integrations (via FTP/Webhooks).

## Purpose
- Enable organizations to manage and enrich contact data
- Provide RPC/WPC enrichment scoring via Python backend
- Support FTP/webhook automation and integrations
- Offer federated search and data grouping capabilities
- Facilitate export pipelines and metrics
- Deliver real-time and scheduled backend batch processing
- Present dashboard analytics with role-based access control

## Technology Stack
- **Frontend**: React.js
- **Backend**: Node.js / Python
- **Database**: PostgreSQL
- **API Documentation**: OpenAPI 3.1
- **Integration Layer**: FTP / Webhooks
- **CI/CD**: GitHub Actions

## Repository Structure
```
NU-DATA-UI/
├── docs/                     # Project documentation
│   ├── api/                  # API documentation (OpenAPI schema)
│   ├── figma/                # Figma export guides
│   ├── issues/               # Project issues and tasks
│   ├── project-overview/     # High-level project descriptions
│   └── session-series/       # Development session documentation
├── src/                      # Source code (to be implemented)
│   ├── components/           # UI components
│   ├── pages/                # Application pages
│   ├── api/                  # Backend API routes
│   └── services/             # Business logic services
├── scripts/                  # Build and deployment scripts
├── devin/                    # Devin AI working directory
│   ├── logs/                 # Session logs and tracking
│   └── tasks/                # Task definitions and status
├── .github/                  # GitHub configuration (to be implemented)
│   └── workflows/            # CI/CD workflows
└── README.md                 # This file
```

## Getting Started
*Development setup instructions will be added in future sessions*

## License
See the [LICENSE](LICENSE) file for details.
