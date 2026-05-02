import { useState, useEffect } from 'react';
import './App.css';

// Types
interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
}

const API_BASE_URL = 'http://localhost:4000';

function App() {
  // State management
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoDescription, setNewTodoDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Delete state
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

  // API functions
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/todos`);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setTodos(data);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch todos');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTodoTitle.trim()) {
      setError('Title is required');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTodoTitle.trim(),
          description: newTodoDescription.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Reset form
        setNewTodoTitle('');
        setNewTodoDescription('');

        // Refresh data
        await fetchTodos();
      } else {
        throw new Error(data.error || 'Failed to create todo');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create todo');
      console.error('Error creating todo:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTodoComplete = async (id: number) => {
    try {
      const todo = todos.find(t => t.id === id);
      if (!todo) return;

      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !todo.completed,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchTodos();
      } else {
        throw new Error(data.error || 'Failed to update todo');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  // DELETE functionality
  const deleteTodo = async (id: number, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`)) {
      return;
    }

    try {
      setDeletingIds(prev => new Set(prev).add(id));
      setError(null);

      const response = await fetch(`${API_BASE_URL}/todos/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (response.ok) {
        console.log(`🗑️ Deleted todo: ${data.title}`);
        await fetchTodos();
      } else {
        throw new Error(data.error || 'Failed to delete todo');
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo');
      console.error('Error deleting todo:', err);
    } finally {
      setDeletingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  // Effects
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="app">
      <header className="app-header">
        <h1>🗑️ Full CRUD Todos App</h1>
        <p>Simple frontend with DELETE functionality</p>
      </header>

      {/* Create Todo Form */}
      <section className="create-todo">
        <h2>➕ Add new task</h2>
        <form onSubmit={createTodo} className="todo-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              id="title"
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="What do you want to do?"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={newTodoDescription}
              onChange={(e) => setNewTodoDescription(e.target.value)}
              placeholder="Additional details..."
              rows={3}
            />
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting || !newTodoTitle.trim()}
          >
            {isSubmitting ? '⏳ Adding...' : '➕ Add task'}
          </button>
        </form>
      </section>

      {/* Error Display */}
      {error && (
        <div className="error-message">
          ❌ {error}
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      {/* Todos List */}
      <section className="todos-list">
        <h2>📋 Task List ({todos.length})</h2>

        {loading ? (
          <div className="loading">⏳ Loading...</div>
        ) : todos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>No tasks</h3>
            <p>Add your first task!</p>
          </div>
        ) : (
          <div className="todos-grid">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`todo-card ${todo.completed ? 'completed' : ''}`}
              >
                <div className="todo-header">
                  <div className="todo-id">#{todo.id}</div>
                </div>

                <div className="todo-content">
                  <h3 className="todo-title">{todo.title}</h3>
                  {todo.description && (
                    <p className="todo-description">{todo.description}</p>
                  )}
                </div>

                <div className="todo-footer">
                  <button
                    className={`toggle-btn ${todo.completed ? 'completed' : 'pending'}`}
                    onClick={() => toggleTodoComplete(todo.id)}
                  >
                    {todo.completed ? '✅ Completed' : '⏳ Mark as completed'}
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => deleteTodo(todo.id, todo.title)}
                    disabled={deletingIds.has(todo.id)}
                  >
                    {deletingIds.has(todo.id) ? '🗑️ Deleting...' : '🗑️ Delete'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          🚀 Built with <strong>Turborepo</strong> + <strong>React</strong> + <strong>Hono</strong>
        </p>
        <p>
          🗑️ Complete CRUD with <strong>DELETE functionality</strong> on {API_BASE_URL}
        </p>
      </footer>
    </div>
  );
}

export default App;