# Ćwiczenie 5: Docker - Konteneryzacja aplikacji

## Cel ćwiczenia
Zrozumieć czym są kontenery Docker i dlaczego rewolucjonizują sposób w jaki dostarczamy aplikacje.

## Czego się nauczysz?
- Czym jest kontener i czym różni się od maszyny wirtualnej
- Jak napisać Dockerfile
- Jak budować i uruchamiać kontenery
- Dlaczego Docker rozwiązuje problem "works on my machine"

## Co znajduje się w tym folderze?
- `script.ts` - serwer Express z wieloma endpointami
- `package.json` - zależności i NPM scripts dla Docker
- `Dockerfile` - przepis na budowanie kontenera
- `.dockerignore` - pliki ignorowane przez Docker
- `README.md` - instrukcje

## Co to jest Docker?

### 🚢 **Kontenery vs Maszyny Wirtualne**

**Maszyna Wirtualna:**
```
┌─────────────────────────┐
│       Aplikacja         │
├─────────────────────────┤
│    System Operacyjny    │
├─────────────────────────┤
│       Hypervisor        │
├─────────────────────────┤
│    Host OS              │
└─────────────────────────┘
```

**Kontener Docker:**
```
┌─────────────────────────┐
│       Aplikacja         │
├─────────────────────────┤
│    Docker Runtime       │
├─────────────────────────┤
│       Host OS           │
└─────────────────────────┘
```

### 🎯 **Korzyści Dockera:**
- **Portability** - działa wszędzie jednakowo
- **Efficiency** - mniej zasobów niż VM
- **Consistency** - identyczne środowiska
- **Scalability** - łatwe skalowanie

## Jak uruchomić ćwiczenie?

### Krok 1: Upewnij się że masz Docker
```bash
docker --version
docker info
```

### Krok 2: Zainstaluj zależności lokalnie (dla developmentu)
```bash
npm install
```

### Krok 3: Przetestuj aplikację lokalnie
```bash
npm run dev
```
Aplikacja będzie dostępna na http://localhost:3000

### Krok 4: Zbuduj obraz Docker
```bash
npm run docker:build
```

Co się dzieje:
- Docker czyta `Dockerfile`
- Pobiera bazowy obraz `node:18-alpine`
- Instaluje zależności
- Kompiluje TypeScript
- Tworzy gotowy obraz aplikacji

### Krok 5: Uruchom kontener
```bash
npm run docker:run
```

### Krok 6: Przetestuj endpointy
```bash
npm run test:endpoints
```

Albo ręcznie:
```bash
curl http://localhost:3000
curl http://localhost:3000/health
curl http://localhost:3000/metrics
```

## Dockerfile - krok po kroku

### 1. **Bazowy obraz**
```dockerfile
FROM node:18-alpine
```
- `node:18-alpine` - oficjalny obraz Node.js
- `alpine` - minimalna dystrybucja Linux (~5MB)

### 2. **Kopiowanie zależności**
```dockerfile
COPY package*.json ./
RUN npm ci --only=production
```
- Pierwsze kopiowanie `package.json` (cache warstw!)
- `npm ci` - szybsza i deterministyczna instalacja

### 3. **Kopiowanie kodu**
```dockerfile
COPY script.ts ./
RUN tsc script.ts
```
- Kompilacja TypeScript w kontenerze

### 4. **Bezpieczeństwo**
```dockerfile
RUN adduser -S nextjs -u 1001
USER nextjs
```
- Nie używaj root w kontenerach!

### 5. **Health check**
```dockerfile
HEALTHCHECK --interval=30s CMD curl -f http://localhost:3000/health
```
- Docker monitoruje czy aplikacja działa

## Ważne komendy Docker

### Budowanie obrazów
```bash
docker build -t nazwa-obrazu .
docker build --build-arg NODE_ENV=development .
```

### Uruchamianie kontenerów
```bash
docker run -p 3000:3000 nazwa-obrazu                    # Foreground
docker run -d -p 3000:3000 --name my-app nazwa-obrazu   # Background
docker run -e NODE_ENV=production nazwa-obrazu          # Ze zmiennymi
```

### Zarządzanie kontenerami
```bash
docker ps                        # Lista działających
docker ps -a                     # Lista wszystkich
docker logs nazwa-kontenera      # Logi
docker exec -it kontener bash    # Wejście do kontenera
docker stop kontener             # Stop
docker rm kontener               # Usuń
```

### Zarządzanie obrazami
```bash
docker images                    # Lista obrazów
docker rmi obraz                 # Usuń obraz
docker system prune              # Cleanup
```

## Eksperyment: Porównaj środowiska

### 1. **Lokalne uruchomienie**
```bash
npm run dev
curl http://localhost:3000
```

### 2. **W kontenerze**
```bash
npm run docker:run
curl http://localhost:3000
```

### Różnice:
- **Hostname** - różny w kontenerze
- **Platform info** - może się różnić
- **Process ID** - zawsze 1 w kontenerze
- **Isolation** - kontener ma własny filesystem

## Best Practices

### 1. **Multi-stage builds** (zaawansowane)
```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
CMD ["npm", "start"]
```

### 2. **Cache warstw**
- Kopiuj `package.json` przed kodem
- Instaluj zależności przed kopowaniem kodu
- Często zmieniające się pliki na końcu

### 3. **Minimalne obrazy**
- Używaj `alpine` variant
- Multi-stage builds
- Usuwaj niepotrzebne pliki

### 4. **Bezpieczeństwo**
- Nie używaj root
- Aktualizuj bazowe obrazy
- Skanuj pod kątem vulnerabilities

## .dockerignore
Jak `.gitignore` ale dla Docker:
```
node_modules/
*.log
.git/
README.md
```

## Co dalej?

Przejdź do `exercise-6-docker-compose` aby zobaczyć jak orkiestrować wiele kontenerów jednocześnie!