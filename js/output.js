// OUTPUT

// MENAMPILKAN KOTAK 5x5
function displaySquare(square) {

    const squareElement =
        document.getElementById("square");
        
    squareElement.innerHTML = "";

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cell =
                document.createElement("div");
            cell.className = "cell";
            cell.textContent =
                square[row][col];
            squareElement.appendChild(cell);
        }
    }
}

// MENAMPILKAN PASANGAN
function displayPairs(pairs, convertedPairs) {
    const pairsElement =
        document.getElementById("pairs");

    pairsElement.innerHTML = "";

    for (let i = 0; i < pairs.length; i++) {
        const item =
            document.createElement("div");

        item.className = "pair";

        const original =
            pairs[i].join("");
        const converted =
            convertedPairs[i].join("");
        item.textContent =
            original + " → " + converted;
        pairsElement.appendChild(item);
    }
}

// MENAMPILKAN HASIL
function displayResult(data) {
    const output =
        document.getElementById("output");

    const result =
        document.getElementById("result");

    output.value = data.output;
    displaySquare(data.square);
    displayPairs(
        data.pairs,
        data.convertedPairs
    );
    result.style.display = "block";
}



// DOWNLOAD HASIL
function downloadResult(mode) {
    const output =
        document.getElementById("output");

    const blob = new Blob(
        [output.value],
        {
            type: "text/plain;charset=utf-8"
        }
    );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;
    
    if (mode === "encrypt") {
        link.download = "ciphertext.txt";
    } else {
        link.download = "plaintext.txt";
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}