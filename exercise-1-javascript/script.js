// Ćwiczenie 1: Podstawowy JavaScript z Node.js

console.log("Witamy w świecie JavaScript! 🎉");
console.log("================================");

// 1. Zmienne - miejsca gdzie przechowujemy dane
const imie = "Anna";
const wiek = 25;
const czyLubiProgramowanie = true;

console.log("📋 Informacje o użytkowniku:");
console.log("Imię:", imie);
console.log("Wiek:", wiek);
console.log("Lubi programowanie:", czyLubiProgramowanie);

// 2. Funkcja - blok kodu który można używać wielokrotnie
function przywitajUzytkownika(x, y) {
    const wiadomosc = `Cześć ${x}! Masz ${y} lat.`;
    return wiadomosc;
}

// 3. Wywołanie funkcji
const powitanie = przywitajUzytkownika( wiek, imie);
console.log("\n🤝 Powitanie:");
console.log(powitanie);

console.log("\n✨ Koniec pierwszego ćwiczenia!");
console.log("Następnie: TypeScript (ćwiczenie 2)");