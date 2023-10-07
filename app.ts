const inputString = document.querySelector('#inputString') as HTMLInputElement;
const errorMessage = document.querySelector('.error-message') as HTMLElement;
const submitButton = document.querySelector('#submit') as HTMLButtonElement;
const resultText = document.querySelector('#result') as HTMLElement;
const regex = /[0-9\+\-]/g;

submitButton.addEventListener('click', () => {
	inputString.classList.remove('error');
	errorMessage.classList.remove('show');

	const isValid: boolean = validate(inputString.value);

	if (isValid) {
		const isEven: boolean = evenNumber(inputString.value);

		if (isEven) {
			resultText.innerText = 'páros';
		} else {
			resultText.innerText = 'páratlan';
		}
	} else {
		inputString.classList.add('error');
		errorMessage.classList.add('show');
	}
});

const validate = (expression: string) => {
	if (expression.match(regex)) {
		return true;
	} else {
		return false;
	}
};

const evenNumber = (expression: string) => {
	const number = transform(expression);

	if (number % 2 === 0) {
		return true;
	} else {
		return false;
	}
};

const transform = (expression: string) => {
	const numbers = expression.split(/[+-]+/).map((number) => Number(number));
	let operators: string[] = [];
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
			} else {
				calculation -= number;
			}
		}
	});

	return calculation;
};
