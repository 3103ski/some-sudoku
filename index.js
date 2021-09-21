let sudoku = new Array(81).fill(0);

(function generateBoard() {
	const board = document.querySelector('.sudoku-board-main');
	for (let i = 0; i < 81; i++) {
		let boxOuter = document.createElement('div');
		let p = document.createElement('p');
		boxOuter.setAttribute('class', 'collection-inner-block');
		boxOuter.setAttribute('id', `block-${i}`);
		p.setAttribute('class', 'inner-block-number');
		p.setAttribute('id', `number-${i + 1}`);
		// p.setAttribute('class', 'inner-block-number');
		p.textContent = sudoku[i];

		boxOuter.appendChild(p);
		board.appendChild(boxOuter);
	}
})();

function randNum() {
	return Math.floor(Math.random() * 9) + 1;
}

// actual position number; so (index + 1)
function validateBoxSet(pos, num) {
	let start = pos;
	let isValid = true;

	// move start to left of box;
	let x = start % 3;
	if (x > 0) {
		start = start - (x - 1);
	} else {
		start -= 2;
	}

	// move start to top of box
	let y = Math.floor(pos / 9) % 3;
	if (pos % 9 === 0) {
		y -= 1;
	}
	start = start - y * 9;
	start -= 1;

	// check all positions in the box
	for (let i = 0; i < 3; i++) {
		for (let b = 0; b < 3; b++) {
			if (sudoku[start + b] === num) {
				isValid = false;
			}
		}
		start += 9;
	}

	return isValid;
}

// actual position number; so (index + 1)
function validateRow(pos, num) {
	let isValid = true;
	let stepsBack = (pos % 9) - 1;
	if (stepsBack === -1) {
		stepsBack = 8;
	}
	let rowCheckIndex = pos - (stepsBack + 1);
	for (let i = 1; i <= 9; i++) {
		if (sudoku[rowCheckIndex] === num) {
			isValid = false;
		}
		rowCheckIndex++;
	}

	return isValid;
}

function resetRowFor(pos) {
	let stepsBack = (pos % 9) - 1;
	if (stepsBack === -1) {
		stepsBack = 8;
	}
	let rowCheckIndex = pos - (stepsBack + 1);
	for (let i = 1; i <= 9; i++) {
		sudoku[rowCheckIndex] = 0;
		renderNumber(rowCheckIndex, 0);
	}
}

// actual position number; so (index + 1)
function validateColumn(pos, num) {
	let isValid = true;
	let colCheckIndex = pos % 9;
	if (colCheckIndex === 0) {
		colCheckIndex = 8;
	} else {
		colCheckIndex -= 1;
	}
	for (let i = 1; i <= 9; i++) {
		if (sudoku[colCheckIndex] === num) {
			isValid = false;
		}
		colCheckIndex += 9;
	}

	return isValid;
}

function resetColumnFor(pos) {
	let colCheckIndex = pos % 9;
	if (colCheckIndex === 0) {
		colCheckIndex = 8;
	} else {
		colCheckIndex -= 1;
	}
	for (let i = 1; i <= 9; i++) {
		sudoku[colCheckIndex] = 0;
		renderNumber(colCheckIndex, 0);
	}
}

function getNumberOptions(pos) {
	let options = [1, 2, 3, 4, 5, 6, 7, 8, 9];
	options = options.filter((num) => validateBoxSet(pos, num));
	options = options.filter((num) => validateColumn(pos, num));
	options = options.filter((num) => validateRow(pos, num));
	return options;
}

function renderNumber(pos, num) {
	document.getElementById(`number-${pos}`).textContent = num;
}

function assignNumbers(i, cap) {
	if (i <= cap) {
		let options = getNumberOptions(i);
		let sI = i - 1;
		if (options.length > 0) {
			let randIndex = Math.floor(Math.random() * options.length);
			if (sudoku[sI] === 0) {
				sudoku[sI] = options[randIndex];
			}
			renderNumber(i, options[randIndex]);
		} else {
			resetRowFor(i);
			resetColumnFor(i);
		}
		return assignNumbers(i + 1, cap);
	}
}

function hasConflict() {
	return sudoku.includes(0);
}

assignNumbers(1, 81);

setInterval(() => {
	if (hasConflict()) {
		assignNumbers(1, 81);
		console.log(sudoku);
	}
}, 2000);

// console.log(hasConflict());
