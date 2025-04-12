

\i /docker-entrypoint-initdb.d/migrations/001_initial_schema.sql
\i /docker-entrypoint-initdb.d/migrations/002_row_level_security.sql
\i /docker-entrypoint-initdb.d/migrations/003_sample_data.sql

CREATE OR REPLACE FUNCTION app.set_tenant_context(tenant_uuid UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('app.current_tenant_id', tenant_uuid::text, false);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION app.set_user_context(user_uuid UUID)
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('app.current_user_id', user_uuid::text, false);
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION app.reset_tenant_context()
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('app.current_tenant_id', NULL, false);
  PERFORM set_config('app.current_user_id', NULL, false);
END;
$$ LANGUAGE plpgsql;

SELECT app.set_tenant_context('11111111-1111-1111-1111-111111111111');
SELECT app.set_user_context('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa');
SELECT * FROM app.lists; -- Should only see lists for tenant 11111111-1111-1111-1111-111111111111

SELECT app.reset_tenant_context();
