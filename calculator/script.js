const display = document.getElementById('display');
let currentInput = "";

function takeInput(value) {
    currentInput += value;
    updateDisplay();
}

function updateDisplay() {
    display.value = currentInput;
}

function clearField() {
    currentInput = "";
    updateDisplay();
}

function removeLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function preprocess(expr) {
    return expr.replaceAll('π', 'Math.PI')
        .replaceAll('e', 'Math.E')
        .replaceAll('×', '*')
        .replaceAll('÷', '/')
        .replaceAll('^', '**');
}

function calculateSquare() {
    if (currentInput === "") return;
    try {
        let val = eval(preprocess(currentInput));
        currentInput = (val * val).toString();
        updateDisplay();
    } catch {
        currentInput = "Error";
        updateDisplay();
    }
}

function calculateRoot() {
    if (currentInput === "") return;
    try {
        let val = eval(preprocess(currentInput));
        currentInput = Math.sqrt(val).toString();
        updateDisplay();
    } catch {
        currentInput = "Error";
        updateDisplay();
    }
}

function isBracketsValid(expression) {
    let balance = 0;
    for (let char of expression) {
        if (char === '(') balance++;
        else if (char === ')') {
            balance--;
            if (balance < 0) return false;
        }
    }
    return balance === 0;
}

function showOutput() {
    if (currentInput === "") return;

    let expression = preprocess(currentInput);

    if (!isBracketsValid(expression)) {
        display.value = "Invalid Brackets";
        return;
    }

    try {
        const result = eval(expression);
        currentInput = result.toString();
        updateDisplay();
    } catch {
        display.value = "Invalid Input";
        currentInput = "";
    }
}
