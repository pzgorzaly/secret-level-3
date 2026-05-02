# Ćwiczenie 7: Dockerfile dla Hono API

# Używamy Bun jako runtime (szybszy niż Node.js)
FROM oven/bun:1-alpine as base

# Metadata
LABEL maintainer="developer@example.com" \
      description="Hono API z PostgreSQL dla Todo aplikacji" \
      version="1.0.0"

# Zmienne środowiskowe
ENV NODE_ENV=production
ENV PORT=4000

# Instalacja curl dla health checku
RUN apk add --no-cache curl

# Tworzenie użytkownika (bezpieczeństwo)
RUN addgroup -g 1001 -S nodejs && \
    adduser -S apiuser -u 1001

# Katalog roboczy
WORKDIR /app

# Kopiowanie package.json i bun.lockb
COPY package.json bun.lockb* ./

# Instalacja zależności
RUN bun install --frozen-lockfile --production

# Kopiowanie kodu źródłowego
COPY src/ ./src/

# Build aplikacji
RUN bun build src/server.ts --outdir dist --target node

# Zmiana właściciela plików
RUN chown -R apiuser:nodejs /app

# Przełączenie na niepriviledged user
USER apiuser

# Expose port
EXPOSE 4000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s --retries=3 \
  CMD curl -f http://localhost:4000/health || exit 1

# Komenda uruchomienia
CMD ["bun", "start"]

# Alternatywnie możesz użyć Node.js:
# CMD ["node", "dist/server.js"]