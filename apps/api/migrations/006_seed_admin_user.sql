-- Seed default admin user
-- Password: admin123 (bcrypt cost 12)

INSERT INTO users (id, email, password_hash, name, role, active, must_change_password)
VALUES (
    gen_random_uuid(),
    'admin@apotekasasi.com',
    '$2a$12$GlW1wvNflj6OQDIsCGXo.ebC3TVmegGwrTwCpuJlYhGD45dWjub4C',
    'Administrator',
    'admin',
    true,
    true
) ON CONFLICT (email) DO NOTHING;

-- Seed default branches (coordinates are approximate - update with real values)
INSERT INTO branches (id, name, address, latitude, longitude, radius_meters, active, branch_type) VALUES
    (gen_random_uuid(), 'Apotek Mangu', 'Jl. Mangu No. 1, Solo', -7.5690, 110.7420, 50, true, 'apotek'),
    (gen_random_uuid(), 'Apotek Colomadu', 'Jl. Colomadu No. 1, Solo', -7.5550, 110.7520, 50, true, 'apotek'),
    (gen_random_uuid(), 'Apotek Manahan', 'Jl. Manahan No. 1, Solo', -7.5620, 110.7380, 50, true, 'apotek'),
    (gen_random_uuid(), 'Office Pusat', 'Jl. Slamet Riyadi No. 1, Solo', -7.5500, 110.7500, 100, true, 'office')
ON CONFLICT DO NOTHING;