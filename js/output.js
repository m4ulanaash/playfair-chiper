// OUTPUT DAN VISUALISASI

const RULE_LABEL = {
    "same-row": "Same Row - Shift",
    "same-col": "Same Column - Shift",
    "rectangle": "Rectangle - Swap Corners"
};

const RULE_SHORT = {
    "same-row": "row",
    "same-col": "col",
    "rectangle": "rect"
};

const RULE_COLOR = {
    "same-row": "#7ec8ff",
    "same-col": "#fbb97a",
    "rectangle": "#6ee7b0"
};

let activeAnimationTimer = null;
let activeSteps = [];
let activeSquare = [];
let isAnimatingSteps = false;
let selectedStepIndex = null;
const STEP_ANIMATION_DELAY = 1100;

function displaySquare(square) {
    const squareElement =
        document.getElementById("square");

    squareElement.innerHTML = "";

    for (let row = 0; row < 5; row++) {
        for (let col = 0; col < 5; col++) {
            const cell =
                document.createElement("div");

            cell.className = "cell";
            cell.dataset.row = String(row);
            cell.dataset.col = String(col);
            cell.textContent = square[row][col];
            squareElement.appendChild(cell);
        }
    }
}

function updateMatrixPreview(key) {
    const keyValue = key || "";
    activeSquare = createKeySquare(keyValue);
    displaySquare(activeSquare);

    const matrixKey =
        document.getElementById("matrixKey");

    if (matrixKey) {
        matrixKey.textContent =
            keyValue.trim().toUpperCase() || "DEFAULT";
    }
}

function clearStepHighlight() {
    document
        .querySelectorAll(".cell.highlight, .cell.cell-lit")
        .forEach(function (cell) {
            cell.classList.remove("highlight", "cell-lit");
            cell.style.removeProperty("--rule-color");
        });

    document
        .querySelectorAll(".pair.active")
        .forEach(function (pair) {
            pair.classList.remove("active");
        });

    const activeRule =
        document.getElementById("activeRule");

    if (activeRule) {
        activeRule.style.display = "none";
        activeRule.textContent = "";
    }
}

function highlightStep(index, pulse) {
    const step = activeSteps[index];

    if (!step) {
        clearStepHighlight();
        return;
    }

    clearStepHighlight();
    selectedStepIndex = index;

    const color = RULE_COLOR[step.rule];

    const highlightedCells = [];

    for (const position of step.positions) {
        const selector =
            `.cell[data-row="${position[0]}"][data-col="${position[1]}"]`;
        const cell =
            document.querySelector(selector);

        if (cell) {
            cell.style.setProperty("--rule-color", color);
            cell.classList.add("highlight");
            highlightedCells.push(cell);
        }
    }

    if (pulse) {
        const square =
            document.getElementById("square");

        if (square) {
            void square.offsetWidth;
        }

        requestAnimationFrame(function () {
            highlightedCells.forEach(function (cell) {
                cell.classList.add("cell-lit");
            });
        });
    }

    const pair =
        document.querySelector(`.pair[data-index="${index}"]`);

    if (pair) {
        pair.classList.add("active");
    }

    const activeRule =
        document.getElementById("activeRule");

    if (activeRule) {
        activeRule.style.setProperty("--rule-color", color);
        activeRule.textContent = RULE_LABEL[step.rule];
        activeRule.style.display = "block";
    }
}

function setScanState(isScanning, text) {
    const scanBadge =
        document.getElementById("scanBadge");
    const stepsSummary =
        document.getElementById("stepsSummary");

    if (scanBadge) {
        scanBadge.style.display = isScanning ? "inline-flex" : "none";
    }

    if (stepsSummary) {
        stepsSummary.textContent = text;
    }
}

function stopAnimation() {
    if (activeAnimationTimer) {
        clearTimeout(activeAnimationTimer);
        activeAnimationTimer = null;
    }

    isAnimatingSteps = false;
    setScanState(false, getIdleSummary());
}

function getIdleSummary() {
    if (activeSteps.length === 0) {
        return "Run encryption/decryption to see steps";
    }

    return `${activeSteps.length} pairs - click any to highlight on matrix`;
}

function playStepAnimation() {
    stopAnimation();

    if (activeSteps.length === 0) {
        return;
    }

    isAnimatingSteps = true;
    selectedStepIndex = null;

    let index = 0;

    function tick() {
        document
            .querySelectorAll(".pair")
            .forEach(function (pair) {
                const pairIndex = Number(pair.dataset.index);
                pair.classList.toggle("pending", pairIndex > index);
                pair.classList.toggle("step-appear", pairIndex <= index);
            });

        highlightStep(index, true);
        setScanState(
            true,
            `Processing pair ${index + 1} of ${activeSteps.length}...`
        );

        index++;

        if (index < activeSteps.length) {
            activeAnimationTimer =
                setTimeout(tick, STEP_ANIMATION_DELAY);
        } else {
            activeAnimationTimer =
                setTimeout(function () {
                    isAnimatingSteps = false;
                    document
                        .querySelectorAll(".pair.pending")
                        .forEach(function (pair) {
                            pair.classList.remove("pending");
                        });
                    clearStepHighlight();
                    setScanState(false, getIdleSummary());
                }, STEP_ANIMATION_DELAY);
        }
    }

    tick();
}

function displayPairs(steps) {
    const pairsElement =
        document.getElementById("pairs");

    pairsElement.innerHTML = "";

    if (!steps || steps.length === 0) {
        pairsElement.innerHTML =
            `<div class="empty-state">
                <span class="empty-lock"></span>
                <p>Masukkan pesan lalu klik encrypt/decrypt untuk melihat langkah bigram.</p>
            </div>`;
        return;
    }

    for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const item =
            document.createElement("button");

        item.type = "button";
        item.className = "pair pending";
        item.dataset.index = String(i);
        item.style.setProperty("--rule-color", RULE_COLOR[step.rule]);

        const index =
            document.createElement("span");
        index.className = "pair-index";
        index.textContent = String(step.index).padStart(2, "0");

        const originalText =
            document.createElement("span");
        originalText.className = "pair-text pair-input";
        originalText.textContent = step.pair;

        const arrow =
            document.createElement("span");
        arrow.className = "pair-arrow";
        arrow.textContent = "->";

        const convertedText =
            document.createElement("span");
        convertedText.className = "pair-text pair-output";
        convertedText.textContent = step.result;

        const rule =
            document.createElement("span");
        rule.className = "pair-rule";
        rule.textContent = RULE_SHORT[step.rule];

        item.appendChild(index);
        item.appendChild(originalText);
        item.appendChild(arrow);
        item.appendChild(convertedText);
        item.appendChild(rule);

        item.addEventListener("click", function () {
            if (isAnimatingSteps) {
                return;
            }

            if (selectedStepIndex === i) {
                selectedStepIndex = null;
                clearStepHighlight();
            } else {
                highlightStep(i, false);
            }
        });

        pairsElement.appendChild(item);
    }
}

function updateStats(data, mode, inputText) {
    const stats =
        document.getElementById("stats");

    if (!stats) {
        return;
    }

    document.getElementById("statInput").textContent =
        String(cleanText(inputText).length);
    document.getElementById("statPairs").textContent =
        String(data.steps.length);
    document.getElementById("statOutput").textContent =
        String(data.output.length);
    document.getElementById("statMode").textContent =
        mode === "encrypt" ? "Encrypt" : "Decrypt";

    stats.style.display = "grid";
}

function displayResult(data, mode, inputText) {
    const output =
        document.getElementById("output");

    const result =
        document.getElementById("result");

    activeSteps = data.steps;
    activeSquare = data.square;
    selectedStepIndex = null;

    output.value = data.output;
    displaySquare(data.square);
    displayPairs(data.steps);
    updateStats(data, mode, inputText);
    result.style.display = "grid";
    playStepAnimation();
}

function resetVisualization() {
    stopAnimation();
    activeSteps = [];
    selectedStepIndex = null;
    clearStepHighlight();

    const pairs =
        document.getElementById("pairs");
    const output =
        document.getElementById("output");
    const result =
        document.getElementById("result");
    const stats =
        document.getElementById("stats");

    if (pairs) {
        pairs.innerHTML =
            `<div class="empty-state">
                <span class="empty-lock"></span>
                <p>Masukkan pesan lalu klik encrypt/decrypt untuk melihat langkah bigram.</p>
            </div>`;
    }

    if (output) {
        output.value = "";
    }

    if (result) {
        result.style.display = "none";
    }

    if (stats) {
        stats.style.display = "none";
    }

    setScanState(false, "Run encryption/decryption to see steps");
}

function copyResult() {
    const output =
        document.getElementById("output");
    const copyButton =
        document.getElementById("copy");

    if (!output.value) {
        return;
    }

    function markCopied() {
        const label =
            copyButton.querySelector(".copy-label");

        if (label) {
            label.textContent = "Copied";
        }

        copyButton.classList.add("copied");

        setTimeout(function () {
            if (label) {
                label.textContent = "Copy";
            }

            copyButton.classList.remove("copied");
        }, 1600);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
            .writeText(output.value)
            .then(markCopied)
            .catch(function () {
                output.select();
                document.execCommand("copy");
                markCopied();
            });
    } else {
        output.select();
        document.execCommand("copy");
        markCopied();
    }
}

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
    link.download =
        mode === "encrypt"
            ? "ciphertext.txt"
            : "plaintext.txt";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}
