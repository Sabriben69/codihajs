const input_el = document.getElementById("prompt");
const output_el = document.getElementById("output");
const terminal_el = document.getElementById("terminal");

input_el?.addEventListener('keypress', handle_keypress);

let user = 'esst'

function message(text, colorText = "green") {
	let p = document.createElement('p');

	p.innerText = text;
	p.style.color = colorText;

	output_el?.appendChild(p);

	output_el.scrollTo({
		top: output_el.scrollHeight
	})
}

function handle_keypress(event) {
	let text = input_el.value;

	if (event.key !== 'Enter' || text.length === 0) return; 

	message(user + "#~: " + text, 'white');
	input_el.value = '';

	let words = text.split(' ');
	let command = words.shift();
	let arguments = words;
	switch (command) {
		case "echo":
			return handleEcho(command, arguments)
		case "open":
			return handleOpen(command, arguments);
		case "display":
			return handleAlert(command, arguments);
		case "color":
		
			if (arguments.length < 1) {
				return message('Please provide a color.')
			}

			else {
				let color = arguments[0];
				document.body.style.backgroundColor = color;
				message(`Changed color to ${color}.`);
			}

			break;
		
		case "printnum":
			if (arguments.length < 1) {
				return message('Please provide N.')
			}

			else {
	
				let n = parseInt(arguments[0]);

				for (let i = 0; i < n; i++) {
					message(i + 1);
				}

				message('Finished.')
			}

			break;

		case "triangle":
			if (arguments.length < 1) {
				return message('Please provide a size.')
			}

			else {
				let n = parseInt(arguments[0]);

				for (let i = 0; i <= n; i++) {
					let result = ''

					for (let j = 0; j < i; j++) {
						result = result + "*"
					}

					message(result)
				}

				message('Finish')
			}

			break;

		case "cos":
			if (arguments.length !== 1) {
				return message('Please provide x')
			}

			else {
				let x = parseFloat(arguments[0]);
				message(`Result: ${Math.cos(x)}`);
			}

			break;

		case "rename":
			return handleRename(command, arguments);

		case "stock":
			return handleAssignment(command, arguments);
		
		case "show":
			return handleShow(command, arguments);

		case "clear":
			return handleClear(command, arguments);

		case "add":
		case "sub":
		case "mul":
		case "div":
			return handleBinary(command, arguments);

		default:
			message(`${command}: command not found`, "red")
			break;
	}
}

function handleEcho(command, arguments) {
	message(arguments.join(' '));
}

function handleRename(command, arguments) {

	if (arguments.length < 1)
		return message('Error: Please provide a name.', 'orange');

	let newName = arguments[0];

	let oldName = user
	user = newName

	message(`Renamed ${oldName} to ${newName}`);
}

function handleOpen(command, arguments) {

	if (arguments.length < 1)
		return message('You have provided no link!', "red");

	let link = arguments[0];
	message(`Opening ${link}...`);

	open(link);
}

function handleClear(command, arguments) {
	output_el.innerHTML = ''

	message('Console is cleared.')
}

function handleAlert(command, arguments) {
	alert(arguments.join(' '));
}

function handleBinary(command, arguments) {
	let first = parseFloat(arguments[0]);
	let second = parseFloat(arguments[1]);

	let result;
	switch (command) {
		case "add":
			result = first + second;
			break;

		case "sub":
			result = first - second;
			break;

		case "mul":
			result = first * second;
			break;

		case "div":
			result = first / second;
			break;
		default:
			return message(`Unknown binary operation ${command}`, 'red');
	}

	message(`Result: ${result}`);
}

