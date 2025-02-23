document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("calcHistory")) {
        document.getElementById("display").value = localStorage.getItem("calcHistory");
    }
    loadHistory();
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
        saveToHistory(display.value + " = " + result);
        display.value = result;
        localStorage.setItem("calcHistory", result);
    } catch (e) {
        showError("Invalid Expression!");
    }
}

function saveToHistory(entry) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.push(entry);
    localStorage.setItem("history", JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    let historyList = document.getElementById("history-list");
    historyList.innerHTML = "";
    let history = JSON.parse(localStorage.getItem("history")) || [];

    history.forEach((entry, index) => {
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerHTML = `
            <span>${entry}</span>
            <button class="btn btn-sm btn-danger" onclick="deleteHistoryEntry(${index})">X</button>
        `;
        historyList.appendChild(listItem);
    });
}

function deleteHistoryEntry(index) {
    let history = JSON.parse(localStorage.getItem("history")) || [];
    history.splice(index, 1);
    localStorage.setItem("history", JSON.stringify(history));
    loadHistory();
}

function clearHistory() {
    localStorage.removeItem("history");
    loadHistory();
}
