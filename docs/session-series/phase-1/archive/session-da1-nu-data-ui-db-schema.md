# Session DA1 – PostgreSQL Schema & Multi-Tenant Data Architecture

**Primary Repo**: NU-DATA-UI  
**Date**: 2025-04-11  
**Lead**: @wes  
**Participants**: @devin, @wes

---

## 🎯 Objective
Design and implement a PostgreSQL schema optimized for a multi-tenant SaaS system supporting the full feature set of NU DATA UI: list management, enrichment pipelines, segmentation, data grouping, backend processing, exports, analytics, and role-based access control.

---

## 📦 Scope
- Core schema design for:
  - `users`, `tenants`, `lists`, `entries`, `enrichment_plans`, `groups`, `connections`, `exports`, `rpc_scores`
- Add multi-tenancy via `tenant_id` scoping
- Normalize relational mappings with foreign keys
- Use `JSONB` fields for dynamic configs and metadata
- Accommodate enrichment processing by Python backend services
- Support full-text and fuzzy search features
- Optimize for batch processing and asynchronous enrichment jobs

---

## 🧱 Core Tables
| Table | Notes |
|-------|-------|
| `tenants` | Org-level isolation, billing and access control domains |
| `users` | Includes `email`, `role`, password hash, linked `tenant_id` |
| `lists` | Primary metadata for imported/enriched lists |
| `list_entries` | Contact data in `JSONB`, linked to `list_id` |
| `enrichment_plans` | Plan configs and task pipeline per list |
| `data_groups` | RPC/WPC tags, dcode groupings, custom filters |
| `connections` | Webhook or FTP destination configs (dynamic columns) |
| `export_jobs` | Tracks status, filters, tag exports, delivery metadata |
| `rpc_scores` | Fuzzy match scoring log for name + number enrichment |
| `blacklist`, `whitelist` | Accept/reject filters for outbound/export scope |
| `enrichment_queue_jobs` | (Planned) batch job IDs, status, progress logs |

---

## 🔁 Relational Mapping
- `tenant_id` is required on all tenant-aware tables
- `list_id` is the core relational key for entries, exports, enrichment runs
- `entry_id` links enrichment results, scoring logs, group assignments
- `plan_id` maps plan templates to list executions
- `job_id` (async) links enrichment run history to results for backend queues

---

## 🧠 Backend Enrichment Integration
Python backend runners will:
- Pull eligible `list_id`s and entries for processing
- Write enriched outputs to `rpc_scores`, `list_entries`, `export_jobs`
- Update status via `enrichment_queue_jobs`
- Leverage Redis for async dispatching and PostgreSQL for persistence
- Optionally query `blacklist`/`whitelist` for routing logic

---

## ⚙️ Advanced Features
- Full-text search on list/tag/number fields via PostgreSQL `tsvector`
- Use `GIN` indexes for all `JSONB` fields (e.g. list metadata, enrichment config)
- Temporal audit fields: `created_at`, `updated_at`, `deleted_at`
- ENUM normalization for match status, enrich type, task step status
- Triggered audit trail for sensitive changes (users, config, export logs)
- Ready for view/materialized view summaries used in DS1 metrics

---

## 🔗 Dependencies
- Supports routing logic and API endpoints from `session-B1`
- UI visual and table schemas influenced by `session-M1`
- Used directly in `session-LLM1`, `session-DS1`, `session-PY1`
- Export states referenced in `session-D1`, enrichment metrics in `session-T1`

---

## 🧪 Testing & Validation
- Local DB spin-up with Docker/Postgres via `session-I1`
- ERD diagrams to validate joins, groupings, and cardinality
- Seeded dataset validation for 10k+ list entries
- Run scoring simulations (LLM1) and pipeline jobs (PY1) against sample data
- Export validation by job group, user, status tag

---

## 🚧 Next Steps
- Finalize DB migration scripts (manual SQL or ORM-powered)
- Generate session: `session-PY1-nu-data-ui-enrichment-runner.md`
- Generate session: `session-MW1-nu-data-ui-job-dispatcher.md`
- Update `DS1` to use `export_jobs` + analytics views
- Validate Redis/queue connection and test data round-trip

