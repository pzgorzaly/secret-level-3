# Ćwiczenie 3: NPM Dependencies - Zewnętrzne biblioteki

## Cel ćwiczenia
Zrozumieć czym jest NPM (Node Package Manager) i jak programiści wykorzystują gotowe rozwiązania innych programistów.

## Czego się nauczysz?
- Czym jest ekosystem NPM
- Jak instalować i używać zewnętrznych bibliotek
- Dlaczego programiści nie wymyślają wszystkiego od nowa
- Jak różne biblioteki współpracują ze sobą

## Co znajduje się w tym folderze?
- `script.ts` - kod używający 3 różnych bibliotek zewnętrznych
- `package.json` - lista zależności i konfiguracja
- `README.md` - instrukcje

## Jaką bibliotekę używamy?

### **Chalk** - kolorowanie tekstu w konsoli
- Sprawia, że output jest czytelniejszy i bardziej przyjazny
- Różne kolory dla różnych typów informacji
- Wsparcie dla stylów: bold, italic, underline
- Kolory tła i tekstu
- Najczęściej używana biblioteka do UI w terminalu

## Jak uruchomić ćwiczenie?

### Krok 1: Zainstaluj wszystkie zależności
```bash
npm install
```

Co się dzieje:
- NPM czyta `package.json`
- Pobiera bibliotekę Chalk z internetu
- Instaluje ją w folderze `node_modules`
- Chalk może mieć swoje własne zależności!

### Krok 2: Skompiluj i uruchom
```bash
npm start
```

### Krok 3: Przeanalizuj output
Zobacz jak:
- Tekst ma różne kolory dzięki Chalk
- Error/Success/Warning messages są czytelniejsze
- Dane są pogrupowane i posortowane (własna implementacja)
- Porównanie outputu z/bez Chalk na końcu

## Dlaczego to jest genialne?

### 🚀 **Szybkość rozwoju**
- Zamiast kodować własne kolorowanie - użyj Chalk
- Jedna linia kodu daje piękny, kolorowy output
- Oszczędność czasu na implementacji UI terminala

### 🛡️ **Niezawodność**
- Chalk jest testowany przez miliony projektów
- Błędy są szybko naprawiane
- Stabilne API - nie zmienia się często

### 🌍 **Społeczność**
- NPM ma ponad milion pakietów
- Dla prawie każdego problemu istnieje gotowe rozwiązanie
- Open source - możesz zobaczyć kod źródłowy

## Package.json - sekcje

### Dependencies vs DevDependencies

**Dependencies** - potrzebne do uruchamiania aplikacji:
```json
"chalk": "^4.1.2"
```

**DevDependencies** - potrzebne tylko do rozwoju:
```json
"typescript": "^5.0.0"  // Kompilator TypeScript
```

### Semantic Versioning (SemVer)

`"^4.1.2"` oznacza:
- `4` - major version (breaking changes)
- `1` - minor version (nowe funkcje)
- `2` - patch version (bugfixy)
- `^` - akceptuj nowsze minor/patch, ale nie major

## Eksperymenty do spróbowania

1. **Sprawdź node_modules**
   ```bash
   ls node_modules
   ```

2. **Zobacz ile miejsca zajmują zależności**
   ```bash
   du -sh node_modules
   ```

3. **Usuń node_modules i zainstaluj ponownie**
   ```bash
   rm -rf node_modules
   npm install
   ```

## Co dalej?

Przejdź do `exercise-4-npm-scripts` aby zobaczyć jak automatyzować zadania deweloperskie!