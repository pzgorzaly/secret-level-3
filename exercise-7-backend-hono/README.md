# Ćwiczenie 7: Backend API z Hono i PostgreSQL

## Cel ćwiczenia
Zrozumieć jak budować nowoczesne API backendowe używając najszybszego JavaScript frameworka - Hono, z bazą danych PostgreSQL.

## Czego się nauczysz?
- Czym jest Hono Framework i dlaczego jest tak szybki
- Jak budować REST API z pełnym CRUD
- Łączenie aplikacji z bazą danych PostgreSQL
- Walidacja danych i obsługa błędów
- Struktura profesjonalnego API

## Co to jest Hono?

### 🔥 **Hono = "Fire" po japońsku**
- **Ultra-szybki** - najszybszy JavaScript framework
- **Lightweight** - tylko ~12KB
- **Modern** - TypeScript first
- **Versatile** - działa wszędzie (Bun, Node.js, Cloudflare Workers, Deno)

### ⚡ **Dlaczego Hono?**
```
Benchmark (req/sec):
Hono:     ~50,000
Express:  ~15,000
Fastify:  ~30,000
```

## Stack technologiczny

### 🚀 **Backend**
- **Hono** - ultra-fast web framework
- **Bun** - najszybszy JavaScript runtime
- **PostgreSQL** - relacyjna baza danych
- **TypeScript** - type safety

### 📊 **API Features**
- **CRUD Operations** - Create, Read, Update (Delete w następnych ćwiczeniach)
- **Query Parameters** - filtrowanie, sortowanie
- **Data Validation** - sprawdzanie poprawności
- **Error Handling** - profesjonalna obsługa błędów
- **CORS** - współpraca z frontend

## Jak uruchomić ćwiczenie?

### Krok 1: Zainstaluj Bun (zalecane)
```bash
# macOS/Linux
curl -fsSL https://bun.sh/install | bash

# Windows (PowerShell)
powershell -c "irm bun.sh/install.ps1 | iex"

# Sprawdź instalację
bun --version
```

### Krok 2: Skopiuj plik środowiskowy
```bash
cp .env.template .env
```

Możesz edytować `.env` jeśli chcesz zmienić konfigurację.

### Krok 3: Zainstaluj zależności
```bash
bun install
```

### Krok 4: Uruchom bazę danych
```bash
npm run setup
```

Co się dzieje:
- **PostgreSQL** startuje na porcie 5432
- **Automatyczne** tworzenie tabel i przykładowych danych
- **Database** gotowa do połączenia z API

### Krok 5: Uruchom API lokalnie
```bash
npm run dev
```

Co się dzieje:
- **Hono API** startuje lokalnie z hot reload
- **Łączy się** z bazą danych w Docker
- **Najszybszy** development workflow

### Krok 6: Przetestuj API

**Health check:**
```bash
curl http://localhost:4000/health
```

**Lista todos:**
```bash
curl http://localhost:4000/todos
```

**Statystyki:**
```bash
curl http://localhost:4000/stats
```

## Dostępne endpointy

### 📋 **GET /todos**
Lista wszystkich todos z opcjonalnym filtrowaniem
```bash
# Wszystkie todos
curl http://localhost:4000/todos

# Tylko ukończone
curl "http://localhost:4000/todos?completed=true"

# Tylko wysokiego priorytetu
curl "http://localhost:4000/todos?priority=high"

# Sortowanie po priorytecie
curl "http://localhost:4000/todos?sort=priority"
```

### 🔍 **GET /todos/:id**
Szczegóły konkretnego todo
```bash
curl http://localhost:4000/todos/1
```

### ➕ **POST /todos**
Tworzenie nowego todo
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Nowe zadanie",
    "description": "Opis zadania",
    "priority": "high"
  }' \
  http://localhost:4000/todos
```

### ✏️ **PUT /todos/:id**
Pełna aktualizacja todo
```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Zaktualizowane zadanie",
    "description": "Nowy opis",
    "completed": true,
    "priority": "low"
  }' \
  http://localhost:4000/todos/1
```

### ✅ **PATCH /todos/:id/complete**
Toggle status ukończenia
```bash
curl -X PATCH http://localhost:4000/todos/1/complete
```

### 📊 **GET /stats**
Statystyki todos
```bash
curl http://localhost:4000/stats
```

### ❤️ **GET /health**
Health check aplikacji
```bash
curl http://localhost:4000/health
```

## Struktura danych

### Todo Model
```typescript
interface Todo {
  id: number;
  title: string;
  description: string | null;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}
```

### Request/Response Examples

**Tworzenie todo:**
```json
POST /todos
{
  "title": "Nauka Hono",
  "description": "Zrozumienie najszybszego frameworka",
  "priority": "high"
}

Response:
{
  "success": true,
  "data": {
    "id": 7,
    "title": "Nauka Hono",
    "description": "Zrozumienie najszybszego frameworka",
    "completed": false,
    "priority": "high",
    "created_at": "2024-01-01T10:00:00.000Z",
    "updated_at": "2024-01-01T10:00:00.000Z"
  },
  "message": "Todo zostało utworzone pomyślnie"
}
```

## Features implementowane

### ✅ **Data Validation**
- Tytuł jest wymagany i max 255 znaków
- Priorytet: tylko 'low', 'medium', 'high'
- ID musi być liczbą w parametrach URL

### ✅ **Query Parameters**
- `completed=true/false` - filtrowanie po statusie
- `priority=low/medium/high` - filtrowanie po priorytecie
- `sort=priority/created/title` - sortowanie

### ✅ **Error Handling**
- Walidacja danych wejściowych
- 404 dla nieistniejących resources
- 500 dla błędów serwera
- Szczegółowe komunikaty błędów

### ✅ **CORS Support**
- Skonfigurowane dla frontend (porty 3000, 5173)
- Odpowiednie HTTP methods
- Content-Type headers

### ✅ **Database Features**
- Auto-update `updated_at` trigger
- SERIAL primary keys
- Check constraints na priority
- Indexes dla wydajności

## Development commands

### Development workflow
```bash
# Setup - uruchom bazę danych
npm run setup

# Development - uruchom API lokalnie (zalecane)
npm run dev

# Alternative - uruchom API w Docker
npm run api:docker

# Full stack w Docker (API + DB + PgAdmin)
npm run full:docker
```

### Database management
```bash
# Uruchom tylko bazę danych
npm run db:up

# Zatrzymaj bazę
npm run db:down

# Reset bazy (usuń dane)
npm run db:reset

# Zobacz logi bazy
npm run db:logs
```

### Database operations
```bash
# Połącz się z bazą
npm run db:connect

# W psql wykonaj:
\dt                    # Lista tabel
SELECT * FROM todos;   # Pokaż wszystkie todos
\q                     # Wyjście
```

## Co robić dalej?

### Eksperymentuj!

1. **Dodaj więcej todos** przez API
2. **Filtruj i sortuj** używając query parameters
3. **Zobacz strukturę bazy** przez PgAdmin (http://localhost:8080)
4. **Monitoruj logi** aplikacji

### Zadania do samodzielnego wykonania

1. **Walidacja email** - dodaj pole email do todo
2. **Pagination** - dodaj ?page=1&limit=10
3. **Search** - dodaj ?search=tekst
4. **Categories** - dodaj pole category

### ⚠️ **WAŻNE: Brakujący DELETE endpoint**

Zauważ że **DELETE /todos/:id** NIE JEST ZAIMPLEMENTOWANY!
To będzie Twoje zadanie w **Ćwiczeniu 9** - Turborepo! 🎯

## Dlaczego Hono + Bun?

### 🚀 **Wydajność**
```
Startup time:
Bun:    ~20ms
Node:   ~200ms

Memory usage:
Hono:   ~15MB
Express: ~35MB
```

### 🛠️ **Developer Experience**
- TypeScript out of the box
- Hot reload w dev mode
- Excellent error messages
- Modern JavaScript features

### 🌍 **Portability**
- Edge computing ready
- Serverless friendly
- Multi-runtime support

## Troubleshooting

### Problem: Port już zajęty
```bash
# Znajdź proces na porcie 4000
lsof -i :4000

# Zabij proces
kill -9 <PID>

# Lub zmień port w .env
PORT=4001
```

### Problem: Baza danych nie startuje
```bash
# Sprawdź logi
docker-compose logs db

# Restart tylko bazy
docker-compose restart db
```

### Problem: Bun nie działa
```bash
# Fallback na Node.js
npm run build
npm start
```

## Co dalej?

Przejdź do `exercise-8-frontend-react` aby stworzyć interfejs użytkownika dla tego API!