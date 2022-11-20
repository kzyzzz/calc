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

    let keys = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '', '+', '=','', 'c', 'b'];

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
        case '.':
            
            if ('action' in calculator) {

                if ('secondNumber'  in calculator) {
                    calculator.secondNumber += key;
                } else {
                    calculator.secondNumber = key
                }

                display.innerText = calculator.secondNumber;
            } else {

                if ('firstNumber' in calculator) {
                    calculator.firstNumber += key;
                } else {
                    calculator.firstNumber = key;
                }
                display.innerText = calculator.firstNumber;
            }
            break;

        case '/':
        case '*':
        case '-':
        case '+':
            if ('action', 'secondNumber' in calculator) {
                calculator.firstNumber = calculate();
                display.innerText = calculator.firstNumber;
                calculator.action = key;
                break;
            }

            if ('firstNumber' in calculator) {
                calculator.action = key;
                break;
            }

            if (!isNaN(parseFloat(display.innerText))) {
                calculator.firstNumber = parseFloat(display.innerText);
                calculator.action = key;
            }

            break;

        case '=':
            if ('action', 'firstNumber', 'secondNumber' in calculator) {
                display.innerText = calculate();
            }
            break;
        
        case 'c':
            clear();

        case 'b':
            backspace();
    }
}

function clear() {

    document.querySelector('.display').innerText = '';

    delete calculator.firstNumber;
    delete calculator.secondNumber;
    delete calculator.action;
}

function backspace() {

    let display = document.querySelector('.display').textContent;
    if (display != '') {
        display = display.slice(0, display.length -1);
        document.querySelector('.display').textContent = display;

        if ('secondNumber' in calculator) {
            calculator.secondNumber = display;
        } else {
            calculator.firstNumber = display;
        }
    }
}

function calculate() {

    let result = undefined;

    if ('action', 'firstNumber', 'secondNumber' in calculator) {

        result = operate (calculator.firstNumber, calculator.secondNumber, calculator.action);

        clear();

        result = Math.round(result*1000000)/1000000;
    }

    return result;
}

function operate(a, b, operator) {

    switch(operator) {
        case '+':
            return a*1 + b*1;

        case '-':
            return a*1 - b*1;;

        case '*':
            return a * b;

        case '/':
            return a / b;
    }

    return undefined;
}

let calculator = {};
createCalc();