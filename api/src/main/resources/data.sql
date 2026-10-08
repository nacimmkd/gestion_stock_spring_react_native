INSERT INTO categories (id, name) VALUES
        (gen_random_uuid(), 'Téléphone'),
        (gen_random_uuid(), 'Ordinateurs'),
        (gen_random_uuid(), 'Accessoires')
ON CONFLICT (name) DO NOTHING;


INSERT INTO products (id, name, reference, description, category_id, quantity, alert_threshold, created_at, updated_at)
SELECT gen_random_uuid(), v.name, v.reference, v.description, c.id, v.quantity, v.alert_threshold, now(), now()
FROM (VALUES
          ('iPhone 15', 'TEL-001', 'Smartphone Apple 128 Go', 'Téléphone', 25, 5),
          ('Samsung Galaxy S24', 'TEL-002', 'Smartphone Samsung 256 Go', 'Téléphone', 3, 5),
          ('iPhone 15 Pro Max', 'TEL-003', 'Smartphone Apple 256 Go titane', 'Téléphone', 12, 4),
          ('iPhone 14', 'TEL-004', 'Smartphone Apple 128 Go', 'Téléphone', 0, 5),
          ('iPhone SE 2022', 'TEL-005', 'Smartphone Apple compact 64 Go', 'Téléphone', 18, 6),
          ('Samsung Galaxy S24 Ultra', 'TEL-006', 'Smartphone Samsung 512 Go avec stylet', 'Téléphone', 7, 3),
          ('Samsung Galaxy A55', 'TEL-007', 'Smartphone Samsung milieu de gamme 128 Go', 'Téléphone', 40, 10),
          ('Samsung Galaxy Z Flip 5', 'TEL-008', 'Smartphone pliant Samsung 256 Go', 'Téléphone', 2, 3),
          ('Google Pixel 8', 'TEL-009', 'Smartphone Google 128 Go', 'Téléphone', 0, 4),
          ('Google Pixel 8 Pro', 'TEL-010', 'Smartphone Google 256 Go', 'Téléphone', 9, 4),
          ('Xiaomi Redmi Note 13', 'TEL-011', 'Smartphone Xiaomi 128 Go', 'Téléphone', 55, 10),
          ('Xiaomi 14', 'TEL-012', 'Smartphone Xiaomi 512 Go', 'Téléphone', 4, 5),
          ('OnePlus 12', 'TEL-013', 'Smartphone OnePlus 256 Go', 'Téléphone', 11, 4),
          ('Honor Magic 6 Pro', 'TEL-014', 'Smartphone Honor 512 Go', 'Téléphone', 1, 3),
          ('Nothing Phone 2', 'TEL-015', 'Smartphone Nothing 256 Go', 'Téléphone', 0, 3),

          ('MacBook Air M3', 'PC-001', 'Pc portable Apple 13 pouces 256 Go ssd 8 gb RAM', 'Ordinateurs', 12, 3),
          ('Dell XPS 13', 'PC-002', 'Pc portable Dell 512 Go ssd 16 gb RAM', 'Ordinateurs', 2, 3),
          ('Hp Zbook 100', 'PC-003', 'Pc portable hp 512 Go ssd 16 gb RAM', 'Ordinateurs', 2, 4),
          ('MacBook Pro 14 M3 Pro', 'PC-004', 'Pc portable Apple 512 Go ssd 18 gb RAM', 'Ordinateurs', 6, 2),
          ('Lenovo ThinkPad X1 Carbon', 'PC-005', 'Pc portable Lenovo 1 To ssd 32 gb RAM', 'Ordinateurs', 8, 3),
          ('Lenovo IdeaPad 5', 'PC-006', 'Pc portable Lenovo 512 Go ssd 8 gb RAM', 'Ordinateurs', 22, 6),
          ('Asus Zenbook 14', 'PC-007', 'Pc portable Asus OLED 512 Go ssd 16 gb RAM', 'Ordinateurs', 0, 4),
          ('Asus ROG Strix G16', 'PC-008', 'Pc portable gamer Asus RTX 4060 1 To ssd 16 gb RAM', 'Ordinateurs', 3, 3),
          ('Acer Aspire 5', 'PC-009', 'Pc portable Acer 256 Go ssd 8 gb RAM', 'Ordinateurs', 30, 8),
          ('Acer Nitro 5', 'PC-010', 'Pc portable gamer Acer RTX 4050 512 Go ssd 16 gb RAM', 'Ordinateurs', 5, 5),
          ('Hp Pavilion 15', 'PC-011', 'Pc portable hp 512 Go ssd 8 gb RAM', 'Ordinateurs', 14, 5),
          ('Hp EliteBook 840', 'PC-012', 'Pc portable professionnel hp 512 Go ssd 16 gb RAM', 'Ordinateurs', 0, 3),
          ('Dell Latitude 5440', 'PC-013', 'Pc portable professionnel Dell 256 Go ssd 16 gb RAM', 'Ordinateurs', 17, 5),
          ('Microsoft Surface Laptop 5', 'PC-014', 'Pc portable Microsoft tactile 512 Go ssd 16 gb RAM', 'Ordinateurs', 1, 2),
          ('iMac 24 M3', 'PC-015', 'Ordinateur tout-en-un Apple 256 Go ssd 8 gb RAM', 'Ordinateurs', 4, 2),

          ('AirPods Pro 2', 'ACC-001', 'Écouteurs sans fil Apple à réduction de bruit', 'Accessoires', 30, 8),
          ('Samsung Galaxy Buds 2 Pro', 'ACC-002', 'Écouteurs sans fil Samsung', 'Accessoires', 6, 8),
          ('Sony WH-1000XM5', 'ACC-003', 'Casque bluetooth Sony à réduction de bruit', 'Accessoires', 0, 4),
          ('Chargeur USB-C 20W Apple', 'ACC-004', 'Adaptateur secteur USB-C charge rapide', 'Accessoires', 80, 20),
          ('Chargeur Anker Nano 65W', 'ACC-005', 'Chargeur USB-C compact 3 ports', 'Accessoires', 15, 10),
          ('Câble USB-C vers USB-C 2m', 'ACC-006', 'Câble de charge tressé 100W', 'Accessoires', 120, 30),
          ('Câble Lightning 1m', 'ACC-007', 'Câble de charge Apple certifié MFi', 'Accessoires', 9, 20),
          ('Coque iPhone 15 silicone', 'ACC-008', 'Coque de protection MagSafe noire', 'Accessoires', 45, 15),
          ('Verre trempé Galaxy S24', 'ACC-009', 'Protection écran verre trempé lot de 2', 'Accessoires', 0, 15),
          ('Batterie externe Anker 20000 mAh', 'ACC-010', 'Powerbank USB-C charge rapide 30W', 'Accessoires', 18, 6),
          ('Logitech MX Master 3S', 'ACC-011', 'Souris sans fil ergonomique', 'Accessoires', 10, 4),
          ('Logitech MX Keys', 'ACC-012', 'Clavier sans fil rétroéclairé AZERTY', 'Accessoires', 3, 4),
          ('Hub USB-C 7 en 1', 'ACC-013', 'Adaptateur HDMI, USB, lecteur SD, Ethernet', 'Accessoires', 2, 5),
          ('Sacoche ordinateur 15 pouces', 'ACC-014', 'Housse de transport rembourrée', 'Accessoires', 25, 8),
          ('Support téléphone voiture', 'ACC-015', 'Support magnétique pour grille d''aération', 'Accessoires', 0, 10)


) AS v(name, reference, description, category_name, quantity, alert_threshold)
JOIN categories c ON c.name = v.category_name
ON CONFLICT (reference) DO NOTHING;