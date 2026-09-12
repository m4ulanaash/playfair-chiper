// APP.JS

let currentMode = "encrypt";

// SAAT HALAMAN SELESAI DIMUAT
document.addEventListener("DOMContentLoaded", function () {

    setupInput();
    const encryptButton =
        document.getElementById("encryptMode");

    const decryptButton =
        document.getElementById("decryptMode");

    const processButton =
        document.getElementById("process");

    const clearButton =
        document.getElementById("clear");

    const downloadButton =
        document.getElementById("download");

    // MODE ENKRIPSI
    encryptButton.addEventListener(
        "click",
        function () {
            currentMode = "encrypt";

            encryptButton.classList.add("active");

            decryptButton.classList.remove("active");
        }
    );

    // MODE DEKRIPSI
    decryptButton.addEventListener(
        "click",
        function () {
            currentMode = "decrypt";

            decryptButton.classList.add("active");

            encryptButton.classList.remove("active");
        }
    );

    // TOMBOL PROSES
    processButton.addEventListener(
        "click",
        function () {
            const key =
                document
                .getElementById("key")
                .value
                .trim();

            const text =
                document
                .getElementById("inputText")
                .value
                .trim();

            // Validasi key
            if (!/[A-Za-z]/.test(key)) {
                showError(
                    "Kunci harus diisi dan mengandung huruf."
                );
                return;
            }
            // Validasi teks

            if (!/[A-Za-z]/.test(text)) {
                showError(
                    "Teks harus diisi dan mengandung huruf."
                );
                return;
            }
            hideError();

            // Jalankan algoritma Playfair
            const result =
                processPlayfair(
                    text,
                    key,
                    currentMode
                );

            // Tampilkan hasil
            displayResult(result);
        }
    );

    // TOMBOL BERSIHKAN
    clearButton.addEventListener(
        "click",
        function () {

            document.getElementById("key").value = "";

            document.getElementById("inputText").value = "";

            document.getElementById("output").value = "";

            document.getElementById("filename").textContent = "";

            document.getElementById("file").value = "";

            document.getElementById("square").innerHTML = "";

            document.getElementById("pairs").innerHTML = "";

            document.getElementById("result")
                .style.display = "none";
            hideError();
        }
    );

    // DOWNLOAD
    downloadButton.addEventListener(
        "click",
        function () {
            downloadResult(currentMode);
        }
    );
});



// MENAMPILKAN ERROR
function showError(message) {
    const error =
        document.getElementById("error");
    error.textContent = message;
    error.style.display = "block";
}

// MENYEMBUNYIKAN ERROR
function hideError() {
    const error =
        document.getElementById("error");
    error.style.display = "none";
}