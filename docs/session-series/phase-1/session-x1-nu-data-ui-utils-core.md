# Session X1 – Shared Utilities & Core Framework Layer

**Primary Repo**: NU-DATA-UI  
**Date**: 2025-04-11  
**Lead**: @wes  
**Participants**: @devin, @wes

---

## 🎯 Objective
Establish a shared utilities layer to support all backend and frontend logic in NU DATA. Standardize error formats, token processing, logging, tenant injection, and reusable configuration logic.

---

## 📦 Scope
- Shared TypeScript utilities (BE/FE compatible)
- Error response formatter (standard structure)
- JWT parsing and tenant context injection middleware
- Environment variable loader with schema validation
- App-wide logging interface
- Configurable token expiration/refresh support

---

## 🧱 Utility Modules to Implement
| Module | Purpose |
|--------|---------|
| `logger.ts` | Color-coded timestamped logging for FE + BE |
| `error-handler.ts` | JSON:API formatted errors for all routes |
| `jwt-context.ts` | Extracts user_id, tenant_id, role from token |
| `env.ts` | Loads .env, validates required fields |
| `config.ts` | Central app config values (port, env, tokens) |
| `role-guard.ts` | Protects handlers/routes based on role |

---

## 🔁 Usage Targets
- All API endpoints (B1)
- Auth middleware (SE1)
- CI and dev toolchain (D1)
- Test runners + mocks (T1)

---

## 🧪 Testing & Validation
- Snapshot test logger outputs
- Mock expired/bad tokens
- Validate env loader in CI and Docker Compose
- Verify error format propagation across Express handlers

---

## 🚧 Next Steps
- Install utility layer in `src/core/utils/`
- Add auto-formatting to CI
- Sync types across backend and test code

