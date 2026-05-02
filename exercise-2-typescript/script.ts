// Ćwiczenie 2: TypeScript - JavaScript z typami

console.log("Witamy w TypeScript! 🎯");
console.log("======================");

// 1. Zmienne z określonymi typami
const imie: string = "Paweł";
const wiek: number = 30;
const czyMaPsa: boolean = true;
const zainteresowania: string[] = ["technologia", "sport", "książki"];

console.log("📋 Informacje z typami:");
console.log("Imię (string):", imie);
console.log("Wiek (number):", wiek);
console.log("Ma psa (boolean):", czyMaPsa);
console.log("Zainteresowania (string[]):", zainteresowania);

// 2. Funkcja z określonymi typami parametrów i zwracanej wartości
function obliczWiekWLatach(aktualnyWiek: number, latWPrzyszlosci: number): number {
    return aktualnyWiek + latWPrzyszlosci;
}

// 3. Funkcja z typem string jako parametr i string jako zwraca
function utworzPowitanie(imie: string, wiek: number): string {
    return `Cześć ${imie}, masz ${wiek} lat i to świetnie!`;
}

// 3. Wywołania funkcji
const powitanie = utworzPowitanie(wiek, imie);
console.log(`\n🤝 ${powitanie}`);

const wiekZa10Lat = obliczWiekWLatach(wiek, 10);
console.log(`\n⏰ Za 10 lat będę mieć ${wiekZa10Lat} lat`);

console.log("\n✨ TypeScript pomaga unikać błędów!");
console.log("Następnie: NPM Dependencies (ćwiczenie 3)");