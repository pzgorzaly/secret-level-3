-- Ćwiczenie 7: Database initialization script

-- Create database (only if it doesn't exist)
-- This script can be run manually or by Docker

-- Create todos table
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create trigger function for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger
DROP TRIGGER IF EXISTS update_todos_updated_at ON todos;
CREATE TRIGGER update_todos_updated_at
    BEFORE UPDATE ON todos
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data only if table is empty
INSERT INTO todos (title, description, completed, priority)
SELECT * FROM (VALUES
    ('Nauka Hono Framework', 'Zrozumienie podstaw najszybszego framework JavaScript', false, 'high'),
    ('Konfiguracja PostgreSQL', 'Setup bazy danych do projektów', true, 'medium'),
    ('Implementacja CRUD API', 'Create, Read, Update operacje dla todos', false, 'high'),
    ('Dodanie walidacji', 'Sprawdzanie poprawności danych wejściowych', false, 'medium'),
    ('Testy jednostkowe', 'Napisanie testów dla wszystkich endpointów', false, 'low'),
    ('Dokumentacja API', 'OpenAPI/Swagger dla wszystkich endpointów', false, 'low')
) AS v(title, description, completed, priority)
WHERE NOT EXISTS (SELECT 1 FROM todos);

-- Show inserted data count
SELECT 'Database initialized with ' || COUNT(*) || ' todos' as result FROM todos;