// Alfabet Playfair. J digabung dengan I sehingga total menjadi 25 huruf.
const ALPHABET = "ABCDEFGHIKLMNOPQRSTUVWXYZ";

function createKeySquare(key) {
    const cleanKey = key
        .toUpperCase()
        .replace(/J/g, "I")
        .replace(/[^A-Z]/g, "");

    let letters = "";
    const used = new Set();

    for (const letter of cleanKey) {
        if (!used.has(letter)) {
            used.add(letter);
            letters += letter;
        }
    }

    for (const letter of ALPHABET) {
        if (!used.has(letter)) {
            used.add(letter);
            letters += letter;
        }
    }

    const square = [];

    for (let row = 0; row < 5; row++) {
        square.push(
            letters
                .slice(row * 5, row * 5 + 5)
                .split("")
        );
    }

    return square;
}

function findPosition(square, letter) {
    const target = letter === "J" ? "I" : letter;

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (square[row][col] === target) {
                return {
                    row: row,
                    col: col
                };
            }
        }
    }

    return null;
}

function cleanText(text) {
    return text
        .toUpperCase()
        .replace(/J/g, "I")
        .replace(/[^A-Z]/g, "");
}

function makePairs(text) {
    const cleaned = cleanText(text);
    const pairs = [];
    let i = 0;

    while (i < cleaned.length) {
        const first = cleaned[i];
        const second = cleaned[i + 1];

        if (!second) {
            pairs.push([first, "X"]);
            i++;
        } else if (first === second) {
            pairs.push([first, "X"]);
            i++;
        } else {
            pairs.push([first, second]);
            i += 2;
        }
    }

    return pairs;
}

function makeDecryptPairs(text) {
    const cleaned = cleanText(text);
    const pairs = [];

    for (let i = 0; i < cleaned.length; i += 2) {
        pairs.push([
            cleaned[i],
            cleaned[i + 1] || "X"
        ]);
    }

    return pairs;
}

function getPairRule(square, first, second) {
    const a = findPosition(square, first);
    const b = findPosition(square, second);

    if (a.row === b.row) {
        return "same-row";
    }

    if (a.col === b.col) {
        return "same-col";
    }

    return "rectangle";
}

function encryptPair(square, first, second) {
    const a = findPosition(square, first);
    const b = findPosition(square, second);

    if (a.row === b.row) {
        return [
            square[a.row][(a.col + 1) % 5],
            square[b.row][(b.col + 1) % 5]
        ];
    }

    if (a.col === b.col) {
        return [
            square[(a.row + 1) % 5][a.col],
            square[(b.row + 1) % 5][b.col]
        ];
    }

    return [
        square[a.row][b.col],
        square[b.row][a.col]
    ];
}

function decryptPair(square, first, second) {
    const a = findPosition(square, first);
    const b = findPosition(square, second);

    if (a.row === b.row) {
        return [
            square[a.row][(a.col + 4) % 5],
            square[b.row][(b.col + 4) % 5]
        ];
    }

    if (a.col === b.col) {
        return [
            square[(a.row + 4) % 5][a.col],
            square[(b.row + 4) % 5][b.col]
        ];
    }

    return [
        square[a.row][b.col],
        square[b.row][a.col]
    ];
}

function processPlayfair(text, key, mode) {
    const square = createKeySquare(key);
    const pairs =
        mode === "encrypt"
            ? makePairs(text)
            : makeDecryptPairs(text);

    const convertedPairs = [];
    const steps = [];
    let output = "";

    for (const pair of pairs) {
        const converted =
            mode === "encrypt"
                ? encryptPair(square, pair[0], pair[1])
                : decryptPair(square, pair[0], pair[1]);

        const firstPosition = findPosition(square, pair[0]);
        const secondPosition = findPosition(square, pair[1]);
        const rule = getPairRule(square, pair[0], pair[1]);

        convertedPairs.push(converted);
        output += converted.join("");

        steps.push({
            index: steps.length + 1,
            pair: pair.join(""),
            result: converted.join(""),
            rule: rule,
            positions: [
                [firstPosition.row, firstPosition.col],
                [secondPosition.row, secondPosition.col]
            ]
        });
    }

    return {
        square: square,
        pairs: pairs,
        convertedPairs: convertedPairs,
        steps: steps,
        output: output
    };
}
