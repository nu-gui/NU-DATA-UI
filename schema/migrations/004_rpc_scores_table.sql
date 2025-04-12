CREATE TABLE IF NOT EXISTS app.rpc_scores (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entry_id UUID NOT NULL REFERENCES app.list_entries(id) ON DELETE CASCADE,
  match_type VARCHAR(20) NOT NULL CHECK (match_type IN ('high', 'medium', 'low', 'none')),
  rpc_score DECIMAL(5,2) NOT NULL,
  source_name TEXT,
  matched_name TEXT,
  match_breakdown JSONB DEFAULT '{}',
  priority_change BOOLEAN DEFAULT FALSE,
  tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_rpc_scores_entry_id ON app.rpc_scores(entry_id);
CREATE INDEX idx_rpc_scores_tenant_id ON app.rpc_scores(tenant_id);
CREATE INDEX idx_rpc_scores_match_type ON app.rpc_scores(tenant_id, match_type);
CREATE INDEX idx_rpc_scores_match_breakdown_gin ON app.rpc_scores USING GIN (match_breakdown);

ALTER TABLE app.rpc_scores ENABLE ROW LEVEL SECURITY;

CREATE POLICY tenant_isolation_rpc_scores ON app.rpc_scores
  USING (tenant_id = current_setting('app.current_tenant_id')::uuid);
