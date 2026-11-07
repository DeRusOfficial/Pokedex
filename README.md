# Pokédex

Ein kleines Webprojekt, das Pokémon in Form eines Pokédex darstellt.

## Verwendete Technologien

- **HTML**: Struktur der Seite
- **CSS**: Gestaltung und Layout
- **JavaScript**: Logik und Interaktivität

## Besonderheit: Namen mit Regex formatieren

Pokémon-Namen liegen oft komplett in Kleinbuchstaben vor (z. B. `nidoran-m` oder `ho oh`). Damit sie schön dargestellt werden, habe ich einen **regulären Ausdruck (Regex)** verwendet. Er schreibt den ersten Buchstaben jedes Wortes groß, und zwar:

- am Anfang des Namens
- nach einem Leerzeichen
- nach einem Bindestrich

### Code

```javascript
function capitalizeFirstLetters(currentPkmName) {
    return currentPkmName.replace(/\b\w/g, char => char.toUpperCase());
}
```

### Beispiele

```javascript
capitalizeFirstLetters("pikachu"); // Pikachu
capitalizeFirstLetters("nidoran-m"); // Nidoran-M
capitalizeFirstLetters("mr mime");   // Mr Mime
```

### So funktioniert der Regex

| Teil | Bedeutung |
| ---- | --------- |
| `\b` | Wortgrenze: eine Position zwischen einem Wortzeichen und einem Nicht-Wortzeichen (z. B. Leerzeichen oder Bindestrich) bzw. am Anfang oder Ende des Strings |
| `\w` | Ein Wortzeichen (Buchstabe, Ziffer oder Unterstrich), hier also der Buchstabe direkt hinter der Wortgrenze |
| `g`  | Global-Flag: alle Treffer im String werden ersetzt, nicht nur der erste |

Zusammen bedeutet `/\b\w/g`: *Finde jedes Zeichen, das direkt am Anfang eines Wortes steht.*

Die Methode `replace()` ruft für jeden Treffer die Funktion `char => char.toUpperCase()` auf. Diese bekommt den gefundenen Buchstaben (`char`) und gibt ihn als Großbuchstaben zurück. Alle anderen Zeichen bleiben unverändert.

Ablauf am Beispiel `nidoran-m`:

1. `\b\w` trifft das **n** am Anfang → wird zu `N`
2. Der Bindestrich ist ein Nicht-Wortzeichen, also entsteht dahinter eine neue Wortgrenze
3. `\b\w` trifft das **m** nach dem Bindestrich → wird zu `M`
4. Ergebnis: `Nidoran-M`

## Projekt starten

1. Repository herunterladen oder klonen
2. Die Datei `index.html` im Browser öffnen

## Autor

Erstellt von *Dein Name* als Übungsprojekt.
