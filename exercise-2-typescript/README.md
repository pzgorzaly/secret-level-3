# Ćwiczenie 2: TypeScript - JavaScript z typami

## Cel ćwiczenia
Zrozumieć dlaczego programiści używają TypeScript i jak typy pomagają w pisaniu lepszego kodu.

## Czego się nauczysz?
- Czym są typy danych i dlaczego są ważne
- Jak TypeScript pomaga unikać błędów
- Proces kompilacji kodu
- Czym jest package.json

## Co znajduje się w tym folderze?
- `script.ts` - kod TypeScript z typami
- `package.json` - konfiguracja projektu
- `README.md` - instrukcje

## Jak uruchomić ćwiczenie?

### Krok 1: Zainstaluj TypeScript
```bash
npm install
```

Ten command:
- Czyta plik `package.json`
- Pobiera wszystkie wymienione zależności
- Instaluje TypeScript lokalnie w tym projekcie

### Krok 2: Skompiluj TypeScript do JavaScript
```bash
npm run build
```

Co się dzieje:
- TypeScript sprawdza poprawność typów
- Konwertuje kod .ts do .js
- Tworzy plik `script.js`

### Krok 3: Uruchom skompilowany JavaScript
```bash
npm run run
```

### Alternatywnie: Zrób wszystko jedną komendą
```bash
npm start
```

## Co nowego w TypeScript?

### 1. Typy danych
```typescript
const imie: string = "Jan";     // Tekst
const wiek: number = 25;        // Liczba
const aktywny: boolean = true;  // Prawda/fałsz
```

### 2. Interfejsy
```typescript
interface Osoba {
    imie: string;
    wiek: number;
    email?: string;  // Opcjonalne pole
}
```

### 3. Kontrola typów
TypeScript sprawdza czy:
- Przekazujesz właściwe typy do funkcji
- Nie robisz błędów w nazwach właściwości
- Zwracasz właściwy typ z funkcji

## Dlaczego programiści to lubią?

1. **Mniej błędów** - TypeScript wykrywa problemy przed uruchomieniem
2. **Lepsze IDE** - edytor wie co jest dostępne i podpowiada
3. **Czytelniejszy kod** - typy działają jak dokumentacja
4. **Refactoring** - łatwiej zmieniać kod bez wprowadzania błędów

## Package.json - co to jest?

To plik konfiguracyjny Node.js który zawiera:
- Informacje o projekcie (nazwa, wersja)
- Zależności (jakie biblioteki są potrzebne)
- Skrypty (komendy które możesz uruchomić)

## Eksperymenty do spróbowania

1. Zmień typ zmiennej i zobacz co się stanie podczas kompilacji
2. Usuń jakąś właściwość z obiektu i sprawdź błąd TypeScript
3. Dodaj nowe pole do interfejsu `Osoba`

## Co dalej?

Przejdź do `exercise-3-npm-dependency` aby zobaczyć jak używać zewnętrznych bibliotek!