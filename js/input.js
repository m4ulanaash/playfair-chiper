// INPUT

function setupInput() {
    const fileInput =
        document.getElementById("file");
    const inputText =
        document.getElementById("inputText");
    const filename =
        document.getElementById("filename");
    const dropZone =
        document.getElementById("dropZone");

    function readFile(file) {
        if (!file) {
            return;
        }

        if (!file.name.toLowerCase().endsWith(".txt")) {
            showError("File harus berformat .txt");
            return;
        }

        filename.textContent = file.name;

        const reader = new FileReader();

        reader.onload = function (event) {
            inputText.value = event.target.result;
            hideError();
        };

        reader.onerror = function () {
            showError("File gagal dibaca.");
        };

        reader.readAsText(file);
    }

    fileInput.addEventListener("change", function () {
        readFile(fileInput.files[0]);
    });

    dropZone.addEventListener("dragover", function (event) {
        event.preventDefault();
        dropZone.classList.add("dragging");
    });

    dropZone.addEventListener("dragleave", function () {
        dropZone.classList.remove("dragging");
    });

    dropZone.addEventListener("drop", function (event) {
        event.preventDefault();
        dropZone.classList.remove("dragging");
        readFile(event.dataTransfer.files[0]);
    });

    dropZone.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            fileInput.click();
        }
    });
}
