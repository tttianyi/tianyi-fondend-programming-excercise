"use strict";

/*-------------------------------functions-----------------------------*/
//reset the game, put all the game containers hidden
function setDefault(){
    gameHasStarted = false;
    document.getElementById("guessWord").style.visibility = 'hidden';
    document.getElementById("container").style.visibility = 'hidden';
    document.getElementById("hangmanPic").style.visibility = 'hidden';
}

//click start button to begin the game, hide the welcome texts and show the game containers
function start(){
    document.getElementById("instruction").style.visibility = 'hidden';
    document.getElementById("welcome").style.visibility = 'hidden';
    document.getElementById("theme").style.visibility = 'hidden';
    document.getElementById("guessWord").style.visibility = 'visible';
    document.getElementById("container").style.visibility = 'visible';
    document.getElementById("hangmanPic").style.visibility = 'visible';
    setTimeout(() => {
        gameHasStarted = true;
    }, 1);
}

//provide a random word
function randomWord(){
    //set the vocabulary library
    const words = ["apple", "banana", "coconut","grape", "kiwi", "lemon", "mango", "orange", "peach", "raspberry"];
    //chose a random word
    var randomWord = words[Math.floor(Math.random()*words.length)];
    //put the word into pieces and in an array
    return randomWord.split("");
}

//game's main mechanic, match the letters
//guess = ['k', 'i', 'w', 'i'];
//empty = ['_', '_', '_', '_'];
function matchLetter(guess, empty){
    var wrongAttempts = 0;//calculate wrong attempts
    var remainingLetters = guess.length;//calculate the remain unknown letters

    //set the click function, and to catch the click elements' id
    document.body.onclick = function(event){

        //only run this if game started
        if (!gameHasStarted) {
            return;
        }

        //if the user lose all 8 lives, the game ends with a bad ending
        if (wrongAttempts === 8) {
            // player loses
            alert("You lose! The right word is "+ guessWord.join("") + ".");
            //end the click function
            document.body.onclick = null;
            //change the backgrounds to bad ending
            document.getElementById("hangmanPic").style.background= "url(img/be.png)";
            document.getElementById("hangmanPic").style.backgroundSize= "contain";
            //set the reset button
            document.getElementById("reset").style.visibility= "visible";
            return;
        }

        //define id represent all divs' ids
        var id = event.target.id;

        //because I use ASCII codes to define virtual keyboard's ids and only they used numbers in this project
        //so if id is a number, it is time to get the linked letter value
        if (!isNaN(id)){
            var letter = document.getElementById(id).innerText;//get the virtual keyboard's enter
            console.log(letter);//check the choice
            //to make sure each letter can only be clicked once
            document.getElementById(id).classList.add("notclick");
            //check, if guess word has the same letter
            if (guess.includes(letter.toLocaleLowerCase())) {
                //travel all the letters to find all the same letter
                var times = 0;//counter how many times the letter appears in the word
                for (var j = 0; j < guess.length; j++) {
                    //find the same letter(s) index
                    if (guess[j] === letter.toLocaleLowerCase()) {
                        empty[j] = guess[j];//change empty space's value
                        document.getElementById("guessWord").innerHTML = empty;//change the content
                        times++;
                    }
                }
                console.log("The letters appears "+times+" time(s)");
                remainingLetters = remainingLetters - times;
                console.log("Remaining letters: "+remainingLetters);//check the letters
            } else {
                wrongAttempts++;//counter the wrong attempts
                //change the background pics in order
                document.getElementById("hangmanPic").style.background= `url(img/${wrongAttempts}.png)`;
                document.getElementById("hangmanPic").style.backgroundSize= "contain";
                console.log("Wrong attempts: "+wrongAttempts);
            }
        }

        //if the user guess all the letters, the game ends with a happy ending
        setTimeout(() => {
            if (remainingLetters === 0) {
                // player wins
                alert("you win!");
                //end the click function
                document.body.onclick = null;
                //change the backgrounds to happy ending
                document.getElementById("hangmanPic").style.background= "url(img/he.png)";
                document.getElementById("hangmanPic").style.backgroundSize= "contain";
                //set the reset button
                document.getElementById("reset").style.visibility= "visible";
                return;
            }
        }, 1);
    }
}

/*-------------------------------game-----------------------------*/
//default setting
var gameHasStarted = false;
setDefault();

//write a random word
const guessWord = randomWord();
console.log(guessWord);//give me a chance to cheat

//measure the random word's length
var length = guessWord.length;

//create a same length array with "_"
const emptySpace = [];
for(var i=0; i<length; i++){//must have same length as the guess word
    emptySpace.push("_");
}
document.getElementById("guessWord").innerHTML = emptySpace;//change the content

//game begins now and try to match the letters
matchLetter(guessWord, emptySpace);