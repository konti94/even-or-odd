"use strict";
const inputString = document.querySelector('#inputString');
const errorMessage = document.querySelector('.error-message');
const submitButton = document.querySelector('#submit');
const resultText = document.querySelector('#result');
const regex = /[0-9\+\-]/g;
submitButton.addEventListener('click', () => {
    inputString.classList.remove('error');
    errorMessage.classList.remove('show');
    const isValid = validate(inputString.value);
    if (isValid) {
        const isEven = evenNumber(inputString.value);
        if (isEven) {
            resultText.innerText = 'páros';
        }
        else {
            resultText.innerText = 'páratlan';
        }
    }
    else {
        inputString.classList.add('error');
        errorMessage.classList.add('show');
    }
});
const validate = (expression) => {
    if (expression.match(regex)) {
        return true;
    }
    else {
        return false;
    }
};
const evenNumber = (expression) => {
    const number = transform(expression);
    if (number % 2 === 0) {
        return true;
    }
    else {
        return false;
    }
};
const transform = (expression) => {
    const numbers = expression.split(/[+-]+/).map((number) => Number(number));
    let operators = [];
    let calculation = 0;
    [...expression].forEach((operator) => {
        if (operator === '+' || operator === '-') {
            operators.push(operator);
        }
    });
    numbers.forEach((number, i) => {
        if (i === 0) {
            calculation = number;
        }
        if (i > 0) {
            if (operators[i - 1] === '+') {
                calculation += number;
            }
            else {
                calculation -= number;
            }
        }
    });
    return calculation;
};
