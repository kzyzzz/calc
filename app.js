function createCalc(){
    let newCalc = document.createElement('div');
    newCalc.classList.add('calc');

    let history = document.createElement('div');
    history.classList.add('history');

    let display = document.createElement('div');
    display.classList.add('display');

    newCalc.appendChild(history);
    newCalc.appendChild(display);
    newCalc.appendChild(createKeypad());

    document.querySelector('#calc').appendChild(newCalc);
}

function createKeypad() {
    let keys = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '', '+', '='];

    let keypad = document.createElement('div');
    keypad.classList.add('keypad');

    keys.forEach((key) => {
        let keyButton = document.createElement('div');

        if (key != '') {
            keyButton.classList.add('keypad-button')
            keyButton.innerText = key;
            keyButton.id = key;
            keyButton.addEventListener('click', (e) => {
                buttonPress(e.target.innerText);
            })
        }
        
        keypad.appendChild(keyButton);
    })

    return keypad;
}

function buttonPress(key) {
    let display = document.querySelector('.display');
    console.log(calculator);
    switch (key) {

        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
            if (display.innerText == '0' || isNaN(display.innerText)) display.innerText = '';
        case '.':
            display.innerText = display.innerText + key;
            console.log(key)
            break;

        case '/':
        case '*':
        case '-':
        case '+':
            
            if (!calculator.firstNumber) {
                calculator.firstNumber = display.innerText;
            } else if (!calculator.secondNumber) {
                calculator.secondNumber = display.innerText;
                calculate();
                calculator.firstNumber = display.innerText;
            }
            display.innerText = '';
            calculator.action = key;
            break;
        case '=':
            calculator.secondNumber = display.innerText;
            calculate();
            break;

    }

}

function calculate() {
    if (calculator.firstNumber && calculator.secondNumber && calculator.action) {

        let result = 'ERROR';
        console.log(calculator);

        switch (calculator.action) {
            case '+':
                result = add(calculator.firstNumber, calculator.secondNumber)
        }

        document.querySelector('.display').innerText = result;

        delete calculator.firstNumber;
        delete calculator.secondNumber;
        delete calculator.action;
    }
}

function display(message) {
    document.querySelector('.display').innerText = message;
}

function add(a, b) {
    return a*1 + b*1;
}

function substract(a, b) {
    return a*1 - b*1;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(a, b, operator) {

    let result = 'NULL';

    switch(operator) {
        case '+':
            result = add(a, b);
            break;

        case '-':
            result = substract(a, b);
            break;

        case '*':
            result = multiply(a, b);
            break;

        case '/':
            result = divide(a, b);
            break;
    }

    return result;
}

let calculator = {};
createCalc();
display('0');