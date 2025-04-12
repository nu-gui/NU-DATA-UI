
ALTER TABLE app.export_jobs 
  RENAME COLUMN created_by TO triggered_by;

ALTER TABLE app.export_jobs
  ADD COLUMN IF NOT EXISTS tag_summary TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS list_id UUID REFERENCES app.lists(id),
  ADD COLUMN IF NOT EXISTS enrichment_plan_id UUID REFERENCES app.enrichment_plans(id),
  ADD COLUMN IF NOT EXISTS export_date DATE GENERATED ALWAYS AS (DATE(created_at)) STORED;

ALTER TABLE app.export_jobs
  RENAME COLUMN export_method TO export_type;

ALTER TABLE app.export_jobs
  RENAME COLUMN record_count TO volume;

CREATE INDEX IF NOT EXISTS idx_export_jobs_export_date ON app.export_jobs(tenant_id, export_date);
CREATE INDEX IF NOT EXISTS idx_export_jobs_export_type ON app.export_jobs(tenant_id, export_type);
CREATE INDEX IF NOT EXISTS idx_export_jobs_list_id ON app.export_jobs(tenant_id, list_id);
CREATE INDEX IF NOT EXISTS idx_export_jobs_enrichment_plan_id ON app.export_jobs(tenant_id, enrichment_plan_id);
CREATE INDEX IF NOT EXISTS idx_export_jobs_tag_summary_gin ON app.export_jobs USING GIN (tag_summary);

CREATE OR REPLACE VIEW app.export_analytics AS
SELECT
  tenant_id,
  export_date,
  export_type,
  COUNT(*) AS export_count,
  SUM(volume) AS total_records,
  array_agg(DISTINCT list_id) AS list_ids,
  array_agg(DISTINCT enrichment_plan_id) AS plan_ids,
  jsonb_object_agg(
    COALESCE(export_type, 'unknown'), 
    COUNT(*)
  ) AS export_type_breakdown
FROM
  app.export_jobs
GROUP BY
  tenant_id, export_date, export_type;

CREATE OR REPLACE VIEW app.weekly_export_trends AS
SELECT
  tenant_id,
  DATE_TRUNC('week', export_date) AS week_start,
  COUNT(*) AS export_count,
  SUM(volume) AS total_records,
  jsonb_object_agg(
    COALESCE(export_type, 'unknown'), 
    COUNT(*)
  ) AS export_type_breakdown
FROM
  app.export_jobs
GROUP BY
  tenant_id, DATE_TRUNC('week', export_date);

CREATE OR REPLACE VIEW app.export_tag_analytics AS
WITH tag_counts AS (
  SELECT
    tenant_id,
    unnest(tag_summary) AS tag,
    COUNT(*) AS export_count,
    SUM(volume) AS total_records
  FROM
    app.export_jobs
  GROUP BY
    tenant_id, unnest(tag_summary)
)
SELECT
  tenant_id,
  jsonb_object_agg(
    COALESCE(tag, 'untagged'), 
    jsonb_build_object(
      'export_count', export_count,
      'total_records', total_records
    )
  ) AS tag_breakdown
FROM
  tag_counts
GROUP BY
  tenant_id;

CREATE OR REPLACE VIEW app.enrichment_plan_usage AS
SELECT
  e.tenant_id,
  e.id AS plan_id,
  e.name AS plan_name,
  COUNT(j.id) AS export_count,
  SUM(j.volume) AS total_records
FROM
  app.enrichment_plans e
LEFT JOIN
  app.export_jobs j ON e.id = j.enrichment_plan_id
GROUP BY
  e.tenant_id, e.id, e.name;

ALTER VIEW app.export_analytics SECURITY INVOKER;
ALTER VIEW app.weekly_export_trends SECURITY INVOKER;
ALTER VIEW app.export_tag_analytics SECURITY INVOKER;
ALTER VIEW app.enrichment_plan_usage SECURITY INVOKER;
