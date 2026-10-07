INSERT INTO categories (id, name) VALUES
        (gen_random_uuid(), 'Téléphone'),
        (gen_random_uuid(), 'Ordinateurs'),
        (gen_random_uuid(), 'Accessoires')
ON CONFLICT (name) DO NOTHING;


INSERT INTO products (id, name, reference, description, category_id, quantity, alert_threshold, created_at, updated_at)
SELECT gen_random_uuid(), v.name, v.reference, v.description, c.id, v.quantity, v.alert_threshold, now(), now()
FROM (VALUES ('iPhone 15', 'TEL-001', 'Smartphone Apple 128 Go', 'Téléphone', 25, 5),
             ('Samsung Galaxy S24', 'TEL-002', 'Smartphone Samsung 256 Go', 'Téléphone', 3, 5),
             ('Hp Zbook 100', 'PC-003', 'Pc portable hp 512 Go ssd 16 gb RAM', 'Ordinateurs', 2, 4)
) AS v(name, reference, description, category_name, quantity, alert_threshold)
JOIN categories c ON c.name = v.category_name
ON CONFLICT (reference) DO NOTHING;