// class Board {
// 	constructor() {
// 		this.blocks = [];

// 		for (let i = 1; i <= 9; i++) {
// 			this.blocks = [...this.blocks, new Block(i)];
// 		}
// 	}

// 	getBlock(num) {
// 		return this.blocks[num - 1];
// 	}

// 	compareBlocksFor(blockNum) {
// 		// check blockNum % 3
// 		// if 1
// 		// check 1, 4, 7
// 		// if 2
// 		// check 2, 5, 8
// 		// if 3
// 		// check 3, 6, 9

// 		let foundFlag = false;

// 		// check horizontal blocks
// 		let vChecked = 0;
// 		let vertStart = blockNum.block % 3;
// 		for (let focusBlock = vertStart; vChecked < 3; focusBlock += 3) {
// 			console.log('CHECKING BLOCK', focusBlock);
// 			for (let innerRowNum = 0; innerRowNum < 3; innerRowNum++) {
// 				let block = board.getBlock(focusBlock);
// 				let num = block.getNum(innerRowNum, blockNum.pos[1]);
// 				if (num === blockNum.num) {
// 					foundFlag = true;
// 				}
// 			}
// 			vChecked++;
// 		}

// 		// check horizontal blocks
// 		let hStartPos = (function () {
// 			let x = 9 / blockNum.block;
// 			if (x >= 3) {
// 				return 1;
// 			} else if (x <= 1.3) {
// 				return 7;
// 			} else {
// 				return 4;
// 			}
// 		})();
// 		let hEndPos = hStartPos + 2;

// 		for (let blockNumber = hStartPos; blockNumber <= hEndPos; blockNumber++) {
// 			for (let innerBlockNum = 0; innerBlockNum <= 2; innerBlockNum++) {
// 				let block = this.getBlock(blockNumber);
// 				let num = block.getNum(blockNum.pos[0], innerBlockNum);
// 				if (num === blockNum.num) {
// 					foundFlag = true;
// 				}
// 			}
// 		}

// 		return foundFlag;
// 	}
// }

// class Block {
// 	constructor(blockNumber) {
// 		this.neededNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
// 		this.blockNumber = blockNumber;
// 		this.blockContent = [
// 			[null, null, null],
// 			[null, null, null],
// 			[null, null, null],
// 		];
// 	}

// 	getNum(row, col) {
// 		return this.blockContent[row][col];
// 	}

// 	assignNum(row, col, newNum, board) {
// 		if (this.neededNumbers.includes(newNum) && this.blockContent[row][col] === null) {
// 			let conflictWithOtherBlock = board.compareBlocksFor({
// 				block: this.blockNumber,
// 				pos: [row, col],
// 				num: newNum,
// 			});
// 			console.log(conflictWithOtherBlock);
// 			if (!conflictWithOtherBlock) {
// 				this.blockContent[row][col] = newNum;
// 				this.neededNumbers = this.neededNumbers.filter((num) => num !== newNum);
// 				return true;
// 			} else {
// 				return false;
// 			}
// 		} else {
// 			return false;
// 		}
// 	}

// 	has(num) {
// 		if (!this.neededNumbers.includes(num)) {
// 			return true;
// 		} else {
// 			return false;
// 		}
// 	}
// }

// function randNum() {
// 	return Math.floor(Math.random() * 9) + 1;
// }

// const board = new Board();
// let blockNum = 1;

// for (; blockNum <= 9; blockNum++) {
// 	for (let row = 0; row <= 2; row++) {
// 		for (let col = 0; col <= 2; col++) {
// 			let i = 0;
// 			while (i < 10) {
// 				board.getBlock(blockNum).assignNum(row, col, randNum(), board);
// 				console.log(board.getBlock(blockNum).getNum(row, col));
// 				i++;
// 			}
// 		}
// 	}
// }

// const firstTry = board.getBlock(1).assignNum(1, 2, 9, board);

// for (let i = 0; i < 5; i++) {
// 	console.log();
// }

function generateBlockHtml(pos) {
	return `
        <div class="collection-inner-block" id="block-${pos}">
            <p class="inner-block-number">0</p>
        </div>  
    `;
}
let sudoku = new Array(81).fill(0);

// test = test.map((x) => 0);

// console.log(test);

// let sudoku = [];
// for (let i = 1; i <= 81; i++) {
// 	// sudoku.push(null);
// 	sudoku.push(randNum());
// }

function randNum() {
	return Math.floor(Math.random() * 9) + 1;
}

// console.log(validateRow(10, 13));
// console.log(validateColumn(15, 16));
// console.log(validateBoxSet(16, 27));

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

async function getNumberOptions(pos) {
	let options = [];

	await (function () {
		for (let i = 1; i <= 9; i++) {
			options.push(i);
		}
	})();

	await (function () {
		for (let a = 1; a <= options.length; a++) {
			if (validateBoxSet(pos, options[a - 1]) === false) {
				options = options.filter((x) => x !== a);
			}
		}
	})();

	await (function () {
		for (let a = 1; a <= options.length; a++) {
			if (validateColumn(pos, options[a - 1]) === false) {
				options = options.filter((x) => x !== a);
			}
		}
	})();

	await (function () {
		for (let a = 1; a <= options.length; a++) {
			if (validateRow(pos, options[a - 1]) === false) {
				options = options.filter((x) => x !== a);
			}
		}
	})();

	return options;
}

let tries = 0;

(async function () {
	for (let i = 1; i <= 81; i++) {
		// let assignedNumber = null;
		let options = getNumberOptions(i);
		// console.log(options);
		options.then((options) => {
			// console.log(options);
			let randomSelection = options[Math.floor(Math.random() * options.length)];
			// console.log('Random Selection :: ', randomSelection);
			sudoku[i - 1] = randomSelection;
		});
	}
})();

(function generateBoard() {
	const board = document.querySelector('.sudoku-board-main');
	for (let i = 0; i < 81; i++) {
		let boxOuter = document.createElement('div');
		let p = document.createElement('p');
		boxOuter.setAttribute('class', 'collection-inner-block');
		boxOuter.setAttribute('id', `block-${i}`);
		p.setAttribute('class', 'inner-block-number');
		p.textContent = sudoku[i];

		boxOuter.appendChild(p);
		board.appendChild(boxOuter);
	}
})();

// console.log();
