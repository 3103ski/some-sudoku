import { generateSudoku, sudoku } from './sudokuGenerator.js';

let sudokuAnswers = generateSudoku();

function generateBoard(difficulty) {
	const board = document.querySelector('.sudoku-board-main');
	board.innerHTML = '';

	for (var i = 0; i < 81; i++) {
		var boxOuter = document.createElement('div');
		var p = document.createElement('p');

		boxOuter.setAttribute('class', 'collection-inner-block');
		boxOuter.setAttribute('id', `block-${i}`);

		p.setAttribute('class', 'inner-block-number');
		p.setAttribute('id', `number-${i}`);

		boxOuter.appendChild(p);

		board.appendChild(boxOuter);
	}
	addClues(difficulty);
}

function addClues(difficulty) {
	let clueCount = 0;
	let displayed = [];

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
		let randomSpot = Math.floor(Math.random() * 80);
		let cellEl = document.getElementById(`number-${randomSpot}`);
		if (!displayed.includes(randomSpot)) {
			cellEl.textContent = sudokuAnswers[randomSpot];
			displayed.push(randomSpot);
		}
	}
}

function showAnswers() {
	for (let i = 0; i <= 80; i++) {
		let el = document.getElementById(`number-${i}`);
		el.textContent = sudokuAnswers[i];
	}
}

document.getElementById('showAnswers').addEventListener('click', () => {
	showAnswers();
});
document.getElementById('newPuzzle').addEventListener('click', () => {
	sudokuAnswers = generateSudoku();
	generateBoard();
});
generateBoard();
