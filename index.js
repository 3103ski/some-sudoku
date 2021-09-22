// import { generateSudoku } from './sudokuGenerator.js';

var sudokuAnswers = generateSudoku();

function generateBoard(difficulty) {
	const board = document.querySelector('.sudoku-board-main');
	board.innerHTML = '';

	for (var i = 0; i < 81; i++) {
		var boxOuter = document.createElement('div');
		var p = document.createElement('p');

		boxOuter.setAttribute('class', 'collection-inner-block');
		boxOuter.setAttribute('id', 'block-' + i);

		p.setAttribute('class', 'inner-block-number');
		p.setAttribute('id', 'number-' + i);

		boxOuter.appendChild(p);

		board.appendChild(boxOuter);
	}
	addClues(difficulty);
}

function addClues(difficulty) {
	var clueCount = 0;
	var displayed = [];

	switch (difficulty) {
		case 'medium':
			clueCount = 27;
			break;
		case 'easy':
			clueCount = 35;
			break;
		default:
			clueCount = 20;
	}

	while (displayed.length <= clueCount) {
		var randomSpot = Math.floor(Math.random() * 80);
		var cellEl = document.getElementById('number-' + randomSpot);
		if (!displayed.includes(randomSpot)) {
			cellEl.textContent = sudokuAnswers[randomSpot];
			displayed.push(randomSpot);
		}
	}
}

function showAnswers() {
	for (var i = 0; i <= 80; i++) {
		var el = document.getElementById('number-' + i);
		el.textContent = sudokuAnswers[i];
	}
}

document.getElementById('showAnswers').addEventListener('click', showAnswers);
document.getElementById('newPuzzle').addEventListener('click', function () {
	sudokuAnswers = generateSudoku();
	generateBoard();
});

generateBoard();
