# Ćwiczenie 8: Frontend React Todo App

## Cel ćwiczenia
Zrozumieć jak budować nowoczesne aplikacje frontendowe używając React, TypeScript i Vite, łącząc się z naszym Hono API.

## Czego się nauczysz?
- Czym jest React i dlaczego jest najpopularniejszym frontend frameworkiem
- Jak TypeScript pomaga w frontend developmencie
- Czym jest Vite i dlaczego jest tak szybki
- Jak łączyć frontend z backend API
- Modern React Hooks i state management

## Stack technologiczny

### ⚡ **Vite**
- **Ultra-fast** build tool i dev server
- **Hot Module Replacement** - błyskawiczne updates
- **ES Modules** native support
- **TypeScript** out of the box

### ⚛️ **React**
- **Najpopularniejszy** frontend framework
- **Component-based** architektura
- **Hooks** dla state management
- **Virtual DOM** dla wydajności

### 🎯 **TypeScript**
- **Type safety** w całym frontend
- **Intellisense** i autocompletowanie
- **Refactoring** bez stresu
- **Interface contracts** z API

## Architektura aplikacji

```
Frontend (React) ←→ Backend (Hono API) ←→ Database (PostgreSQL)
    Port 3000          Port 4000           Port 5432
```

### 📱 **Funkcjonalności**
- ✅ Wyświetlanie listy todos
- ✅ Tworzenie nowych todos
- ✅ Toggle completed status
- ✅ Filtrowanie (status, priorytet)
- ✅ Statystyki w real-time
- ✅ Responsive design
- ❌ Usuwanie todos (zadanie dla Ćwiczenia 9!)

## Jak uruchomić ćwiczenie?

### Krok 1: Upewnij się że backend działa
```bash
# W folderze exercise-7-backend-hono
cd ../exercise-7-backend-hono
npm run compose:up

# Sprawdź czy API działa
curl http://localhost:4000/health
```

### Krok 2: Zainstaluj zależności frontend
```bash
# Wróć do folderu exercise-8-frontend-react
cd ../exercise-8-frontend-react
npm install
```

### Krok 3: Uruchom development server
```bash
npm run dev
```

### Krok 4: Otwórz aplikację
- **URL**: http://localhost:3000
- **Automatycznie** otworzy się w browser
- **Hot reload** - zmiany w kodzie od razu widoczne

## Struktura projektu

```
exercise-8-frontend-react/
├── index.html              # HTML template
├── package.json            # Dependencies i scripts
├── tsconfig.json           # TypeScript config
├── vite.config.ts          # Vite configuration
└── src/
    ├── main.tsx            # Entry point
    ├── App.tsx             # Główny komponent
    └── App.css             # Stylizacja
```

### 🎨 **Minimalistyczna struktura**
- **Jeden plik App.tsx** - cała logika w jednym miejscu
- **Jeden plik CSS** - wszystkie style
- **Zero external libraries** - tylko React + TypeScript
- **Maximum learning** - można zobaczyć wszystko od razu

## Key React Concepts

### 1. **Hooks używane w aplikacji**

#### `useState` - Stan komponentu
```typescript
const [todos, setTodos] = useState<Todo[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
```

#### `useEffect` - Efekty uboczne
```typescript
useEffect(() => {
  fetchTodos();
  fetchStats();
}, [filter, priorityFilter]);
```

### 2. **Event Handling**
```typescript
const createTodo = async (e: React.FormEvent) => {
  e.preventDefault();
  // API call...
};

const toggleTodoComplete = async (id: number) => {
  // API call...
};
```

### 3. **Conditional Rendering**
```typescript
{loading ? (
  <div className="loading">⏳ Ładowanie...</div>
) : todos.length === 0 ? (
  <div className="empty-state">Brak zadań</div>
) : (
  <div className="todos-grid">{/* Todos list */}</div>
)}
```

### 4. **Lists & Keys**
```typescript
{todos.map((todo) => (
  <div key={todo.id} className="todo-card">
    {/* Todo content */}
  </div>
))}
```

## API Integration

### 📡 **Fetch Pattern**
```typescript
const fetchTodos = async () => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(`${API_BASE_URL}/todos`);
    const data = await response.json();

    if (data.success) {
      setTodos(data.data);
    } else {
      throw new Error(data.error);
    }
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### 🔄 **CRUD Operations**
- **CREATE**: POST /todos
- **READ**: GET /todos, GET /todos/:id
- **UPDATE**: PUT /todos/:id, PATCH /todos/:id/complete
- **DELETE**: ❌ Nie zaimplementowane (zadanie!)

## Features walkthrough

### 📊 **Real-time Stats**
- Połączenie z GET /stats endpoint
- Automatyczne odświeżanie po zmianach
- Podział po priorytetach
- Procent ukończenia

### 🔍 **Advanced Filtering**
- Status: wszystkie / oczekujące / ukończone
- Priorytet: wszystkie / wysokie / średnie / niskie
- Automatyczne API calls przy zmianie filtrów

### 📱 **Responsive Design**
- **Mobile-first** approach
- **CSS Grid** dla layoutów
- **Flexbox** dla komponentów
- **Media queries** dla breakpoints

### 🎨 **Modern UI/UX**
- **Gradient backgrounds**
- **Glassmorphism** effects
- **Smooth animations**
- **Color-coded priorities**
- **Hover states**
- **Loading states**

## Development workflow

### 🔥 **Hot Module Replacement**
```bash
npm run dev
# Edytuj src/App.tsx
# Zmiany widoczne natychmiast!
```

### 🔧 **Type checking**
```bash
npm run check-types
```

### 🎯 **Build dla produkcji**
```bash
npm run build
npm run preview  # Test production build
```

### ✨ **Code quality**
```bash
npm run lint     # ESLint
npm run format   # Prettier
```

## Eksperymentowanie

### 1. **Dodaj nowe todo**
- Wypełnij formularz
- Zobacz jak pojawia się w liście
- Sprawdź aktualizację statystyk

### 2. **Testuj filtry**
- Przełączaj między statusami
- Filtruj po priorytetach
- Zobacz jak zmienia się URL query

### 3. **Toggle completed**
- Kliknij "Oznacz jako ukończone"
- Zobacz zmianę stylu
- Sprawdź aktualizację statystyk

### 4. **Responsive design**
- Zmień rozmiar okna browser
- Zobacz adaptację layoutu
- Test na mobile viewport

## Customization ideas

### 🎨 **Styling**
```css
/* Zmień gradient w body */
background: linear-gradient(135deg, #your-colors);

/* Inne kolory priorytetów */
.priority-badge { background: #your-color; }
```

### ⚡ **New Features**
- Search functionality
- Drag & drop reordering
- Dark/light mode toggle
- Export todos to JSON

### 🔧 **API Extensions**
- Pagination
- Categories/tags
- Due dates
- User authentication

## Common Issues & Solutions

### Problem: CORS błędy
```
Access to fetch at 'http://localhost:4000' from origin 'http://localhost:3000' has been blocked by CORS policy
```
**Rozwiązanie**: Sprawdź czy backend działa i ma skonfigurowane CORS

### Problem: API endpoint not found
```
404 - Endpoint nie został znaleziony
```
**Rozwiązanie**: Sprawdź czy backend API jest uruchomiony na porcie 4000

### Problem: TypeScript błędy
```
Property 'id' does not exist on type 'unknown'
```
**Rozwiązanie**: Sprawdź definicje typów i API response format

## Performance tips

### ⚡ **React Optimizations**
- **Key props** w listach
- **Minimal re-renders** przez właściwe state management
- **Error boundaries** dla graceful failures

### 🚀 **Vite Optimizations**
- **Code splitting** automatic
- **Tree shaking** usuwanie martwego kodu
- **Asset optimization** obrazy, fonty

## Porównanie z innymi frameworkami

### ⚛️ **React vs Vue**
```
React: Większa elastyczność, więcej boilerplate
Vue: Łatwiejszy start, mniej opcji
```

### ⚛️ **React vs Angular**
```
React: Library, bottom-up approach
Angular: Full framework, opinionated
```

### ⚡ **Vite vs Create React App**
```
Vite: Szybki, nowoczesny, ES modules
CRA: Stabilny, więcej konfiguracji
```

## Co dalej?

### 📋 **Pełny TodoMVC**
- Editing todos
- Local storage persistence
- Undo/redo functionality
- Bulk operations

### 🔐 **Authentication**
- Login/register
- Protected routes
- JWT tokens
- User profiles

### 🎯 **State Management**
- Redux Toolkit
- Zustand
- Context API
- React Query

### 📱 **Mobile**
- React Native
- PWA features
- Offline support

## ⚠️ **Missing DELETE Feature**

Zauważ że **usuwanie todos** NIE JEST ZAIMPLEMENTOWANE!

W komponencie znajdziesz:
```tsx
<button className="delete-btn disabled" disabled>
  🗑️ DELETE (wkrótce)
</button>
```

To będzie Twoje główne zadanie w **Ćwiczeniu 9 - Turborepo**! 🎯

## Następny krok

Przejdź do `exercise-9-turborepo` aby:
1. **Połączyć** frontend i backend w jednym repo
2. **Zaimplementować** DELETE functionality
3. **Poznać** monorepo architecture
4. **Zobaczyć** professional development workflow

---

Gratulacje! Masz teraz działającą aplikację React! 🎉