// Ćwiczenie 3: NPM Dependencies - TypeScript z zewnętrzną biblioteką Chalk

// Importowanie zewnętrznej biblioteki
import chalk from 'chalk';

console.log(chalk.blue.bold("Witamy w TypeScript z Chalk! 🎨"));
console.log(chalk.gray("==================================="));

// 1. Zmienne z określonymi typami (jak w ćwiczeniu 2)
const imie: string = "Katarzyna";
const wiek: number = 27;
const czyMaKota: boolean = true;
const zainteresowania: string[] = ["programowanie", "grafika", "muzyka"];

console.log(chalk.green("\n📋 Informacje z typami i kolorami:"));
console.log(chalk.yellow("Imię (string):"), chalk.white(imie));
console.log(chalk.yellow("Wiek (number):"), chalk.white(wiek.toString()));
console.log(chalk.yellow("Ma kota (boolean):"), chalk.white(czyMaKota.toString()));
console.log(chalk.yellow("Zainteresowania (string[]):"), chalk.white(zainteresowania.join(", ")));

// 2. Funkcja z określonymi typami parametrów i zwracanej wartości (jak w ćwiczeniu 2)
function obliczWiekWLatach(aktualnyWiek: number, latWPrzyszlosci: number): number {
    return aktualnyWiek + latWPrzyszlosci;
}

// 3. Funkcja z typem string jako parametr i string jako zwraca (jak w ćwiczeniu 2)
function utworzKolorowePowitanie(imie: string, wiek: number): string {
    return `Cześć ${imie}, masz ${wiek} lat i to fantastyczne!`;
}

// 4. Wywołania funkcji z kolorowym wyświetlaniem
const powitanie = utworzKolorowePowitanie(imie, wiek);
console.log(chalk.cyan(`\n🤝 ${powitanie}`));

const wiekZa10Lat = obliczWiekWLatach(wiek, 10);
console.log(chalk.magenta(`\n⏰ Za 10 lat będę mieć ${wiekZa10Lat} lat`));

// 5. Demonstracja podstawowych kolorów Chalk
console.log(chalk.blue.bold("\n🎨 Podstawowe kolory Chalk:"));
console.log(chalk.red("🔴 Czerwony tekst"));
console.log(chalk.green("🟢 Zielony tekst"));
console.log(chalk.blue("🔵 Niebieski tekst"));
console.log(chalk.yellow("🟡 Żółty tekst"));

console.log(chalk.green("\n✨ TypeScript + Chalk = piękny kod z typami!"));
console.log(chalk.gray("Następnie: NPM Scripts (ćwiczenie 4)"));