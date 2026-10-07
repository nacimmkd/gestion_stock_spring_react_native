INSERT INTO categories (id, name) VALUES
        (gen_random_uuid(), 'Téléphone'),
        (gen_random_uuid(), 'Ordinateurs'),
        (gen_random_uuid(), 'Accessoires')
ON CONFLICT (name) DO NOTHING;