# Ćwiczenie 9: Turborepo - Full Stack Monorepo

## 🎉 Gratulacje! Final Boss Developer Tools!

To jest **ostatnie i najważniejsze** ćwiczenie w naszym journey po narzędziach deweloperskich. Tutaj łączymy wszystko w profesjonalną architekturę monorepo z **kompletnym CRUD** - w tym długo oczekiwaną **DELETE funkcjonalność**!

## Cel ćwiczenia
Zrozumieć czym jest architektura monorepo, dlaczego wielkie firmy (Google, Facebook, Netflix) z niej korzystają i jak Turborepo rewolucjonizuje development experience.

## Czego się nauczysz?
- **Monorepo vs Polyrepo** - kiedy używać którego podejścia
- **Turborepo** - najszybszy build system dla JavaScript/TypeScript
- **Shared dependencies** - jak zarządzać zależnościami w monorepo
- **Incremental builds** - budowanie tylko tego co się zmieniło
- **Task orchestration** - równoległe uruchamianie zadań
- **Complete CRUD implementation** - z DELETE endpoint!

## 🏗️ Architektura Monorepo

```
exercise-9-turborepo/
├── package.json              # Root package.json (workspace)
├── turbo.json                # Turborepo konfiguracja
├── .env.template              # Shared environment variables
├── apps/                      # Aplikacje
│   ├── api/                   # Backend (Hono + PostgreSQL)
│   │   ├── src/server.ts      # API z DELETE endpoint!
│   │   ├── package.json       # API dependencies
│   │   └── docker-compose.yml # Database
│   └── web/                   # Frontend (React + Vite)
│       ├── src/App.tsx        # UI z DELETE funkcjonalnością!
│       ├── package.json       # Web dependencies
│       └── vite.config.ts     # Vite config
└── packages/                  # Shared packages (opcjonalne)
    └── shared-types/          # Wspólne typy TypeScript
```

## 🚀 Nowe funkcjonalności w tym ćwiczeniu

### 🎯 **Kompletny CRUD**
- ✅ **CREATE** - POST /todos (już było)
- ✅ **READ** - GET /todos, GET /todos/:id (już było)
- ✅ **UPDATE** - PUT /todos/:id, PATCH /todos/:id/complete (już było)
- 🎉 **DELETE** - DELETE /todos/:id (**NOWE!**)

### 🏗️ **Monorepo Benefits**
- **Shared code** - wspólne typy, utilities
- **Atomic changes** - zmiana frontend + backend w jednym commit
- **Unified tooling** - jeden lint, test, build dla wszystkich
- **Dependency management** - zarządzanie z jednego miejsca

### ⚡ **Turborepo Superpowers**
- **Cache everything** - nigdy nie buduj tego samego dwa razy
- **Parallel execution** - wszystkie CPU cores w akcji
- **Smart scheduling** - dependency-aware task running
- **Remote caching** - cache współdzielony między developerami

## Jak uruchomić ćwiczenie?

### Krok 1: Setup Environment
```bash
# Skopiuj environment files
npm run setup:env

# LUB ręcznie:
cp .env.template .env
cp apps/api/.env.template apps/api/.env
cp apps/web/.env.template apps/web/.env
```

### Krok 2: Install Dependencies
```bash
# Zainstaluj wszystkie zależności (root + apps)
npm install
```

Co się dzieje:
- **Workspace resolution** - npm wie o apps/* strukturze
- **Hoisting** - wspólne dependencies w root node_modules
- **Linking** - apps mogą importować z packages/*

### Krok 3: Start Database
```bash
# Uruchom PostgreSQL
npm run setup:db
```

### Krok 4: Start Everything!
```bash
# Uruchom cały stack w trybie development
npm run dev
```

Co się dzieje:
- **Turborepo** uruchamia `turbo run dev --parallel`
- **API** startuje na http://localhost:4000
- **Web** startuje na http://localhost:3000
- **Hot reload** dla obu aplikacji
- **Shared cache** między wszystkimi tasks

### Krok 5: Test Complete CRUD

**Open aplikację:**
http://localhost:3000

**Test nowej DELETE funkcjonalności:**
1. Dodaj kilka todos przez UI
2. Kliknij "🗑️ Usuń zadanie" na dowolnym todo
3. Potwierdź w alert dialog
4. Zobacz jak todo znika z listy!

## 🎯 Zadanie główne: Przetestuj DELETE

### Backend DELETE endpoint

**Test przez curl:**
```bash
# Sprawdź todos
curl http://localhost:4000/todos

# Usuń todo o ID 1
curl -X DELETE http://localhost:4000/todos/1

# Sprawdź czy zniknął
curl http://localhost:4000/todos
```

**Response format:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Usunięte zadanie",
    "description": "...",
    "completed": false,
    "priority": "medium",
    "created_at": "...",
    "updated_at": "..."
  },
  "message": "Todo \"Usunięte zadanie\" zostało usunięte pomyślnie"
}
```

### Frontend DELETE functionality

**Nowy UI element:**
- **Delete button** w każdym todo card
- **Confirmation dialog** przed usunięciem
- **Loading state** podczas usuwania
- **Auto refresh** listy po usunięciu
- **Error handling** jeśli usuwanie się nie powiedzie

## Turborepo Commands

### Development workflow
```bash
# Start wszystkich apps w trybie dev
npm run dev

# Build wszystkich apps
npm run build

# Lint wszystkich apps
npm run lint

# Test wszystkich apps
npm run test

# Clean wszystkich apps
npm run clean
```

### Advanced Turborepo
```bash
# Build tylko web app
npx turbo run build --filter=@todo-app/web

# Lint tylko API
npx turbo run lint --filter=@todo-app/api

# Run dev dla API + jego dependencies
npx turbo run dev --filter=@todo-app/api...

# Show task graph
npx turbo run build --graph

# Show cache status
npx turbo run build --summarize
```

## Turborepo Pipeline

**W pliku `turbo.json`:**
```json
{
  "pipeline": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**", ".next/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {
      "dependsOn": ["^lint"]
    }
  }
}
```

### Co to oznacza?

- **`"dependsOn": ["^build"]`** - build czeka na build dependencies
- **`"cache": false`** - dev mode nie jest cache'owany
- **`"persistent": true`** - dev mode działa w tle
- **`"outputs"`** - które foldery cache'ować

## Monorepo vs Polyrepo

### 🏗️ **Monorepo (jedna repo)**

**Pros:**
- ✅ **Atomic changes** - jednym PR zmieniasz frontend + backend
- ✅ **Code sharing** - wspólne typy, utilities, komponenty
- ✅ **Unified tooling** - jeden ESLint, Prettier, test setup
- ✅ **Dependency management** - wszystko w jednym miejscu
- ✅ **Refactoring** - IDE widzi wszystkie usage
- ✅ **Onboarding** - `git clone && npm install && npm run dev`

**Cons:**
- ❌ **Repository size** - może być bardzo duże
- ❌ **CI/CD complexity** - trzeba budować tylko zmienione części
- ❌ **Permissions** - trudniej ograniczyć dostęp do części kodu

### 📦 **Polyrepo (wiele repo)**

**Pros:**
- ✅ **Independence** - każdy team może pracować w swoim tempie
- ✅ **Permissions** - łatwe ograniczanie dostępu
- ✅ **CI/CD simplicity** - każda repo ma swój pipeline
- ✅ **Language diversity** - różne tech stacki

**Cons:**
- ❌ **Code duplication** - powtarzanie tego samego kodu
- ❌ **Dependency hell** - trudne zarządzanie wersjami
- ❌ **Cross-repo changes** - zmiana w kilku repo = kilka PR
- ❌ **Tooling fragmentation** - różne standardy w każdej repo

## Kto używa Monorepo?

### 🏢 **Google**
- **Jedna mega repo** - 2+ miliardy linii kodu
- **Bazel** - vlastny build system
- **Rozwiązania** dla 40,000+ developerów

### 📘 **Meta (Facebook)**
- **Mercurial** zamiast Git
- **Buck** - build system
- **React, Jest, Metro** - wszystko w jednej repo

### 🎬 **Netflix**
- **Multi-language** monorepo
- **Microservices** z shared libraries
- **Conductor** - workflow orchestration

### 🔷 **Microsoft**
- **Office suite** w monorepo
- **Rush** - wielka skala npm projects
- **TypeScript** compiler jako shared tool

## Advanced Turborepo Features

### 1. **Remote Caching**
```bash
# Setup Vercel remote cache (darmowy)
npx turbo login
npx turbo link

# Build z remote cache
npx turbo run build
```

### 2. **Filtering**
```bash
# Run task dla konkretnej app
turbo run build --filter=web

# Run task dla app + dependencies
turbo run test --filter=api...

# Run task dla zmian od main brancha
turbo run lint --filter=[main]
```

### 3. **Task Dependencies**
```json
{
  "pipeline": {
    "test": {
      "dependsOn": ["build", "^build"]
    }
  }
}
```

### 4. **Workspace Packages**
```bash
# Add dependency to specific app
npm install lodash --workspace=apps/api

# Add shared package to app
npm install @todo-app/shared-types --workspace=apps/web
```

## Code Sharing Patterns

### 1. **Shared Types**
```typescript
// packages/shared-types/src/index.ts
export interface Todo {
  id: number;
  title: string;
  // ...
}

// apps/api/src/server.ts
import { Todo } from '@todo-app/shared-types';

// apps/web/src/App.tsx
import { Todo } from '@todo-app/shared-types';
```

### 2. **Shared Utilities**
```typescript
// packages/utils/src/validation.ts
export const validateTodo = (todo: any): boolean => {
  return typeof todo.title === 'string' && todo.title.length > 0;
};
```

### 3. **Shared UI Components**
```typescript
// packages/ui/src/Button.tsx
export const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};
```

## Performance Benefits

### ⚡ **Cache Everything**
```bash
# First build
turbo run build  # 45 seconds

# No changes, second build
turbo run build  # 0.2 seconds (cache hit!)

# Change only web app
turbo run build  # 15 seconds (only web rebuilds)
```

### 🔄 **Parallel Execution**
```bash
# Without Turborepo
npm run lint && npm run test && npm run build  # 120s total

# With Turborepo
turbo run lint test build  # 45s total (parallel)
```

### 📊 **Incremental Builds**
```
Changed files: apps/web/src/App.tsx

Tasks to run:
✅ Skip: api:build (no changes)
🔄 Run:  web:build (source changed)
🔄 Run:  web:test (depends on build)
```

## Production Deployment

### 1. **Docker Multi-stage**
```dockerfile
# Build stage
FROM node:18 AS builder
WORKDIR /app
COPY . .
RUN npm ci
RUN npx turbo run build

# Production stage
FROM node:18-alpine AS runner
COPY --from=builder /app/apps/api/dist /app/api
COPY --from=builder /app/apps/web/dist /app/web
```

### 2. **Vercel Deployment**
```json
{
  "builds": [
    { "src": "apps/web/package.json", "use": "@vercel/static-build" },
    { "src": "apps/api/package.json", "use": "@vercel/node" }
  ]
}
```

### 3. **CI/CD Pipeline**
```yaml
- name: Setup Turborepo
  run: |
    npm ci
    npx turbo run lint test build --cache-dir=.turbo

- name: Deploy Web
  run: npx turbo run deploy --filter=web

- name: Deploy API
  run: npx turbo run deploy --filter=api
```

## Debugging i Troubleshooting

### Problem: Cache corruption
```bash
# Clear all cache
npx turbo run clean
rm -rf .turbo

# Clear specific app cache
npx turbo run clean --filter=web
```

### Problem: Dependency issues
```bash
# Reinstall all dependencies
rm -rf node_modules apps/*/node_modules
npm install
```

### Problem: Port conflicts
```bash
# Check what's running on ports
lsof -i :3000
lsof -i :4000

# Kill processes
kill -9 $(lsof -ti:3000)
```

### Problem: Database connection
```bash
# Restart database
cd apps/api
npm run compose:down
npm run compose:up:db

# Check database logs
npm run compose:logs
```

## Następne kroki (Advanced)

### 🎯 **Production Ready Features**
1. **Authentication** - JWT tokens, user management
2. **Authorization** - role-based access control
3. **File uploads** - images, attachments
4. **Real-time updates** - WebSockets, Server-Sent Events
5. **Search** - full-text search, filters
6. **Notifications** - email, push notifications

### 🏗️ **Scaling Architecture**
1. **Microservices** - split API into smaller services
2. **Event sourcing** - audit logs, replay capability
3. **CQRS** - separate read/write models
4. **Message queues** - async processing
5. **Load balancing** - multiple API instances
6. **CDN** - static assets caching

### 📊 **Monitoring & Observability**
1. **Logging** - structured logs, log aggregation
2. **Metrics** - Prometheus, Grafana dashboards
3. **Tracing** - distributed tracing with Jaeger
4. **Error tracking** - Sentry, error alerting
5. **Performance monitoring** - APM tools
6. **Health checks** - uptime monitoring

### 🚀 **DevOps & Infrastructure**
1. **Kubernetes** - container orchestration
2. **Terraform** - infrastructure as code
3. **CI/CD pipelines** - automated testing & deployment
4. **Environment management** - dev/staging/prod
5. **Database migrations** - schema versioning
6. **Backup strategies** - data protection

## 🏆 Gratulacje!

**Ukończyłeś kompletny Full Stack Development journey!**

Przeszedłeś drogę od:
1. **Prostego skryptu JavaScript** (ćwiczenie 1)
2. **TypeScript z typami** (ćwiczenie 2)
3. **NPM dependencies** (ćwiczenie 3)
4. **Automatyzacji z scripts** (ćwiczenie 4)
5. **Konteneryzacji z Docker** (ćwiczenie 5)
6. **Orkiestracji z Compose** (ćwiczenie 6)
7. **Backend API z Hono** (ćwiczenie 7)
8. **Frontend z React** (ćwiczenie 8)
9. **Monorepo z Turborepo** (ćwiczenie 9) ← **TUTAJ JESTEŚ!**

### Masz teraz:
- ✅ **Kompletną aplikację Full Stack**
- ✅ **Professional developer workflow**
- ✅ **Modern tech stack** (React, Hono, PostgreSQL, Docker, Turborepo)
- ✅ **Production-ready architecture**
- ✅ **Complete CRUD with DELETE**
- ✅ **Monorepo expertise**

### Następny poziom:
- 🚀 **Deploy to production** (Vercel, Railway, fly.io)
- 📊 **Add monitoring** (analytics, error tracking)
- 🎯 **Advanced features** (auth, real-time, search)
- 🏗️ **Scale architecture** (microservices, caching)
- 👥 **Team collaboration** (code review, testing strategies)

**Welcome to the club of Full Stack Developers!** 🎉

---

*Ten tutorial pokazał Ci narzędzia używane przez najlepsze tech companies na świecie. Teraz czas na Twoje własne projekty!*