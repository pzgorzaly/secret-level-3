// Ćwiczenie 7: Database configuration and initialization

import { Pool } from 'pg';

// Konfiguracja bazy danych
export const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'todos_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

console.log('📊 Database Config:', {
    host: dbConfig.host,
    port: dbConfig.port,
    database: dbConfig.database,
    user: dbConfig.user
});

// Połączenie z bazą danych
export const pool = new Pool(dbConfig);

// Inicjalizacja bazy danych
export async function initDatabase() {
    try {
        console.log('🔧 Inicjalizacja bazy danych...');

        // Tworzenie tabeli todos
        await pool.query(`
            CREATE TABLE IF NOT EXISTS todos (
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                completed BOOLEAN DEFAULT FALSE,
                priority VARCHAR(10) DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Tworzenie trigger do automatycznej aktualizacji updated_at
        await pool.query(`
            CREATE OR REPLACE FUNCTION update_updated_at_column()
            RETURNS TRIGGER AS $$
            BEGIN
                NEW.updated_at = CURRENT_TIMESTAMP;
                RETURN NEW;
            END;
            $$ language 'plpgsql';
        `);

        await pool.query(`
            DROP TRIGGER IF EXISTS update_todos_updated_at ON todos;
            CREATE TRIGGER update_todos_updated_at
                BEFORE UPDATE ON todos
                FOR EACH ROW
                EXECUTE FUNCTION update_updated_at_column();
        `);

        // Dodanie przykładowych danych
        const todoCount = await pool.query('SELECT COUNT(*) FROM todos');
        if (parseInt(todoCount.rows[0].count) === 0) {
            console.log('📝 Dodawanie przykładowych todos...');

            await pool.query(`
                INSERT INTO todos (title, description, completed, priority) VALUES
                ('Nauka Hono Framework', 'Zrozumienie podstaw najszybszego framework JavaScript', false, 'high'),
                ('Konfiguracja PostgreSQL', 'Setup bazy danych do projektów', true, 'medium'),
                ('Implementacja CRUD API', 'Create, Read, Update operacje dla todos', false, 'high'),
                ('Dodanie walidacji', 'Sprawdzanie poprawności danych wejściowych', false, 'medium'),
                ('Testy jednostkowe', 'Napisanie testów dla wszystkich endpointów', false, 'low'),
                ('Dokumentacja API', 'OpenAPI/Swagger dla wszystkich endpointów', false, 'low')
            `);
        }

        console.log('✅ Baza danych gotowa!');

    } catch (error) {
        console.error('❌ Błąd inicjalizacji bazy:', error);
        throw error;
    }
}

// Graceful shutdown
export async function closeDatabase() {
    console.log('🔌 Zamykanie połączenia z bazą danych...');
    await pool.end();
    console.log('🔌 Rozłączono z bazą danych');
}