document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("calcHistory")) {
        document.getElementById("display").value = localStorage.getItem("calcHistory");
    }
});

function showError(message) {
    let errorDiv = document.getElementById("error-message");
    errorDiv.textContent = message;
    errorDiv.classList.remove("d-none");

    setTimeout(() => {
        errorDiv.classList.add("d-none");
    }, 2000);
}

function appendToDisplay(value) {
    let display = document.getElementById("display");

    if (display.value.length >= 20) {
        showError("Input limit reached!");
        return;
    }

    display.value += value;
    localStorage.setItem("calcHistory", display.value);
}

function clearDisplay() {
    document.getElementById("display").value = "";
    localStorage.removeItem("calcHistory");
}

function deleteLast() {
    let display = document.getElementById("display");
    display.value = display.value.slice(0, -1);
    localStorage.setItem("calcHistory", display.value);
}

function calculateResult() {
    let display = document.getElementById("display");
    
    if (display.value.trim() === "") {
        showError("Enter a valid expression!");
        return;
    }

    try {
        let result = eval(display.value);
        if (!isFinite(result)) {
            throw new Error("Math error!");
        }
        display.value = result;
        localStorage.setItem("calcHistory", result);
        saveToHistory(display.value);
    } catch (e) {
        showError("Invalid Expression!");
    }
}

function saveToHistory(result) {
    fetch("process.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: "result=" + encodeURIComponent(result)
    });
}
