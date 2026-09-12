// Alfabet Playfair.
// J digabung dengan I sehingga total menjadi 25 huruf.
const ALPHABET = "ABCDEFGHIKLMNOPQRSTUVWXYZ";
 
// 1. MEMBUAT KOTAK KUNCI 5x5 
function createKeySquare(key) {
    // Bersihkan key:
    // - ubah menjadi huruf kapital
    // - J diubah menjadi I
    // - selain A-Z dibuang
    const cleanKey = key
        .toUpperCase()
        .replace(/J/g, "I")
        .replace(/[^A-Z]/g, "");

    let letters = "";
    const used = new Set();

    // Masukkan huruf dari key terlebih dahulu
    for (const letter of cleanKey) {
        if (!used.has(letter)) {
            used.add(letter);
            letters += letter;
        }
    }
    // Lengkapi dengan alfabet
    for (const letter of ALPHABET) {
        if (!used.has(letter)) {
            used.add(letter);
            letters += letter;
        }
    }
    // Ubah menjadi array 5x5
    const square = [];

    for (let row = 0; row < 5; row++) {
        const start = row * 5;
        const rowLetters = letters
            .slice(start, start + 5)
            .split("");
        square.push(rowLetters);
    }
    return square;
}
 
// 2. MENCARI POSISI HURUF
 
function findPosition(square, letter) {
    // J dianggap sebagai I
    if (letter === "J") {
        letter = "I";
    }
    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            if (square[row][col] === letter) {
                return {
                    row: row,
                    col: col
                };
            }
        }
    }
    return null;
}
 
// 3. MEMBERSIHKAN TEKS
 
function cleanText(text) {

    return text
        .toUpperCase()
        .replace(/J/g, "I")
        .replace(/[^A-Z]/g, "");
}

 
// 4. MEMBUAT DIGRAF UNTUK ENKRIPSI
 
function makePairs(text) {
    const cleaned = cleanText(text);
    const pairs = [];
    let i = 0;

    while (i < cleaned.length) {
        const first = cleaned[i];
        const second = cleaned[i + 1];
        // Kalau hanya tersisa satu huruf
        if (!second) {
            pairs.push([first, "X"]);
            i++;
        }
        // Kalau kedua huruf sama
        else if (first === second) {
            pairs.push([first, "X"]);
            i++;
        }
        // Kalau berbeda
        else {
            pairs.push([first, second]);
            i += 2;
        }
    }
    return pairs;
}
 
// 5. MEMBUAT DIGRAF UNTUK DEKRIPSI
 
function makeDecryptPairs(text) {
    const cleaned = cleanText(text);
    const pairs = [];
    for (let i = 0; i < cleaned.length; i += 2) {
        const first = cleaned[i];
        const second = cleaned[i + 1];
        pairs.push([
            first,
            second || "X"
        ]);
    }
    return pairs;
}
 
// 6. ENKRIPSI SATU PASANGAN
 
function encryptPair(square, first, second) {
    const a = findPosition(square, first);
    const b = findPosition(square, second);
    // --------------------------------------
    // KASUS 1: BARIS SAMA
    // Geser masing-masing ke kanan
    // --------------------------------------
    if (a.row === b.row) {
        const newFirst =
            square[a.row][(a.col + 1) % 5];
        const newSecond =
            square[b.row][(b.col + 1) % 5];
        return [newFirst, newSecond];
    }
    // --------------------------------------
    // KASUS 2: KOLOM SAMA
    // Geser masing-masing ke bawah
    // --------------------------------------
    if (a.col === b.col) {
        const newFirst =
            square[(a.row + 1) % 5][a.col];
        const newSecond =
            square[(b.row + 1) % 5][b.col];
        return [newFirst, newSecond];
    }
    // --------------------------------------
    // KASUS 3: RECTANGLE
    // Tukar kolom
    // --------------------------------------
    const newFirst =
        square[a.row][b.col];
    const newSecond =
        square[b.row][a.col];
    return [newFirst, newSecond];
}
 
// 7. DEKRIPSI SATU PASANGAN
 
function decryptPair(square, first, second) {
    const a = findPosition(square, first);
    const b = findPosition(square, second);
    // --------------------------------------
    // BARIS SAMA
    // Geser ke kiri
    // --------------------------------------
    if (a.row === b.row) {
        const newFirst =
            square[a.row][(a.col + 4) % 5];
        const newSecond =
            square[b.row][(b.col + 4) % 5];
        return [newFirst, newSecond];
    }
    // --------------------------------------
    // KOLOM SAMA
    // Geser ke atas
    // --------------------------------------
    if (a.col === b.col) {
        const newFirst =
            square[(a.row + 4) % 5][a.col];
        const newSecond =
            square[(b.row + 4) % 5][b.col];
        return [newFirst, newSecond];
    }
    // --------------------------------------
    // RECTANGLE
    // Tukar kolom
    // --------------------------------------
    const newFirst =
        square[a.row][b.col];
    const newSecond =
        square[b.row][a.col];
    return [newFirst, newSecond];
}


 
// 8. PROSES UTAMA PLAYFAIR
 
function processPlayfair(text, key, mode) {

    const square = createKeySquare(key);
    let pairs;

    if (mode === "encrypt") {
        pairs = makePairs(text);
    } else {
        pairs = makeDecryptPairs(text);
    }
    const convertedPairs = [];

    for (const pair of pairs) {
        let result;
        if (mode === "encrypt") {
            result = encryptPair(
                square,
                pair[0],
                pair[1]
            );
        } else {
            result = decryptPair(
                square,
                pair[0],
                pair[1]
            );
        }
        convertedPairs.push(result);
    }
    // Gabungkan semua pasangan menjadi satu string
    let output = "";

    for (const pair of convertedPairs) {
        output += pair.join("");
    }
    return {
        square: square,
        pairs: pairs,
        convertedPairs: convertedPairs,
        output: output
    };
}