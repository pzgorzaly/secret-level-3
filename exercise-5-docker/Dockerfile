FROM node:22

WORKDIR /app

# Kopiujemy pliki zależności
COPY package*.json ./
RUN npm install

# Instalujemy TypeScript
RUN npm install -g typescript@5.9.3

# Kopiujemy resztę plików
COPY . .

# Kompilujemy projekt używając ustawień z tsconfig.json
RUN tsc

# Uruchamiamy skompilowany plik
CMD ["node", "script.js"]