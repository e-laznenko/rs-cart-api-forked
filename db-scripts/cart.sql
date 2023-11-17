INSERT INTO carts (id, user_id, created_at, updated_at, status)
VALUES
(uuid_generate_v4(), uuid_generate_v4(), NOW(), NOW(), 'OPEN'),
(uuid_generate_v4(), uuid_generate_v4(), NOW(), NOW(), 'OPEN');