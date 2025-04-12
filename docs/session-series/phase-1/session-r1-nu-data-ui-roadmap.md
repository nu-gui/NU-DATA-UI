# Session R1 – Project Overview & Roadmap

**Primary Repo**: NU-DATA-UI  
**Date**: 2025-04-11  
**Lead**: @wes  
**Participants**: @devin, @wes

---

## 🎯 Objective
Establish a high-level product overview and strategic roadmap for the NU DATA UI platform. Define core features, personas, backend processing layers, series-based groupings, and the complete execution path for initial and extended development sessions.

---

## 📦 Scope
- Define the overall mission and value proposition of NU DATA UI
- Map feature clusters to session IDs and series tracks
- Identify user roles and execution tiers
- Integrate enrichment processing via Python backend services
- Document milestone phases and dependencies
- Create execution plan and test coverage responsibilities

---

## 📌 NU DATA UI Overview
NU DATA UI is a multi-tenant SaaS platform for structured and enriched contact data management, supporting:
- File imports & data control
- RPC/WPC enrichment scoring via Python backend
- FTP/webhook automation and integrations
- Federated search & data grouping
- Export pipelines and metrics
- Real-time and scheduled backend batch processing
- Dashboard analytics & role-based access control

Target users:
- Enterprise clients (contact center, marketing)
- Data enrichment providers
- Analysts and campaign planners
- Admin users and system engineers

---

## 🗂 Functional Groupings (Feature Clusters)
| Area | Description |
|------|-------------|
| **Login & Auth** | JWT, RBAC, password reset, tenant validation |
| **Dashboard** | Visual metrics, batch queue status, export volume insights |
| **List Management** | Controlled, Enriched, Outcome views, tagging, bulk tools |
| **Enrichment Plans** | Wizard for pre/process/post tasks, Python runner integration |
| **Data Groups** | Auto/manual groups by RPC, WPC, dial codes, segmentation |
| **Connections** | Webhook/FTP configurations, column mapping, templates |
| **Data Export** | Export wizard, delivery method selector, export history |
| **He-Man Search** | Global federated search: phone, tags, metadata |
| **Admin Tools** | Credits, user roles, audit logs, configuration access |

---

## 👤 User Personas
- **Data Admin** – Controls imports, enrichment, exports
- **Campaign Manager** – Filters/export segments, reviews outcomes
- **Data Engineer** – Builds connections and APIs, oversees syncs
- **Analyst** – Reviews dashboard metrics, usage insights
- **System Admin** – Manages user access, permissions, billing

---

## 🛤️ Roadmap Phases
| Phase | Milestone | Description |
|-------|-----------|-------------|
| P1 | Core Setup | Session planning, Docker, RBAC, shared utils |
| P2 | UI & Routing | Next.js layout, page scaffolds, topbar/sidebar |
| P3 | API & Schema | REST structure, OpenAPI 3.1, auth, tenant control |
| P4 | Enrichment Engine | Python backend runners, scoring logic, Redis queue integration |
| P5 | Export & Delivery | Webhook/FTP target delivery engine, mapping support |
| P6 | Data Analytics | Dashboard widgets, export/session stats |
| P7 | Testing & QA | Unit + integration tests, RPC logic verification |
| P8 | CI/CD + Deployment | GitHub Actions workflows, staging pipelines |

---

## 📚 Suggested Series Mapping (with Sessions)
| Series | Focus Area | Sessions (Phase 1) |
|--------|------------|---------------------|
| `R` | Roadmap | R1 |
| `M` | UI/UX Frontend | M1 |
| `B` | Backend API | B1 |
| `DA` | Data Architecture | DA1 |
| `SE` | Security/Auth | SE1 |
| `D` | DevOps / CI/CD | D1, I1 |
| `T` | Testing & Validation | T1 |
| `LLM` | AI Scoring | LLM1 |
| `DS` | Analytics | DS1 |
| `X` | Shared Utilities | X1 |
| `PY` | Python Enrichment Engine | PY1 (planned) |
| `MW` | Middleware Dispatch Layer | MW1 (planned) |

---

## 🗃️ Phase 1 Session Files (in Execution Order)

1. `session-r1-nu-data-ui-roadmap.md` ✅ **Completed**
2. `session-x1-nu-data-ui-utils-core.md` ✅ **Completed**
3. `session-i1-nu-data-ui-devops-setup.md` ✅ **Completed**
4. `session-se1-nu-data-ui-auth-logic.md` ✅ **Completed**
5. `session-m1-nu-data-ui-ux-framework.md` 🔄 **Pending**
6. `session-b1-nu-data-ui-api-structure.md` 🔄 **Pending**
7. `session-da1-nu-data-ui-db-schema.md` 🔄 **Pending**
8. `session-llm1-nu-data-ui-rpc-scoring.md` 🔄 **Pending**
9. `session-ds1-nu-data-ui-export-insights.md` 🔄 **Pending**
10. `session-t1-nu-data-ui-testsuite.md` 🔄 **Pending**
11. `session-d1-nu-data-ui-cicd-pipeline.md` 🔄 **Pending**
12. `session-py1-nu-data-ui-enrichment-runner.md` *(planned)*
13. `session-mw1-nu-data-ui-job-dispatcher.md` *(planned)*

> 🗂 All session documents are stored under `docs/session-series/phase-1/`

---

## 🔗 Dependencies
- Figma UI complete and linked to M1
- OpenAPI-driven contract from B1 → DA1 → PY1
- Python backend services write/read from DA1 and respond via MW1
- All session IDs flow from this roadmap and are GitHub-ready

---

## 🧪 Testing & Validation
- Defined in T1 test strategy and CI/CD pipeline from D1
- Python enrichment validated via mock list enrichment cycles
- Redis queue integration and response latency benchmarks (PY1, MW1)

---

## 🚧 Next Steps
- Generate `session-py1` and `session-mw1` for backend enrichment and middleware dispatch
- Assign all `.md` files to GitHub Issues via CLI script
- Launch app.devin.ai sessions per roadmap execution order
