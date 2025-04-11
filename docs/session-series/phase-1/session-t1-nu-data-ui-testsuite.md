# Session T1 – Testing Framework & Coverage Strategy

**Primary Repo**: NU-DATA-UI\
**Date**: 2025-04-11\
**Lead**: @wes\
**Participants**: @devin, @wes

---

## 🎯 Objective

Define the comprehensive testing strategy for NU DATA UI across backend, frontend, data enrichment workflows, and integrations. Establish consistent test coverage benchmarks and tooling.

---

## 📦 Scope

- Unit testing setup (frontend and backend)
- Integration test coverage for API endpoints
- End-to-end testing strategy
- Schema validation tests (OpenAPI → response payloads)
- RPC/WPC logic validation (fuzzy matching engine)
- CI test automation integration
- Coverage reporting (per module and overall)

---

## 🧪 Testing Layers

| Layer             | Tooling                      | Notes                                 |
| ----------------- | ---------------------------- | ------------------------------------- |
| Unit Tests (FE)   | Jest + React Testing Library | Focus on components and forms         |
| Unit Tests (BE)   | Jest or Vitest + Supertest   | Controllers, services, utilities      |
| API Integration   | Postman or Supertest         | Validate endpoint I/O & error cases   |
| E2E               | Playwright or Cypress        | Simulate real user flows              |
| RPC Fuzzy Tests   | Custom logic via `rapidfuzz` | Score validation + matrix comparison  |
| Schema Validation | Spectral / Swagger Validator | Ensure OpenAPI spec matches responses |

---

## 📊 Coverage Goals

- Unit Test Coverage: **> 85%**
- Integration Coverage: **100% of core endpoints**
- E2E Coverage: **Primary user workflows**
- RPC Logic: **Edge cases + scoring tiers**

---

## 📁 Structure

```
/tests
  /unit
    frontend/
    backend/
  /integration
  /e2e
  /rpc
  /mocks
```

---

## 🔗 Dependencies

- API specs (`session-B1`)
- DB schema (`session-DA1`)
- RPC logic (`session-LLM1`)
- CI/CD flow (`session-D1`)

---

## 🧠 Test Focus Areas (Initial)

- Login & JWT flow (SE1)
- List import + validation logic (B1/DA1)
- Enrichment execution and post-processing (LLM1)
- UI nav components and user toolbars (M1)
- Webhook/FTP connection tests (B1)

---

## 🚧 Next Steps

- Add test tasks to `ci.yml`
- Auto-generate coverage badges
- Seed test database via Docker on CI
- Generate `test_data/*.json` and fuzzing examples

