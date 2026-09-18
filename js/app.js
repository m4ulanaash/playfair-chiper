// APP.JS

let currentMode = "encrypt";

document.addEventListener("DOMContentLoaded", function () {
    setupInput();

    const keyInput =
        document.getElementById("key");
    const inputText =
        document.getElementById("inputText");
    const encryptButton =
        document.getElementById("encryptMode");
    const decryptButton =
        document.getElementById("decryptMode");
    const processButton =
        document.getElementById("process");
    const processLabel =
        document.getElementById("processLabel");
    const clearButton =
        document.getElementById("clear");
    const downloadButton =
        document.getElementById("download");
    const copyButton =
        document.getElementById("copy");

    updateMatrixPreview(keyInput.value);
    updateModeUi();

    keyInput.addEventListener("input", function () {
        updateMatrixPreview(keyInput.value);
        resetVisualization();
    });

    inputText.addEventListener("input", function () {
        hideError();
    });

    encryptButton.addEventListener("click", function () {
        currentMode = "encrypt";
        updateModeUi();
        resetVisualization();
    });

    decryptButton.addEventListener("click", function () {
        currentMode = "decrypt";
        updateModeUi();
        resetVisualization();
    });

    processButton.addEventListener("click", function () {
        const key =
            keyInput.value.trim();
        const text =
            inputText.value.trim();

        if (!/[A-Za-z]/.test(key)) {
            showError("Kunci harus diisi dan mengandung huruf.");
            return;
        }

        if (!/[A-Za-z]/.test(text)) {
            showError("Teks harus diisi dan mengandung huruf.");
            return;
        }

        hideError();

        const result =
            processPlayfair(text, key, currentMode);

        displayResult(result, currentMode, text);
    });

    clearButton.addEventListener("click", function () {
        keyInput.value = "MONARCHY";
        inputText.value = "";
        document.getElementById("filename").textContent =
            "Belum ada file dipilih";
        document.getElementById("file").value = "";

        updateMatrixPreview(keyInput.value);
        resetVisualization();
        hideError();
    });

    copyButton.addEventListener("click", function () {
        copyResult();
    });

    downloadButton.addEventListener("click", function () {
        downloadResult(currentMode);
    });

    function updateModeUi() {
        const isEncrypt =
            currentMode === "encrypt";

        encryptButton.classList.toggle("active", isEncrypt);
        decryptButton.classList.toggle("active", !isEncrypt);
        processButton.classList.toggle("decrypt", !isEncrypt);
        processLabel.textContent =
            isEncrypt ? "Encrypt Message" : "Decrypt Message";
    }
});

function showError(message) {
    const error =
        document.getElementById("error");

    error.textContent = message;
    error.style.display = "block";
}

function hideError() {
    const error =
        document.getElementById("error");

    error.style.display = "none";
}
