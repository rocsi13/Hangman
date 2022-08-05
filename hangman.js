<script type="text/javascript">
	var letters = [];
	var lives = 7;
	var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");

	function addWord() {
	    var word = document.getElementById("word-input").value;
	    word = word.toUpperCase();
	    document.getElementById("word-input").value = "";
	    letters = word.split("");
	}

	function displayLines() {
	    for (var i = 0; i < letters.length; ++i) {
	        var col = document.createElement("div");
            col.innerText = "____";
            col.id = i;
            document.getElementById("word-lines").appendChild(col);
	    }
	}

	function createKeyboard() {
        var container = document.createElement("div");
        container.id = "main";
        container.className = "word-container";
        document.getElementById("buttons-space").appendChild(container);
        var main = document.getElementById("main");
        for (var j = 0; j < 3; j++) {
            var row = document.createElement("div");
            row.className = "row";
            row.id = "row" + j;
            main.appendChild(row);
            var roww = document.getElementById("row" + j);
            for (var i = 0; i < 10 && i < alphabet.length; i++) {
                var col = document.createElement("div");
                col.className = "col-1 my-2 mx-2";
                col.id = "col" + j + i;
                roww.appendChild(col);
                keys(i, i, j);
            }
            for (var l = 0; l < 10; l++) {
            alphabet.shift();
            }
        }
	}

	createKeyboard();

	function keys(letterIndex, colNumber, rowNumber) {
	    var button = document.createElement("button");
	    button.className = "btn btn-primary";
	    button.style = "height: 45px; width: 45px";
	    button.id = alphabet[letterIndex];
	    button.innerText = alphabet[letterIndex].toUpperCase();
	    document.getElementById("col" + rowNumber + colNumber).appendChild(button);
	}

	function addEventOnKeys() {
	    var buttons = document.getElementsByClassName("btn-primary");
	    for (btn of buttons) {
	        btn.onclick = function () {
	        guessLetter(this.id);
	  	    };
	    }
	}

	addEventOnKeys();

	var numberOfLives = document.createElement("h3");

	function displayLives() {
	    console.log("displayLives()");
	    numberOfLives.innerText = lives;
	    numberOfLives.setAttribute("color", "white");
	    var life = document.getElementById("lives");
	    life.append(numberOfLives);
	}

	var lettersGuessed = 0;
	function guessLetter(letterChosen) {
	    var mess = (document.getElementById("mess").innerText = "");
	    var counter = 0;
	    for (var i = 0; i < letters.length; ++i) {
	        if (letterChosen.toUpperCase() == letters[i]) {
	            var spaceForLetter = document.getElementById(i);
	            if (spaceForLetter.innerText == "____") {
	                spaceForLetter.innerText = letters[i];
	                ++lettersGuessed;
	            } else {
	                var mess = document.getElementById("mess");
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
	    var nrLives = document.getElementById("lives");
	    if (lives == 0) {
	        nrLives.innerText = "You've lost!";
	    } else if (lives > 0) {
	        nrLives.innerText = "You won!";
	    }
	}
</script>