
INSERT INTO app.tenants (id, name, slug) VALUES 
  ('11111111-1111-1111-1111-111111111111', 'Demo Company', 'demo-company'),
  ('22222222-2222-2222-2222-222222222222', 'Test Organization', 'test-org');

INSERT INTO auth.users (id, email, password_hash, first_name, last_name, role, tenant_id) VALUES 
  ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'admin@example.com', crypt('password', gen_salt('bf')), 'Admin', 'User', 'admin', '11111111-1111-1111-1111-111111111111'),
  ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'user@example.com', crypt('password', gen_salt('bf')), 'Regular', 'User', 'user', '11111111-1111-1111-1111-111111111111'),
  ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'admin@testorg.com', crypt('password', gen_salt('bf')), 'Test', 'Admin', 'admin', '22222222-2222-2222-2222-222222222222');

INSERT INTO auth.users (id, email, password_hash, first_name, last_name, role) VALUES 
  ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'superadmin@nudata.co', crypt('superpassword', gen_salt('bf')), 'Super', 'Admin', 'super_admin');
