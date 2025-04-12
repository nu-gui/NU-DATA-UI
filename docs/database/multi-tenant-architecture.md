# Multi-Tenant Database Architecture

This document outlines the multi-tenant database architecture used in NU-DATA-UI.

## Hybrid Isolation Approach

The database uses a hybrid isolation approach:

1. **Default**: Full row-level data isolation via `tenant_id` column on all tenant-aware tables
2. **Super-Admin View**: Cross-tenant access for super_admin role with RLS bypass

## Row-Level Security (RLS)

PostgreSQL Row-Level Security is used to enforce tenant isolation:

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY tenant_isolation ON users
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);
```

## Setting Tenant Context

Before querying the database, set the tenant context:

```sql
SELECT app.set_tenant_context('11111111-1111-1111-1111-111111111111');
SELECT app.set_user_context('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
```

For backend API calls, this should be done in middleware after authentication.

## Indexing Strategy

Tenant-optimized composite indexing is used:

1. All tables include `tenant_id` in composite indexes:
   ```sql
   CREATE INDEX idx_lists_tenant_id_list_type ON app.lists(tenant_id, list_type);
   ```

2. GIN indexes for JSONB fields:
   ```sql
   CREATE INDEX idx_list_entries_metadata_gin ON app.list_entries USING GIN (metadata);
   ```

3. Partial indexes for common filters:
   ```sql
   CREATE INDEX idx_lists_enriched ON app.lists(tenant_id, id)
   WHERE enrichment_status = 'completed';
   ```

## PostgreSQL Features Used

| Feature | Use Case |
|---------|----------|
| RLS | Tenant-based row-level access control |
| GIN Indexes | Efficient JSONB querying |
| Triggers | Audit logs, timestamp updates |
| JSONB | Dynamic configurations and metadata |

## Super-Admin Access

Super-admin users have cross-tenant access through the `auth.is_super_admin()` function used in RLS policies.

## Implementation Details

### Tenant Context Functions

The database includes functions to manage tenant context:

```sql
-- Set tenant context
CREATE OR REPLACE FUNCTION app.set_tenant_context(tenant_uuid UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('app.current_tenant_id', tenant_uuid::text, false);
END;
$$ LANGUAGE plpgsql;

-- Set user context
CREATE OR REPLACE FUNCTION app.set_user_context(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('app.current_user_id', user_uuid::text, false);
END;
$$ LANGUAGE plpgsql;

-- Reset tenant context
CREATE OR REPLACE FUNCTION app.reset_tenant_context()
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('app.current_tenant_id', NULL, false);
  PERFORM set_config('app.current_user_id', NULL, false);
END;
$$ LANGUAGE plpgsql;
```

### Backend Integration

The backend uses middleware to set tenant context for each request:

1. Extract tenant and user information from JWT token
2. Set PostgreSQL session variables for RLS
3. Execute queries within the tenant context
4. Reset context and release connection after request completes

### Performance Considerations

- Composite indexes with `tenant_id` as the first column optimize tenant-specific queries
- JSONB fields use GIN indexes for efficient querying of complex data structures
- Partial indexes reduce index size and improve performance for common filter conditions
- Row-Level Security has minimal performance impact when properly indexed
