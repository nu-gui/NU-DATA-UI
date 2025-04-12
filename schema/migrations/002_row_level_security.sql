
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.lists ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.list_entries ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.enrichment_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.enrichment_queue_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.data_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.export_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.blacklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.whitelist ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.campaign_metrics ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_users ON auth.users
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_lists ON app.lists
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_list_entries ON app.list_entries
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_enrichment_plans ON app.enrichment_plans
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_enrichment_queue_jobs ON app.enrichment_queue_jobs
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_data_groups ON app.data_groups
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_connections ON app.connections
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_export_jobs ON app.export_jobs
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_blacklist ON app.blacklist
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_whitelist ON app.whitelist
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_activity_logs ON app.activity_logs
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE POLICY tenant_isolation_campaign_metrics ON app.campaign_metrics
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);

CREATE OR REPLACE FUNCTION auth.is_super_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (SELECT role = 'super_admin' FROM auth.users WHERE id = current_setting('app.current_user_id')::uuid);
END;
$$ LANGUAGE plpgsql;
