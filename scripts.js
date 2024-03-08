let currentOperand = '';
let previousOperand = '';
let operation = null;

const calculatorDisplay = document.querySelector('.calculator-display');

function clearDisplay() {
    currentOperand = '';
    previousOperand = '';
    operation = null;
    updateDisplay();
}

function clearEntry() {
    currentOperand = currentOperand.toString().slice(0, -1);
    updateDisplay();
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand += number;
    updateDisplay();
}

function selectOperation(selectedOperation) {
    if (selectedOperation === '%') {
        currentOperand = (parseFloat(currentOperand) / 100).toString();
        updateDisplay();
        return;
    }
    if (selectedOperation === 'sqrt') {
        calculateSqrt();
        return;
    } else if (selectedOperation === 'plusMinus') {
        togglePlusMinus();
        return;
    }
    if (currentOperand === '' && selectedOperation !== 'C' && selectedOperation !== 'CE') return;
    if (selectedOperation === 'C') {
        clearDisplay();
        return;
    }
    if (selectedOperation === 'CE') {
        clearEntry();
        return;
    }
    if (previousOperand !== '') {
        calculate();
    }
    operation = selectedOperation;
    previousOperand = currentOperand;
    currentOperand = '';
    updateDisplay();
}
function calculateSqrt() {
    if (currentOperand === '') return;
    const result = Math.sqrt(parseFloat(currentOperand));
    currentOperand = result.toString();
    updateDisplay();
    // Reset the operands and operation
    clearAfterOperation();
}

function togglePlusMinus() {
    if (currentOperand === '') return;
    const value = parseFloat(currentOperand);
    currentOperand = (value * -1).toString(); // Toggle the sign
    updateDisplay();
}

function calculate() {
    let calculation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (operation) {
        case 'add':
            calculation = prev + current;
            break;
        case 'subtract':
            calculation = prev - current;
            break;
        case 'multiply':
            calculation = prev * current;
            break;
        case 'divide':
            calculation = current !== 0 ? prev / current : 'Undefined'; // Show 'Undefined' for division by 0
            break;
        default:
            return; // If the operation is unknown, exit the function
    }
    currentOperand = calculation.toString(); // Convert the number back to a string
    operation = null;
    previousOperand = '';
    updateDisplay();
}

function updateDisplay() {
    calculatorDisplay.innerText = currentOperand !== '' ? currentOperand : '0';
}

// Initialize display
updateDisplay();

