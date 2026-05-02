# Ćwiczenie 6: Dockerfile dla aplikacji z bazą danych

FROM node:18-alpine

# Metadata
LABEL maintainer="developer@example.com" \
      description="Full Stack aplikacja z PostgreSQL dla ćwiczenia Docker Compose" \
      version="1.0.0"

# Argumenty budowania
ARG NODE_ENV=production
ARG APP_VERSION=1.0.0

# Zmienne środowiskowe
ENV NODE_ENV=${NODE_ENV}
ENV APP_VERSION=${APP_VERSION}
ENV PORT=3000

# Instalacja curl dla health checku
RUN apk add --no-cache curl

# Tworzenie użytkownika
RUN addgroup -g 1001 -S nodejs && \
    adduser -S appuser -u 1001

# Katalog roboczy
WORKDIR /app

# Kopiowanie plików konfiguracji
COPY package*.json ./

# Instalacja zależności
RUN npm ci --only=production && \
    npm cache clean --force

# Kopiowanie kodu źródłowego
COPY script.ts ./

# Instalacja TypeScript do kompilacji
RUN npm install -g typescript

# Kompilacja
RUN tsc script.ts

# Cleanup
RUN npm uninstall -g typescript && \
    rm script.ts

# Zmiana właściciela
RUN chown -R appuser:nodejs /app

# Przełączenie na nieprivileged user
USER appuser

# Port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Komenda uruchomienia
CMD ["npm", "start"]