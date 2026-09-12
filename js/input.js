// INPUT
function setupInput() {

    const fileInput =
        document.getElementById("file");
    const inputText =
        document.getElementById("inputText");
    const filename =
        document.getElementById("filename");

    // EVENT SAAT FILE DIPILIH
    fileInput.addEventListener("change", function () {
        const file = fileInput.files[0];

        if (!file) {
            return;
        }
        filename.textContent = file.name;
        // Membaca isi file
        const reader = new FileReader();
        reader.onload = function (event) {
            inputText.value =
                event.target.result;
        };
        reader.onerror = function () {
            alert("File gagal dibaca.");
        };
        reader.readAsText(file);
    });
}