# Session B1 – Backend API Structure & OpenAPI Planning

**Primary Repo**: NU-DATA-UI  
**Date**: 2025-04-11  
**Lead**: @wes  
**Participants**: @devin, @wes

---

## 🎯 Objective
Establish the foundational API structure for all backend services in NU DATA UI. Define RESTful design patterns, organize the OpenAPI 3.1 schema, and align route patterns with UI modules.

---

## 📦 Scope
- Define `/v1/` namespaced RESTful endpoint structure
- Align API paths to UI routing (from M1)
- Organize OpenAPI 3.1 schema YAML files
- JWT bearer auth & multi-tenant context pattern
- Identify shared schema components
- Enable auto-generation of Swagger docs
- Handle webhook/FTP payload models

---

## 🔗 Endpoint Categories
| Area | Prefix | Example Endpoint |
|------|--------|------------------|
| Auth | `/v1/auth` | POST `/login`, POST `/password/reset` |
| Dashboard | `/v1/dashboard` | GET `/metrics`, GET `/healthchecks` |
| Lists | `/v1/lists` | CRUD, entries, metadata |
| Enrichment | `/v1/enrichment-plans` | CRUD, tasks, executions |
| Groups | `/v1/data-groups` | Manual + auto-grouping endpoints |
| Connections | `/v1/connections` | FTP/webhook create/test/delete |
| Export | `/v1/export` | POST export job, GET status/download |
| Blacklist/Whitelist | `/v1/blacklist`, `/v1/whitelist` | Add/remove values |
| Search | `/v1/search` | He-Man multi-model search |

---

## 📘 OpenAPI Schema Strategy
- Use `openapi: 3.1.0` spec
- Modular file system: split schema into `components/`, `paths/`, `tags/`
- Define shared `schemas`:
  - `User`, `Tenant`, `List`, `ListEntry`, `EnrichmentPlan`, `Group`, `Connection`, `ExportJob`, `RPCScore`
- Set `bearerAuth` globally
- Version under `/v1/`
- Include examples + enums for enrichment steps, match types

---

## 🔐 Security Model
- JWT Bearer token in `Authorization` header
- `tenant_id` inferred from token claims
- Role-based access for admin/user scoping

---

## 🔗 Dependencies
- Requires finalized UI routing and Figma context (`M1`)
- Database schemas from `DA1`

---

## 🧪 Testing & Validation
- Validate endpoint inventory vs UI workflows
- Validate all responses adhere to schema + error format
- Preview Swagger via SwaggerHub / Redoc

---

## 🚧 Next Steps
- Generate session: `session-DA1-nu-data-ui-db-schema.md`
- Generate session: `session-SE1-nu-data-ui-auth-logic.md`
- Generate session: `session-D1-nu-data-ui-cicd-pipeline.md`

