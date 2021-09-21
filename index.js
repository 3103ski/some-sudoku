//••••••••••••••••••••••••••
//  SETUP SUDOKU AND BOARD
//••••••••••••••••••••••••••
// var sudoku = new Array(81).fill(0);

function generateBoard() {
	const board = document.querySelector('.sudoku-board-main');

	for (var i = 0; i < 81; i++) {
		var boxOuter = document.createElement('div');
		var p = document.createElement('p');

		boxOuter.setAttribute('class', 'collection-inner-block');
		boxOuter.setAttribute('id', `block-${i}`);

		p.setAttribute('class', 'inner-block-number');
		p.setAttribute('id', `number-${i + 1}`);
		p.textContent = sudoku[i];

		boxOuter.appendChild(p);

		board.appendChild(boxOuter);
	}
}

// //•••••••••
// //  UTILS
// //•••••••••

// function checkSequence(sequenceAlgorithm) {
// 	var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
// 	var tempArr = new Array();

// 	for (var i = 0; i <= 8; i++) {
// 		tempArr[i] = sequenceAlgorithm(i);
// 	}
// 	tempArr.sort();
// 	return tempArr.join() == rightSequence.join();
// }

// function getNumFromBlockPos(pos, block) {
// 	var a = Math.floor(block / 3) * 27;
// 	var b = pos % 3;
// 	var c = 9 * Math.floor(pos / 3);
// 	var d = 3 * (block % 3);

// 	return sudoku[a + b + c + d];
// }

// function removeArrayValue(arr, number) {
// 	var newArray = new Array();
// 	for (var i = 0; i < arr.length; i++) {
// 		if (arr[i] != number) {
// 			newArray.unshift(arr[i]);
// 		}
// 	}
// 	return newArray;
// }

// //••••••••••••••••••••••
// //  GET CELL INFO
// //••••••••••••••••••••••
// function getCellRow(cell) {
// 	return Math.floor(cell / 9);
// }

// function getCellColumn(cell) {
// 	return cell % 9;
// }

// function getCellBlock(cell) {
// 	var row = getCellRow(cell);
// 	var col = getCellColumn(cell);

// 	return Math.floor(row / 3) * 3 + Math.floor(col / 3);
// }

// //••••••••••••••••••••••••••••••••••••••••
// //  CHECK CELL-VALUE PLAUSIBILITY
// //••••••••••••••••••••••••••••••••••••••••
// function isPossibleRow(number, row, sudoku) {
// 	for (var i = 0; i < 9; i++) {
// 		if (sudoku[row * 9 + i] === number) {
// 			return false;
// 		}
// 	}
// 	return true;
// }

// function isPossibleColumn(number, col, sudoku) {
// 	for (var i = 0; i < 9; i++) {
// 		if (sudoku[col + 9 * i] === number) {
// 			return false;
// 		}
// 	}
// 	return true;
// }

// function isPossibleBlock(number, block) {
// 	for (var i = 0; i < 9; i++) {
// 		if (getNumFromBlockPos(i, block) === number) {
// 			return false;
// 		}
// 	}
// 	return true;
// }

// function isPossibleNumber(cell, number, sudoku) {
// 	var row = getCellRow(cell);
// 	var col = getCellColumn(cell);
// 	var block = getCellBlock(cell);

// 	return (
// 		isPossibleRow(number, row, sudoku) &&
// 		isPossibleColumn(number, col, sudoku) &&
// 		isPossibleBlock(number, block)
// 	);
// }

// //•••••••••••••••••••••••••••••••••••
// //  VALIDATE EXISTING SUDOKU VALUES
// //•••••••••••••••••••••••••••••••••••

// function rowIsCorrect(row, sudoku) {
// 	return checkSequence((i) => sudoku[row * 9 + i]);
// }

// function colIsCorrect(col, sudoku) {
// 	return checkSequence((i) => sudoku[col + i * 9]);
// }

// function blockIsCorrect(block, sudoku) {
// 	return checkSequence((i) => sudoku[getNumFromBlockPos(i, block)]);
// }

// function isSolvedSudoku(sudoku) {
// 	for (var i = 0; i <= 8; i++) {
// 		if (!blockIsCorrect(i, sudoku) || !rowIsCorrect(i, sudoku) || !colIsCorrect(i, sudoku)) {
// 			return false;
// 		}
// 	}
// 	return true;
// }

// //•••••••••••••••••••••••••••••••
// //  CREATE ARRAY OF POTENTIAL
// //  VALUES FOR A CELL
// //•••••••••••••••••••••••••••••••
// function getPotentialValues(cell, sudoku) {
// 	var potentialValues = new Array();
// 	for (var i = 1; i <= 9; i++) {
// 		if (isPossibleNumber(cell, i, sudoku)) {
// 			potentialValues.unshift(i);
// 		}
// 	}
// 	return potentialValues;
// }

// //••••••••••••••••••••••••••••••••
// //  SELECT A RANDOM NUMBER FROM
// //  A CELL'S POTENTIAL VALUES
// //••••••••••••••••••••••••••••••••
// function selectRandomValue(possibleValues, cell) {
// 	console.log(possibleValues, cell);
// 	var randomSelection = Math.floor(Math.random() * possibleValues[cell].length);
// 	return possibleValues[cell][randomSelection];
// }

// // •••••••••••••••••••••••••••••••
// //  CREATE 2D ARRAY OF ALL
// //  POTENTIAL VALUES FOR SUDOKU
// // •••••••••••••••••••••••••••••••
// function scanSudokuForPotentialValues(sudoku) {
// 	var potentialValues = new Array();
// 	for (var i = 0; i <= 80; i++) {
// 		if (sudoku[i] == 0) {
// 			potentialValues[i] = new Array();
// 			potentialValues[i] = getPotentialValues(i, sudoku);
// 			if (potentialValues[i].length < 1) {
// 				return false;
// 			}
// 		}
// 	}
// 	if (potentialValues == undefined) {
// 		return false;
// 	}
// 	return potentialValues;
// }

// // •••••••••••••••••••••••••••••••
// //  FIND INDEX FOR CELL WITH
// //  LEAST POTENTIAL VALUES
// // •••••••••••••••••••••••••••••••
// function nextRandom(possible) {
// 	var max = 9;
// 	var leastPotentials = 0;
// 	for (var i = 0; i <= 80; i++) {
// 		if (possible != undefined && possible[i] != undefined) {
// 			if (possible[i].length <= max && possible[i].length > 0) {
// 				max = possible[i].length;
// 				leastPotentials = i;
// 			}
// 		}
// 	}
// 	return leastPotentials;
// }

// // ••• solve a sudoku
// function solve(sudoku) {
// 	var saved = new Array();
// 	var savedSudoku = new Array();
// 	var i = 0;
// 	var nextMove, whatToTry, attempt;

// 	while (!isSolvedSudoku(sudoku)) {
// 		i++;
// 		nextMove = scanSudokuForPotentialValues(sudoku);
// 		if (nextMove == false) {
// 			nextMove = saved.pop();
// 			sudoku = savedSudoku.pop();
// 		}

// 		console.log('next move :: ', nextMove);
// 		whatToTry = nextRandom(nextMove);
// 		attempt = selectRandomValue(nextMove, whatToTry);

// 		if (nextMove[whatToTry].length > 1) {
// 			nextMove[whatToTry] = removeArrayValue(nextMove[whatToTry], attempt);
// 			saved.push(nextMove.slice());
// 			savedSudoku.push(sudoku.slice());
// 		}

// 		sudoku[whatToTry] = attempt;
// 	}
// 	// generateBoard();
// }

// solve(sudoku);

//•••••••••••••••••••••••••••••••••••••••••
//•••••••••••••••••••••••••••••••••••••••••
//•••••••••••••••••••••••••••••••••••••••••

// we start with an empty sudoku...
var sudoku = new Array(
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	0
);

// ... and we solve it!!
solve(sudoku);

// given a sudoku cell, returns the row
function returnRow(cell) {
	return Math.floor(cell / 9);
}

// given a sudoku cell, returns the column
function returnCol(cell) {
	return cell % 9;
}

// given a sudoku cell, returns the 3x3 block
function returnBlock(cell) {
	return Math.floor(returnRow(cell) / 3) * 3 + Math.floor(returnCol(cell) / 3);
}

// given a number, a row and a sudoku, returns true if the number can be placed in the row
function isPossibleRow(number, row, sudoku) {
	for (var i = 0; i <= 8; i++) {
		if (sudoku[row * 9 + i] == number) {
			return false;
		}
	}
	return true;
}

// given a number, a column and a sudoku, returns true if the number can be placed in the column
function isPossibleCol(number, col, sudoku) {
	for (var i = 0; i <= 8; i++) {
		if (sudoku[col + 9 * i] == number) {
			return false;
		}
	}
	return true;
}

// given a number, a 3x3 block and a sudoku, returns true if the number can be placed in the block
function isPossibleBlock(number, block, sudoku) {
	for (var i = 0; i <= 8; i++) {
		if (
			sudoku[
				Math.floor(block / 3) * 27 + (i % 3) + 9 * Math.floor(i / 3) + 3 * (block % 3)
			] == number
		) {
			return false;
		}
	}
	return true;
}

// given a cell, a number and a sudoku, returns true if the number can be placed in the cell
function isPossibleNumber(cell, number, sudoku) {
	var row = returnRow(cell);
	var col = returnCol(cell);
	var block = returnBlock(cell);
	return (
		isPossibleRow(number, row, sudoku) &&
		isPossibleCol(number, col, sudoku) &&
		isPossibleBlock(number, block, sudoku)
	);
}

// given a row and a sudoku, returns true if it's a legal row
function isCorrectRow(row, sudoku) {
	var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
	var rowTemp = new Array();
	for (var i = 0; i <= 8; i++) {
		rowTemp[i] = sudoku[row * 9 + i];
	}
	rowTemp.sort();
	return rowTemp.join() == rightSequence.join();
}

// given a column and a sudoku, returns true if it's a legal column
function isCorrectCol(col, sudoku) {
	var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
	var colTemp = new Array();
	for (var i = 0; i <= 8; i++) {
		colTemp[i] = sudoku[col + i * 9];
	}
	colTemp.sort();
	return colTemp.join() == rightSequence.join();
}

// given a 3x3 block and a sudoku, returns true if it's a legal block
function isCorrectBlock(block, sudoku) {
	var rightSequence = new Array(1, 2, 3, 4, 5, 6, 7, 8, 9);
	var blockTemp = new Array();
	for (var i = 0; i <= 8; i++) {
		blockTemp[i] =
			sudoku[Math.floor(block / 3) * 27 + (i % 3) + 9 * Math.floor(i / 3) + 3 * (block % 3)];
	}
	blockTemp.sort();
	return blockTemp.join() == rightSequence.join();
}

// given a sudoku, returns true if the sudoku is solved
function isSolvedSudoku(sudoku) {
	for (var i = 0; i <= 8; i++) {
		if (!isCorrectBlock(i, sudoku) || !isCorrectRow(i, sudoku) || !isCorrectCol(i, sudoku)) {
			return false;
		}
	}
	return true;
}

// given a cell and a sudoku, returns an array with all possible values we can write in the cell
function determinePossibleValues(cell, sudoku) {
	var possible = new Array();
	for (var i = 1; i <= 9; i++) {
		if (isPossibleNumber(cell, i, sudoku)) {
			possible.unshift(i);
		}
	}
	return possible;
}

// given an array of possible values assignable to a cell, returns a random value picked from the array
function determineRandomPossibleValue(possible, cell) {
	var randomPicked = Math.floor(Math.random() * possible[cell].length);
	return possible[cell][randomPicked];
}

// given a sudoku, returns a two dimension array with all possible values
function scanSudokuForUnique(sudoku) {
	var possible = new Array();
	for (var i = 0; i <= 80; i++) {
		if (sudoku[i] == 0) {
			possible[i] = new Array();
			possible[i] = determinePossibleValues(i, sudoku);
			if (possible[i].length == 0) {
				return false;
			}
		}
	}
	return possible;
}

// given an array and a number, removes the number from the array
function removeAttempt(attemptArray, number) {
	var newArray = new Array();
	for (var i = 0; i < attemptArray.length; i++) {
		if (attemptArray[i] != number) {
			newArray.unshift(attemptArray[i]);
		}
	}
	return newArray;
}

// given a two dimension array of possible values, returns the index of a cell where there are the less possible numbers to choose from
function nextRandom(possible) {
	var max = 9;
	var minChoices = 0;
	for (var i = 0; i <= 80; i++) {
		if (possible[i] != undefined) {
			if (possible[i].length <= max && possible[i].length > 0) {
				max = possible[i].length;
				minChoices = i;
			}
		}
	}
	return minChoices;
}

// given a sudoku, solves it
function solve(sudoku) {
	var saved = new Array();
	var savedSudoku = new Array();
	var i = 0;
	var nextMove;
	var whatToTry;
	var attempt;
	while (!isSolvedSudoku(sudoku) || sudoku.includes(0)) {
		i++;
		nextMove = scanSudokuForUnique(sudoku);
		if (nextMove == false) {
			nextMove = saved.pop();
			sudoku = savedSudoku.pop();
		}
		whatToTry = nextRandom(nextMove);
		attempt = determineRandomPossibleValue(nextMove, whatToTry);
		if (nextMove[whatToTry].length > 1) {
			nextMove[whatToTry] = removeAttempt(nextMove[whatToTry], attempt);
			saved.push(nextMove.slice());
			savedSudoku.push(sudoku.slice());
		}
		sudoku[whatToTry] = attempt;
	}
	generateBoard();
}
