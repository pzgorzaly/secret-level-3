import { Hono } from 'hono';
import { pool, initDatabase, closeDatabase } from './db.js';

interface Todo {
    id: number;
    title: string;
    description: string | null;
    completed: boolean;
}

interface CreateTodoRequest {
    title: string;
    description?: string;
}

interface UpdateTodoRequest {
    title?: string;
    description?: string;
    completed?: boolean;
}

const app = new Hono();

// GET /todos
app.get('/todos', async (c) => {
    try {
        const result = await pool.query('SELECT * FROM todos');
        return c.json(result.rows);
    } catch (error) {
        return c.json({ error: 'Failed to fetch todos' }, 500);
    }
});

// POST nasza-domena.com/todos
app.post('/todos', async (c) => {
    try {
        const body: CreateTodoRequest = await c.req.json();

        if (!body.title) {
            return c.json({ error: 'Title is required' }, 400);
        }

        const result = await pool.query(
            'INSERT INTO todos (title, description) VALUES ($1, $2) RETURNING *',
            [body.title, body.description || null]
        );

        return c.json(result.rows[0]);
    } catch (error) {
        return c.json({ error: 'Failed to create todo' }, 500);
    }
});

// PUT /todos/:id
app.put('/todos/:id', async (c) => {
    try {
        const id = parseInt(c.req.param('id'));
        const body: UpdateTodoRequest = await c.req.json();

        if (isNaN(id)) {
            return c.json({ error: 'Invalid ID' }, 400);
        }

        const result = await pool.query(
            `UPDATE todos
             SET title = COALESCE($1, title),
                 description = COALESCE($2, description),
                 completed = COALESCE($3, completed)
             WHERE id = $4
             RETURNING *`,
            [body.title, body.description, body.completed, id]
        );

        if (result.rows.length === 0) {
            return c.json({ error: 'Todo not found' }, 404);
        }

        return c.json(result.rows[0]);
    } catch (error) {
        return c.json({ error: 'Failed to update todo' }, 500);
    }
});

async function startServer() {
    try {
        await initDatabase();
        console.log('Server started on port 4000');
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
}

if (import.meta.main) {
    startServer();
}

export default {
    port: 4000,
    fetch: app.fetch,
};

export { app };