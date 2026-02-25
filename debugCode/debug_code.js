	
function performOperation() {
	// Get user input from input fields (allowing characters)
	let input1 = document.getElementById('input1').value;
	let input2 = document.getElementById('input2').value;
	let operation = document.getElementById('operation').value;

	console.log('=== Raw Input Values ===');
	console.log('Input1:', input1, 'Type:', typeof input1);
	console.log('Input2:', input2, 'Type:', typeof input2);
	
	// Debugger pauses here to observe raw input
	debugger;

	// Parse inputs to numbers
	let num1 = parseInt(input1);
	let num2 = parseInt(input2);

	console.log('=== After parseInt ===');
	console.log('num1:', num1, 'Type:', typeof num1, 'isNaN:', isNaN(num1));
	console.log('num2:', num2, 'Type:', typeof num2, 'isNaN:', isNaN(num2));
	
	// Debugger pauses to observe parsed values
	debugger;

	// Validate inputs
	if (isNaN(num1) || isNaN(num2)) {
		displayResult('⚠️ Invalid input detected! Character values or non-numeric input detected and converted to NaN.');
		return;
	}

	// Perform operations based on selection
	if (operation === 'add') {
		let result = add(num1, num2);
		displayResult(`Addition: ${num1} + ${num2} = ${result}`);
	} else if (operation === 'multiply') {
		let result = multiply(num1, num2);
		displayResult(`Multiplication: ${num1} × ${num2} = ${result}`);
	} else if (operation === 'divide') {
		let result = divide(num1, num2);
		displayResult(result);
	} else if (operation === 'all') {
		// Perform all operations simultaneously
		let resultAdd = add(num1, num2);
		let resultMultiply = multiply(num1, num2);
		let resultDivide = divide(num1, num2);
		
		displayResult(`
			<strong>All Operations:</strong><br>
			Addition: ${num1} + ${num2} = ${resultAdd}<br>
			Multiplication: ${num1} × ${num2} = ${resultMultiply}<br>
			Division: ${resultDivide}
		`);
	}
}

function add(a, b) {
	console.log('--- ADD OPERATION ---');
	console.log(`Adding: ${a} + ${b}`);
	
	// Debugger pauses to inspect values before addition
	debugger;
	
	let result = a + b;
	console.log(`Result: ${result}`);
	return result;
}

function multiply(a, b) {
	console.log('--- MULTIPLY OPERATION ---');
	console.log(`Multiplying: ${a} × ${b}`);
	
	// Debugger pauses to inspect values before multiplication
	debugger;
	
	let result = a * b;
	console.log(`Result: ${result}`);
	return result;
}

function divide(a, b) {
	console.log('--- DIVIDE OPERATION ---');
	console.log(`Dividing: ${a} ÷ ${b}`);
	
	// Debugger pauses to inspect values before division
	debugger;
	
	if (b === 0) {
		return 'Division: Cannot divide by zero!';
	}
	let result = a / b;
	console.log(`Result: ${result}`);
	return `Division: ${a} ÷ ${b} = ${result.toFixed(2)}`;
}

function displayResult(result) {
	const resultElement = document.getElementById('result');
	
	// Debugger pauses to inspect result before display
	debugger;
	
	console.log('=== FINAL RESULT ===');
	console.log('DisplayResult:', result);
	
	resultElement.innerHTML = `<p><strong>${result}</strong></p>`;
}
		
