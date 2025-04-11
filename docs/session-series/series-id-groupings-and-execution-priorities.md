# ✅ GitHub Repository Context

```yaml
metadata:
  repo_primary: NU-DATA-UI
  purpose: Full-stack SaaS platform for contact data enrichment, segmentation, and integration
  tech_stack:
    - React.js (Frontend)
    - Node.js (Backend)
    - PostgreSQL (Database)
    - OpenAPI 3.1.0 (API Spec)
    - FTP/Webhooks (Integration)
    - CI/CD (GitHub Actions)
    - Optional: Kamailio SIP integration (via middleware or service abstraction)
```

---

## 🔢 Series ID Groupings & Execution Priorities

Here’s the **updated Series ID layout** for Phase 1 sessions, including new Series introduced for foundational infrastructure, AI scoring, shared utilities, and export analytics:

| **Series** | **Session Area**           | **Focus**                                                                 | **Suggested Order** | **Parallel Group** |
|------------|----------------------------|---------------------------------------------------------------------------|----------------------|---------------------|
| `R`        | Project Roadmap & Docs     | Project overview, functional objectives, key feature mapping              | ✅ Complete          | G0                  |
| `M1`       | Frontend Planning          | UI/UX scoping, navigation structure, React layout skeleton                | Parallel with `B1`   | G1                  |
| `B1`       | Backend Planning           | API structure, service boundaries, data flow (OpenAPI 3.1)                | Parallel with `M1`   | G1                  |
| `DA1`      | Data Architecture          | PostgreSQL schema, multi-tenancy design, foreign key integrity            | Follows `B1`         | G2                  |
| `SE1`      | Security Architecture      | JWT/AuthN/AuthZ flow, RBAC, token structure, API security                 | Parallel with `DA1`  | G2                  |
| `LLM1`     | AI Enrichment Scoring Plan | RPC/WPC scoring design, fuzzy logic on phone name lookup                 | After `DA1`          | G3                  |
| `D1`       | CI/CD Planning             | GitHub Actions, dev/stage/production pipeline definitions                 | Parallel with all    | G4                  |
| `T1`       | Test & Quality Assurance   | Unit/integration/E2E/RPC tests, schema validation, coverage tracking     | Follows `B1`, `SE1`  | G5                  |
| `DS1`      | Export Metrics & Analytics | Dashboard insights from export flows, tag usage, enrichment correlation   | Follows `LLM1`       | G6                  |
| `X1`       | Cross-Cutting Utilities    | Shared logging, error handling, env config, tenant context injectors     | Used across all      | GX                  |
| `I1`       | Infrastructure & DevOps    | Docker Compose, Redis, PostgreSQL, mock SFTP/webhook environment setup    | Parallel to all      | G0                  |

---

## 📂 Phase 1 Session File Index

| **Session File** | **Purpose** |
|------------------|-------------|
| `session-R1-nu-data-ui-roadmap.md` | Create high-level product scope, functional categories, user personas |
| `session-M1-nu-data-ui-ux-framework.md` | UI/UX structure, sidebar nav, right toolbar, dashboard widget planning |
| `session-B1-nu-data-ui-api-structure.md` | Define API endpoints, OpenAPI folder layout, REST patterns |
| `session-DA1-nu-data-ui-db-schema.md` | Multi-tenant PostgreSQL schema, metadata fields, indexing strategy |
| `session-SE1-nu-data-ui-auth-logic.md` | Implement JWT login, RBAC, token parsing, password reset flow |
| `session-D1-nu-data-ui-cicd-pipeline.md` | GitHub Actions for test/lint/deploy; preview and production flows |
| `session-T1-nu-data-ui-testsuite.md` | Create test architecture, coverage targets, RPC test layers |
| `session-LLM1-nu-data-ui-rpc-scoring.md` | Build fuzzy name scoring logic and match type system |
| `session-DS1-nu-data-ui-export-insights.md` | Generate export metrics for dashboard and usage analytics |
| `session-X1-nu-data-ui-utils-core.md` | Shared utils for error formatting, JWT, logging, config parsing |
| `session-I1-nu-data-ui-devops-setup.md` | Compose: PostgreSQL, Redis, API, UI, mock integrations |

---

## 🧠 Execution Status
All Phase 1 session `.md` files have been fully generated and structured using the AI Playbook format. GitHub Issues can now be auto-generated via script, and tasks assigned via GitHub Projects or app.devin.ai.

Phase 2 planning can proceed once Phase 1 sessions begin active development.

