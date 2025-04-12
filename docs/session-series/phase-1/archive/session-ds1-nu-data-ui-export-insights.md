# Session DS1 – Export Insights & Metrics Dashboard

**Primary Repo**: NU-DATA-UI  
**Date**: 2025-04-11  
**Lead**: @wes  
**Participants**: @devin, @wes

---

## 🎯 Objective
Design and implement export analytics and system insights within the NU DATA dashboard. Track export frequency, destination type (Webhook/FTP/Manual), list tags, and enrich plan correlations to provide campaign optimization intelligence.

---

## 📦 Scope
- Track export actions and destinations (Webhook, FTP, Manual Download)
- Store timestamp, trigger user, list reference, enrichment plan, and filters
- Aggregate exports by list, tags, and time window
- Generate visual dashboard metrics
- Support CSV/PDF export of insights

---

## 📊 Metrics to Capture
| Metric | Description |
|--------|-------------|
| Export Count by Tag | Group exports by list tag(s) |
| Export Count by Destination | Manual, FTP, Webhook breakdown |
| Export Volume by Week | Visual time-series for export trends |
| Exported Record Volume | Aggregated count of records per job |
| Export Plan Usage | How often each enrichment plan feeds exports |

---

## 📁 Schema Additions
| Table | Field | Type | Notes |
|-------|-------|------|-------|
| `export_jobs` | `triggered_by` | UUID | FK to `users.id` |
| `export_jobs` | `tag_summary` | TEXT[] | Extracted from list_tags |
| `export_jobs` | `volume` | INT | # of exported records |
| `export_jobs` | `export_type` | ENUM | ftp / webhook / manual |

---

## 📈 UI Elements (Dashboard)
- Stacked bar: Export method breakdown
- Line chart: Weekly export volumes
- Pie chart: Exported lists by tag category
- Table: Recent high-volume exports with enrichment plan context

---

## 🔗 Dependencies
- Enrichment plans (`session-B1`)
- Tag/segment system from list metadata (`session-M1`)
- Export workflows from (`session-B1` + `DA1`)

---

## 🧪 Testing & Validation
- Simulate 10+ exports of different types/tags/plans
- Validate metrics aggregation and filter drill-downs
- Compare real-time stats with export job logs

---

## 🚧 Next Steps
- Add export insights widget to `/dashboard`
- Extend export_jobs table
- Add visual filters (by date, tags, plans)

