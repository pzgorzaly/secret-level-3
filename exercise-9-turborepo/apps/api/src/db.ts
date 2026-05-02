// Ćwiczenie 9: Database configuration for Turborepo

import { Pool } from 'pg';

// Konfiguracja bazy danych
export const dbConfig = {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    database: process.env.DB_NAME || 'turborepo_todos_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'turborepo_password_2024',
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
};

console.log('📊 Turborepo Database Config:', {
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
        console.log('🔧 Inicjalizacja bazy danych Turborepo...');

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
            console.log('📝 Dodawanie przykładowych todos do Turborepo...');

            await pool.query(`
                INSERT INTO todos (title, description, completed, priority) VALUES
                ('Nauka Turborepo', 'Zrozumienie monorepo architecture', false, 'high'),
                ('Implementacja DELETE API', 'Dodanie endpoint do usuwania todos', false, 'high'),
                ('Frontend DELETE funkcjonalność', 'Przycisk usuwania w React komponencie', false, 'high'),
                ('Testowanie DELETE operacji', 'Sprawdzenie czy usuwanie działa poprawnie', false, 'medium'),
                ('Dokumentacja monorepo', 'Napisanie README dla Turborepo setup', false, 'medium'),
                ('Deploy całego stack', 'Wdrożenie frontend + backend + DB', false, 'low'),
                ('Ukończone zadanie przykładowe', 'To zadanie jest już ukończone', true, 'low')
            `);
        }

        console.log('✅ Baza danych Turborepo gotowa!');

    } catch (error) {
        console.error('❌ Błąd inicjalizacji bazy Turborepo:', error);
        throw error;
    }
}

// Graceful shutdown
export async function closeDatabase() {
    console.log('🔌 Zamykanie połączenia z bazą danych Turborepo...');
    await pool.end();
    console.log('🔌 Rozłączono z bazą danych Turborepo');
}