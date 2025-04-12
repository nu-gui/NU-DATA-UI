# Session M1 – UI/UX Framework Planning

**Primary Repo**: NU-DATA-UI  
**Date**: 2025-04-11  
**Lead**: @wes  
**Participants**: @devin, @wes

---

## 🎯 Objective
Design and define the overall UI/UX layout, navigation flow, and front-end scaffolding structure for the NU DATA platform using Figma as a source of truth.

---

## 📦 Scope
- Sidebar and topbar layout components
- Page routing structure for React SPA
- Responsive dashboard layout + widget zones
- UI scaffolding for:
  - List Management (Controlled / Enriched / Outcomes)
  - Data Enrichment Plan wizard
  - Data Grouping tabs
  - Connections Setup (Webhook / FTP)
  - Export Wizard
  - He-Man Search overlay
- Right-side user toolbar & modal action pads
- Alert/toast, modal, and pin-entry component design

---

## 🧱 Component Strategy
| Component | Description |
|-----------|-------------|
| `SidebarMenu` | Vertical navigation for main pages |
| `TopHeader` | Contains breadcrumbs, profile icon, quick actions |
| `PageContainer` | Base container for central layout content |
| `ListTable` | Reusable table w/ metadata + expandable rows |
| `WizardStepper` | For enrichment and export setup flows |
| `ToolbarPanel` | Right-hand contextual user interactions |
| `AlertModal` | PIN, confirmation, error feedback UI |

---

## 🔄 Page-to-Route Mapping
| Route | Page Name |
|-------|-----------|
| `/dashboard` | Dashboard metrics overview |
| `/lists` | List Manager (Controlled/Enriched/Outcomes) |
| `/enrichment` | Enrichment Plan Management |
| `/groups` | Data Groups (Manual / RPC / DCode) |
| `/connections` | Webhook + FTP Integrations |
| `/export` | Export Wizard Workflow |
| `/search` | He-Man Global Search Results |
| `/settings` | Admin and Account Settings |

---

## 🔗 Dependencies
- Requires `session-R1` roadmap and final Figma UI file.
- Will pass final layout to `session-B1` for API interface binding.

---

## 🧪 Testing & Validation
- Validate Figma layout match to UI code scaffolding
- Ensure component reusability and hierarchy naming consistency
- Run responsive checks and interaction validation with mock data

---

## 🚧 Next Steps
- Generate session: `session-B1-nu-data-ui-api-structure.md`
- Generate session: `session-DA1-nu-data-ui-db-schema.md`
- Generate session: `session-SE1-nu-data-ui-auth-logic.md`

