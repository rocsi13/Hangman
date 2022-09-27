let letters = [];
let lives = 7;
let alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
let lettersGuessed = 0;
let numberOfLives = document.createElement("h3");

function addWord() {
	let word = document.getElementById("word-input").value;
	word = word.toUpperCase();
	document.getElementById("word-input").value = "";
	letters = word.split("");
}

function displayLines() {
	for (let i = 0; i < letters.length; ++i) {
		let col = document.createElement("div");
	    	col.innerText = "____";
	    	col.id = i;
	    	document.getElementById("word-lines").appendChild(col);
	}
}

function createKeyboard() {
	let container = document.createElement("div");
  	container.id = "main";
  	container.className = "word-container";
  	document.getElementById("buttons-space").appendChild(container);
  	let main = document.getElementById("main");
  	for (let j = 0; j < 3; j++) {
	    	let row = document.createElement("div");
		row.className = "row";
		row.id = "row" + j;
		main.appendChild(row);
		let roww = document.getElementById("row" + j);
		for (let i = 0; i < 10 && i < alphabet.length; i++) {
			let col = document.createElement("div");
	        	col.className = "col-1 my-2 mx-2";
	        	col.id = "col" + j + i;
	        	roww.appendChild(col);
	        	keys(i, i, j);
	   	}
	   	for (let l = 0; l < 10; l++) {
       	    		alphabet.shift();
    		}
  	}
}

function keys(letterIndex, colNumber, rowNumber) {
	let button = document.createElement("button");
	button.className = "btn btn-primary";
	button.style = "height: 45px; width: 45px";
	button.id = alphabet[letterIndex];
	button.innerText = alphabet[letterIndex].toUpperCase();
	document.getElementById("col" + rowNumber + colNumber).appendChild(button);
}

function addEventOnKeys() {
	let buttons = document.getElementsByClassName("btn-primary");
	for (btn of buttons) {
	    	btn.onclick = function () {
	    	guessLetter(this.id);
	  	};
	}
}

function displayLives() {
	console.log("displayLives()");
	numberOfLives.innerText = lives;
	numberOfLives.setAttribute("color", "white");
	let life = document.getElementById("lives");
	life.append(numberOfLives);
}

function guessLetter(letterChosen) {
	let mess = (document.getElementById("mess").innerText = "");
	let counter = 0;
	for (let i = 0; i < letters.length; ++i) {
	    	if (letterChosen.toUpperCase() == letters[i]) {
			let spaceForLetter = document.getElementById(i);
	        	if (spaceForLetter.innerText == "____") {
	            		spaceForLetter.innerText = letters[i];
	            		++lettersGuessed;
	        	} else {
	            		let mess = document.getElementById("mess");
	            		mess.innerText = "You already guessed this letter!";
	        	}
	        	if (lettersGuessed == letters.length) {
	            		displayMessage();
	        	}
	    	} else {
	        	++counter;
	    	}
	}
	if (counter == letters.length) {
	    	shortenLife();
	}
}

function shortenLife() {
	if (lives > 1) {
		--lives;
	    	displayLives();
	} else if (lives == 1) {
	    	--lives;
	    	displayLives();
	    	displayMessage();
	}
}

function displayMessage() {
	let nrLives = document.getElementById("lives");
	if (lives == 0) {
	    	nrLives.innerText = "You've lost!";
	} else if (lives > 0) {
	    	nrLives.innerText = "You won!";
	}
}

addEventOnKeys();

createKeyboard();
