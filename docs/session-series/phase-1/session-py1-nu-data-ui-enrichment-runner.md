# Session PY1 – Python-Based Enrichment Runner Service

**Primary Repo**: NU-DATA-UI  
**Date**: 2025-04-11  
**Lead**: @wes  
**Participants**: @devin, @wes

---

## 🎯 Objective
Develop a Python backend enrichment service capable of processing list data for scoring, transformation, and metadata enrichment. This service will consume queued jobs (via Redis or Celery), fetch relevant records from PostgreSQL, execute enrichment logic, and persist results for downstream export and analytics.

---

## 📦 Scope
- Build Python enrichment service as a standalone job runner
- Integrate Redis queue consumption (e.g. Celery or Dramatiq)
- Connect to PostgreSQL to read list entries and persist enrichment results
- Implement RPC/WPC scoring (via logic from LLM1)
- Enable batch job lifecycle tracking (status, retries, duration)
- Use `.env` configuration for multi-env deployment

---

## 🧱 Components
| Component | Description |
|-----------|-------------|
| `worker.py` | Main job runner that handles Redis-enqueued tasks |
| `score.py` | Logic for RPC/WPC name scoring using fuzzy matching |
| `db.py` | PG connection layer (e.g. via SQLAlchemy or psycopg2) |
| `models/` | Optional Pydantic schemas for validation |
| `queue.py` | Redis integration + job enqueue/dequeue handlers |
| `config.py` | Loads `.env` or runtime config values |

---

## 🔗 Dependencies
- `session-DA1`: Provides list structure + enrichment tables
- `session-LLM1`: Contains name scoring algorithms
- `session-B1`: Middleware passes job triggers via `MW1`

---

## 🔄 Job Lifecycle
1. Job dispatched via Redis from `MW1`
2. Worker receives `job_id` and `list_id`
3. Records fetched from `list_entries`
4. Scoring and transformation applied
5. Results stored in `rpc_scores`, `list_entries`, `export_jobs`
6. Job status updated back into `enrichment_queue_jobs`

---

## 🧪 Testing & Validation
- Simulate test jobs via CLI or REST call
- Validate enrichment output vs expected mock results
- Retry and timeout edge case testing
- PostgreSQL writes benchmarked for batch insert throughput

---

## 🚧 Next Steps
- Generate `session-mw1-nu-data-ui-job-dispatcher.md`
- Integrate queue consumer into CI environment
- Link results to dashboard analytics from `DS1`
- Add job status tracking to test plan in `T1`

