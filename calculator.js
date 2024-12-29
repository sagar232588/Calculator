document.addEventListener('DOMContentLoaded', function() {
    const calculatorScreen = document.getElementById('calculator-screen');
    const keys = document.querySelector('.calculator-keys');
    let currentInput = '';
    let operator = '';
    let previousInput = '';

    keys.addEventListener('click', function(event) {
        const { target } = event;
        const { value } = target;

        if (!target.matches('button')) {
            return;
        }

        handleInput(value);
    });

    document.addEventListener('keydown', function(event) {
        const key = event.key;
        if ((key >= '0' && key <= '9') || key === '.') {
            handleInput(key);
        } else if (key === '+' || key === '-' || key === '*' || key === '/') {
            handleInput(key);
        } else if (key === 'Enter' || key === '=') {
            handleInput('=');
        } else if (key === 'Escape') {
            handleInput('all-clear');
        }
    });

    function handleInput(value) {
        switch (value) {
            case '+':
            case '-':
            case '*':
            case '/':
                handleOperator(value);
                break;
            case '=':
                calculate();
                break;
            case 'all-clear':
                clear();
                break;
            default:
                handleNumber(value);
                break;
        }

        updateScreen();
    }

    function handleNumber(number) {
        if (operator && !previousInput) {
            previousInput = currentInput;
            currentInput = '';
        }
        currentInput += number;
    }

    function handleOperator(nextOperator) {
        if (!currentInput) {
            return;
        }

        if (previousInput) {
            calculate();
        }

        operator = nextOperator;
    }

    function calculate() {
        let result;

        switch (operator) {
            case '+':
                result = parseFloat(previousInput) + parseFloat(currentInput);
                break;
            case '-':
                result = parseFloat(previousInput) - parseFloat(currentInput);
                break;
            case '*':
                result = parseFloat(previousInput) * parseFloat(currentInput);
                break;
            case '/':
                result = parseFloat(previousInput) / parseFloat(currentInput);
                break;
            default:
                return;
        }

        if (operator === '/' && currentInput === '0') {
            result = 'Error';
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
    }

    function clear() {
        currentInput = '';
        operator = '';
        previousInput = '';
    }

    function updateScreen() {
        calculatorScreen.value = `${previousInput} ${operator} ${currentInput}`;
    }
});