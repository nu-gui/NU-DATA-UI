
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- For fuzzy search

CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS app;

CREATE TABLE IF NOT EXISTS app.tenants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE,
  billing_status VARCHAR(50) DEFAULT 'active',
  subscription_tier VARCHAR(50) DEFAULT 'standard',
  max_users INTEGER DEFAULT 5,
  max_lists INTEGER DEFAULT 100,
  max_entries_per_list INTEGER DEFAULT 10000,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS auth.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) NOT NULL DEFAULT 'user',
  tenant_id UUID REFERENCES app.tenants(id) ON DELETE CASCADE,
  is_active BOOLEAN DEFAULT TRUE,
  last_login TIMESTAMP WITH TIME ZONE,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.lists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  list_type VARCHAR(50) NOT NULL DEFAULT 'standard',
  tags TEXT[] DEFAULT '{}',
  import_method VARCHAR(50),
  source VARCHAR(255),
  enrichment_status VARCHAR(50) DEFAULT 'pending',
  metadata JSONB DEFAULT '{}',
  tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.list_entries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  list_id UUID NOT NULL REFERENCES app.lists(id) ON DELETE CASCADE,
  tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE CASCADE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(255),
  phone VARCHAR(50),
  company VARCHAR(255),
  address TEXT,
  city VARCHAR(100),
  state VARCHAR(50),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  metadata JSONB DEFAULT '{}',
  enrichment_data JSONB DEFAULT '{}',
  rpc_score DECIMAL(5,2),
  wpc_score DECIMAL(5,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.enrichment_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  pre_processing_tasks TEXT[] DEFAULT '{}',
  processing_tasks TEXT[] DEFAULT '{}',
  post_processing_tasks TEXT[] DEFAULT '{}',
  configuration JSONB NOT NULL DEFAULT '{}',
  export_connection_id UUID,
  tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.enrichment_queue_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  plan_id UUID NOT NULL REFERENCES app.enrichment_plans(id) ON DELETE CASCADE,
  list_id UUID NOT NULL REFERENCES app.lists(id) ON DELETE CASCADE,
  status VARCHAR(50) DEFAULT 'pending',
  progress INTEGER DEFAULT 0,
  error_message TEXT,
  result_summary JSONB DEFAULT '{}',
  tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.data_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  filter_criteria JSONB NOT NULL DEFAULT '{}',
  column_selections TEXT[] DEFAULT '{}',
  is_auto_generated BOOLEAN DEFAULT FALSE,
  tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.connections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  connection_type VARCHAR(50) NOT NULL,
  direction VARCHAR(50) NOT NULL,
  configuration JSONB NOT NULL DEFAULT '{}',
  last_used TIMESTAMP WITH TIME ZONE,
  status VARCHAR(50) DEFAULT 'active',
  tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.export_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255),
  filter_criteria JSONB DEFAULT '{}',
  selected_fields TEXT[] DEFAULT '{}',
  export_method VARCHAR(50) NOT NULL,
  connection_id UUID REFERENCES app.connections(id),
  status VARCHAR(50) DEFAULT 'pending',
  file_path VARCHAR(255),
  record_count INTEGER DEFAULT 0,
  tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.blacklist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  value VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  reason TEXT,
  tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(value, type, tenant_id)
);

CREATE TABLE IF NOT EXISTS app.whitelist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  value VARCHAR(255) NOT NULL,
  type VARCHAR(50) NOT NULL,
  reason TEXT,
  tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE CASCADE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(value, type, tenant_id)
);

CREATE TABLE IF NOT EXISTS app.activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  action_type VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100),
  entity_id UUID,
  details JSONB DEFAULT '{}',
  ip_address VARCHAR(50),
  tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.health_checks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  check_type VARCHAR(100) NOT NULL,
  status VARCHAR(50) NOT NULL,
  details JSONB DEFAULT '{}',
  tenant_id UUID REFERENCES app.tenants(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS app.campaign_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL,
  success_rate DECIMAL(5,2),
  metrics JSONB DEFAULT '{}',
  tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_users_tenant_id ON auth.users(tenant_id);
CREATE INDEX idx_lists_tenant_id ON app.lists(tenant_id);
CREATE INDEX idx_list_entries_tenant_id ON app.list_entries(tenant_id);
CREATE INDEX idx_enrichment_plans_tenant_id ON app.enrichment_plans(tenant_id);
CREATE INDEX idx_data_groups_tenant_id ON app.data_groups(tenant_id);
CREATE INDEX idx_connections_tenant_id ON app.connections(tenant_id);
CREATE INDEX idx_export_jobs_tenant_id ON app.export_jobs(tenant_id);
CREATE INDEX idx_blacklist_tenant_id ON app.blacklist(tenant_id);
CREATE INDEX idx_whitelist_tenant_id ON app.whitelist(tenant_id);
CREATE INDEX idx_activity_logs_tenant_id ON app.activity_logs(tenant_id);
CREATE INDEX idx_campaign_metrics_tenant_id ON app.campaign_metrics(tenant_id);

CREATE INDEX idx_lists_tenant_id_list_type ON app.lists(tenant_id, list_type);
CREATE INDEX idx_list_entries_list_id_tenant_id ON app.list_entries(list_id, tenant_id);
CREATE INDEX idx_enrichment_queue_jobs_tenant_id_status ON app.enrichment_queue_jobs(tenant_id, status);
CREATE INDEX idx_connections_tenant_id_type ON app.connections(tenant_id, connection_type);
CREATE INDEX idx_export_jobs_tenant_id_status ON app.export_jobs(tenant_id, status);

CREATE INDEX idx_list_entries_metadata_gin ON app.list_entries USING GIN (metadata);
CREATE INDEX idx_list_entries_enrichment_data_gin ON app.list_entries USING GIN (enrichment_data);
CREATE INDEX idx_data_groups_filter_criteria_gin ON app.data_groups USING GIN (filter_criteria);

CREATE INDEX idx_lists_enriched ON app.lists(tenant_id, id)
WHERE enrichment_status = 'completed';

CREATE INDEX idx_export_jobs_pending ON app.export_jobs(tenant_id, id)
WHERE status = 'pending';

CREATE INDEX idx_list_entries_email_trgm ON app.list_entries USING GIN (email gin_trgm_ops);
CREATE INDEX idx_list_entries_name_trgm ON app.list_entries USING GIN (first_name gin_trgm_ops, last_name gin_trgm_ops);
