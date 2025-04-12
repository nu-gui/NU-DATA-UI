# Session I1 – DevOps Environment & Dockerized Local Stack

**Primary Repo**: NU-DATA-UI\
**Date**: 2025-04-11\
**Lead**: @wes\
**Participants**: @devin, @wes

---

## 🎯 Objective

Set up the foundational DevOps environment for local development, container orchestration, and test/staging environments. Enable seamless developer onboarding, testing, and multi-service integration.

---

## 📦 Scope

- Docker Compose setup for full local stack:
  - Frontend (React)
  - Backend (Node/Express)
  - PostgreSQL
  - Redis
  - Mock Webhook Receiver
  - SFTP Service
- Environment variable configuration
- Volume and network bindings
- Setup scripts and `Makefile`

---

## 🐳 Docker Compose Services

| Service        | Purpose                                        |
| -------------- | ---------------------------------------------- |
| `frontend`     | Serves the React UI for dev/stage              |
| `backend`      | Hosts API with OpenAPI validation              |
| `postgres`     | Primary DB for lists, enrichment, user/session |
| `redis`        | Cache for queued enrich jobs and sessions      |
| `webhook-mock` | Receives outbound post-export data             |
| `sftp-server`  | Accepts inbound contact list files             |

---

## ⚙️ Dev Scripts & Tools

- `Makefile` targets:
  - `make up`, `make down`, `make logs`, `make db-reset`
- `.env.template` synced across services
- Optional `devcontainer.json` for GitHub Codespaces or VS Code Remote

---

## 📁 Structure

```bash
infra/
  docker-compose.yml
  sftp/
  webhook-mock/
  nginx/
  postgres/
.env.template
Makefile
```

---

## 🧪 Testing & Validation

- Spin up full stack with `make up`
- Load dummy data into Postgres
- Simulate export to mock Webhook and SFTP
- Validate Redis caching + queue flushing

---

## 🚧 Next Steps

- Add `infra/` to repo with Docker configs
- Link volumes and ports per service
- Add CI check for `docker-compose up` health

