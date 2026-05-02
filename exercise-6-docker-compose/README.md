# Ćwiczenie 6: Docker Compose - Orkiestracja wielu kontenerów

## Cel ćwiczenia
Zrozumieć jak łączyć wiele usług (aplikację, bazę danych, cache) w jeden spójny system za pomocą Docker Compose.

## Czego się nauczysz?
- Czym jest orkiestracja kontenerów
- Jak połączyć aplikację z bazą danych
- Jak zarządzać wieloma usługami jednocześnie
- Dlaczego Docker Compose upraszcza development i deployment

## Co znajduje się w tym folderze?
- `script.ts` - full-stack aplikacja Express z PostgreSQL
- `package.json` - zależności i NPM scripts dla Compose
- `Dockerfile` - obraz aplikacji
- `docker-compose.yml` - definicja całego stacka
- `.dockerignore` - pliki ignorowane przez Docker
- `README.md` - instrukcje

## Architektura systemu

```
┌─────────────────────────────────────────────────────────┐
│                    Docker Compose                      │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │    App      │  │ PostgreSQL  │  │   PgAdmin   │    │
│  │ (Node.js)   │  │ (Database)  │  │   (Web UI)  │    │
│  │ Port: 3000  │  │ Port: 5432  │  │ Port: 8080  │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
│  ┌─────────────┐         │                             │
│  │    Redis    │         │                             │
│  │   (Cache)   │    ┌─────────┐                       │
│  │ Port: 6379  │    │ Network │                       │
│  └─────────────┘    └─────────┘                       │
└─────────────────────────────────────────────────────────┘
```

## Stack technologiczny

### 🚀 **Aplikacja (app)**
- **Node.js + Express** - serwer aplikacji
- **TypeScript** - typy i kompilacja
- **PostgreSQL Client** - połączenie z bazą
- **Port 3000** - endpoint HTTP

### 🗄️ **Baza danych (db)**
- **PostgreSQL 15** - relacyjna baza danych
- **Port 5432** - standardowy port PostgreSQL
- **Persistence** - dane zachowane w volume

### 🌐 **PgAdmin (pgadmin)**
- **Interfejs webowy** - zarządzanie bazą przez browser
- **Port 8080** - interfejs administracyjny
- **Credentials**: admin@example.com / admin123

### ⚡ **Redis (redis)**
- **Cache** - szybki storage w pamięci
- **Port 6379** - standardowy port Redis
- **Optional** - dla demonstracji

## Jak uruchomić ćwiczenie?

### Krok 1: Upewnij się że masz Docker Compose
```bash
docker-compose --version
# lub
docker compose --version
```

### Krok 2: Uruchom cały stack
```bash
npm run compose:up:build
```

Co się dzieje:
1. **Budowanie** - tworzy obraz aplikacji z Dockerfile
2. **Pobieranie** - ściąga obrazy PostgreSQL, PgAdmin, Redis
3. **Tworzenie sieci** - izolowana sieć dla kontenerów
4. **Uruchamianie** - startuje wszystkie usługi w odpowiedniej kolejności
5. **Health checks** - sprawdza czy usługi są gotowe

### Krok 3: Sprawdź czy wszystko działa

**Aplikacja:**
```bash
curl http://localhost:3000
curl http://localhost:3000/users
curl http://localhost:3000/stats
```

**PgAdmin:**
- Otwórz http://localhost:8080
- Login: admin@example.com
- Hasło: admin123
- Dodaj serwer: host=db, port=5432, user=postgres, password=supersecretpassword

### Krok 4: Testuj API

**Pobierz użytkowników:**
```bash
curl http://localhost:3000/users | jq
```

**Dodaj nowego użytkownika:**
```bash
curl -X POST -H "Content-Type: application/json" \
     -d '{"name":"Jan Kowalski","email":"jan@example.com","age":25,"city":"Lublin"}' \
     http://localhost:3000/users
```

**Zobacz statystyki:**
```bash
curl http://localhost:3000/stats | jq
```

### Krok 5: Monitoruj logi
```bash
npm run compose:logs:follow
```

## Docker Compose commands

### Zarządzanie stackiem
```bash
# Uruchom w tle
npm run compose:up:detached

# Zatrzymaj
npm run compose:down

# Restart usług
npm run compose:restart

# Zobacz logi
npm run compose:logs

# Kompletny cleanup
npm run compose:clean
```

### Bezpośrednie Docker Compose
```bash
# Sprawdź status
docker-compose ps

# Logs konkretnej usługi
docker-compose logs app
docker-compose logs db

# Wykonaj komendę w kontenerze
docker-compose exec app sh
docker-compose exec db psql -U postgres -d app_db

# Zatrzymaj tylko jedną usługę
docker-compose stop app

# Skalowanie (uruchom 3 instancje app)
docker-compose up --scale app=3
```

## Struktura docker-compose.yml

### 1. **Services** - definicje kontenerów
```yaml
services:
  app:          # Nazwa usługi
    build: .    # Buduj z Dockerfile
    ports:      # Mapowanie portów
      - "3000:3000"
    environment: # Zmienne środowiskowe
      DB_HOST: db
    depends_on:  # Zależności
      - db
```

### 2. **Networks** - izolacja sieciowa
```yaml
networks:
  app-network:
    driver: bridge
```
Kontenery w tej samej sieci mogą się komunikować po nazwach usług!

### 3. **Volumes** - persistence danych
```yaml
volumes:
  postgres_data:    # Named volume
  - ./logs:/app/logs # Bind mount
```

### 4. **Environment variables**
```yaml
environment:
  DB_HOST: db        # Nazwa usługi jako hostname!
  DB_PASSWORD: secret
```

### 5. **Health checks**
```yaml
healthcheck:
  test: ["CMD", "pg_isready", "-U", "postgres"]
  interval: 10s
  retries: 5
```

### 6. **Dependencies**
```yaml
depends_on:
  db:
    condition: service_healthy  # Czeka na health check
```

## Co się dzieje pod maską?

### 1. **Service discovery**
- Każda usługa ma hostname = nazwa service
- `app` łączy się z `db` używając nazwy "db"
- DNS automatycznie zarządzany przez Docker

### 2. **Persistence**
- PostgreSQL dane w named volume `postgres_data`
- Przetrwają restart kontenerów
- Można backupować i migrować

### 3. **Networking**
- Automatyczna izolacja sieciowa
- Tylko exposed porty dostępne z hosta
- Wewnętrzna komunikacja przez prywatną sieć

### 4. **Orchestration**
- Automatyczna kolejność startu (depends_on)
- Health checks i restart policies
- Graceful shutdown całego stacka

## Development workflow

### 1. **Lokalne zmiany**
```bash
# Edytujesz kod...
# Przebuduj tylko aplikację
docker-compose up --build app
```

### 2. **Database management**
```bash
# Połącz się z bazą
npm run db:connect

# Backup
docker-compose exec db pg_dump -U postgres app_db > backup.sql

# Restore
cat backup.sql | docker-compose exec -T db psql -U postgres -d app_db
```

### 3. **Logs i debugging**
```bash
# Logi aplikacji
docker-compose logs -f app

# Wejście do kontenera
docker-compose exec app sh

# Sprawdź zmienne środowiskowe
docker-compose exec app env
```

## Production considerations

### 1. **Secrets management**
```yaml
# Zamiast hardcoded passwords
environment:
  DB_PASSWORD_FILE: /run/secrets/db_password
secrets:
  db_password:
    file: ./secrets/db_password.txt
```

### 2. **Resource limits**
```yaml
services:
  app:
    deploy:
      resources:
        limits:
          memory: 512M
          cpus: '0.5'
```

### 3. **Multiple environments**
```bash
# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

## Troubleshooting

### Problem: Aplikacja nie może połączyć się z bazą
```bash
# Sprawdź czy baza jest gotowa
docker-compose logs db

# Sprawdź network
docker-compose exec app nslookup db

# Sprawdź porty
docker-compose exec app nc -zv db 5432
```

### Problem: Baza danych nie startuje
```bash
# Sprawdź logi PostgreSQL
docker-compose logs db

# Usuń volume i zacznij od nowa
docker-compose down -v
docker-compose up
```

### Problem: Port już zajęty
```bash
# Znajdź co używa portu
lsof -i :3000

# Zmień port w docker-compose.yml
ports:
  - "3001:3000"  # host:container
```

## Dlaczego Docker Compose jest genialne?

### 🚀 **Jedna komenda = cały stack**
```bash
docker-compose up  # Uruchamia wszystko!
```

### 🔧 **Identyczne środowiska**
- Development = Production
- Nowi developerzy: `git clone && docker-compose up`
- Koniec z "works on my machine"

### 📦 **Service isolation**
- Każda usługa w swoim kontenerze
- Różne wersje Node.js/Python/etc
- Czysty shutdown bez śmieci

### 🔄 **Easy scaling**
```bash
docker-compose up --scale app=3  # 3 instancje aplikacji
```

### 🌍 **Real-world ready**
- Load balancers
- Multiple databases
- Monitoring (Prometheus, Grafana)
- Logging (ELK stack)

## Co dalej?

Gratulacje! 🎉 Przeszedłeś przez pełny journey od prostego skryptu JavaScript do orkiestracji kontenerów!

### Następne kroki:
1. **Kubernetes** - orkiestracja na produkcji
2. **CI/CD** - automatyczne buildy i deployment
3. **Monitoring** - Prometheus + Grafana
4. **Service Mesh** - Istio, Linkerd
5. **Infrastructure as Code** - Terraform, Ansible

### Przydatne linki:
- [Docker Compose dokumentacja](https://docs.docker.com/compose/)
- [PostgreSQL Docker Hub](https://hub.docker.com/_/postgres)
- [Express.js dokumentacja](https://expressjs.com/)

---

Masz teraz solidne fundamenty do budowania nowoczesnych aplikacji! 🚀