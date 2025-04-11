# Session MW1 – Middleware Enrichment Job Dispatcher

**Primary Repo**: NU-DATA-UI  
**Date**: 2025-04-11  
**Lead**: @wes  
**Participants**: @devin, @wes

---

## 🎯 Objective
Implement a lightweight middleware service to manage job orchestration between the frontend/API layer and backend enrichment workers. This middleware will validate input, enqueue jobs into Redis, track job metadata, and expose status via REST API endpoints.

---

## 📦 Scope
- Serve as a queue proxy between the Node.js API (B1) and Python runners (PY1)
- Accept `POST /v1/enrichment/job` requests from frontend
- Validate and sanitize job payloads (e.g., `list_id`, `plan_id`)
- Push jobs to Redis (Celery/Dramatiq-compatible)
- Track dispatch status in PostgreSQL `enrichment_queue_jobs`
- Provide job lookup via `GET /v1/enrichment/job/:id`

---

## 🧱 Components
| File | Description |
|------|-------------|
| `routes/enrichment.ts` | REST endpoint for job submission and lookup |
| `services/queue.ts` | Redis queue dispatcher logic |
| `models/job.ts` | Job payload type definitions and schemas |
| `db.ts` | Middleware DB client for recording job metadata |
| `utils/logger.ts` | Logs lifecycle and Redis connectivity |

---

## 🔗 Dependencies
- `session-B1`: API entry points and JWT auth context
- `session-PY1`: Redis queue subscriber/processor
- `session-DA1`: Job metadata schema
- `session-X1`: Shared config and error utils

---

## 🛠 Example Workflow
1. Frontend submits job from Enrichment Wizard → `POST /v1/enrichment/job`
2. MW1 validates, logs, and pushes job to Redis
3. Updates `enrichment_queue_jobs` with `status=pending`
4. Python worker (PY1) picks up and processes job
5. MW1 exposes real-time polling or webhooks for job status updates

---

## 🧪 Testing & Validation
- Submit test jobs with valid and invalid payloads
- Verify Redis queue push success
- Benchmark latency from API → Redis → job ready
- Unit test error handling (e.g., Redis down, invalid `list_id`)

---

## 🚧 Next Steps
- Add middleware to docker-compose dev environment
- Link Redis + PG config via `.env`
- Connect result reporting from `PY1` to dashboard in `DS1`
- Incorporate into enrichment plan wizard from M1

