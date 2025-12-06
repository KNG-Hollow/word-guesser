const wordLengthDisplay = document.querySelector("#word-length");
const guessesDisplay = document.querySelector("#lives");
const guessedLettersDisplay = document.querySelector("#letters-guessed");
const sequenceImageDisplay = document.querySelector("#guess-image");
const wordToGuessDisplay = document.querySelector("#word-to-guess");
const hintDisplay = document.querySelector("#word-hint");

let wordLength = 6;
wordLengthDisplay.textContent = wordLength;
let lives = 10;
guessesDisplay.textContent = lives;
let guessedLettersSet = new Set();

function getImagePathArray(imageName) {
    let imageArray = [];
    for (let i = 0; i < lives; i++) {
        imageArray.push(`assets/${imageName}${i + 1}.png`);
    }
    console.log("Length of Image Array: ", imageArray.length);
    return imageArray;
}   

function getWord() {
    return fetch("https://random-word-api.herokuapp.com/word?length=6")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Network response was not ok!!");
            }
            return response.json();
        })
        .then((data) => {
            console.log(`Received This String From The Random Word API: ${data}`);
            return data[0];
        })
        .catch((error) => {
            console.error("There has been a problem with your fetch operation:", error);
    });
}

function getHint(word) {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
        .then((response) => {
            if (response.status === 404) {
                hintDisplay.textContent = "Word not found in dictionary :( ...\nPlease Reload The Page.";
                throw new Error("Word not found in dictionary :( ...\nPlease Reload The Page.");
            }
            if (!response.ok) {
                throw new Error("Network response was not ok!!");
            }
            return response.json();
        })
        .then((data) => {
            console.log("Received This String From The Dictionary API: ", data[0].meanings[0].definitions[0].definition);
            return data[0].meanings[0].definitions[0].definition;
        })
        .catch((error) => {
            console.error("There has been a problem with your fetch operation:", error);
    });
}

function updateSequenceImage() {
    sequenceImageDisplay.src = imageArray[sequence - 1];
    sequenceImageDisplay.alt = `Word Guesser Image :: Sequence Number: ${sequence}`;
}

function updateGuessDisplay(substring) {
    // TODO: Update the displayed word with correct guesses

}

function startRound() {
    const input = document.querySelector("#input-area");
    try {
        if (gameOver) {
            alert("Game Over! Please Reload The Page To Play Again.");
            throw new Error("Game Over! Please Reload The Page To Play Again.");
        }
        if (!input.value) {
            throw new Error("No Input Given!");
        }
        if (guessedLettersSet.has(input.value.toLowerCase())) {
            throw new Error("Letter Already Guessed!");
        }

        const guess = input.value.toLowerCase();
        console.log(`Player Guessed The Letter: ${guess}`);
        guessedLettersSet.add(guess.toUpperCase());
        guessedLettersDisplay.textContent = Array.from(guessedLettersSet).join(", ");

        if (!wordToGuess.includes(guess)) {
            console.log("Incorrect Guess!");
            lives--;
            sequence++;
            guessesDisplay.textContent = lives;

            if (lives === 0) {
                gameOver = true;
                console.log("Game Over! You've run out of lives.");
                alert(`Game Over! The correct word was: ${wordToGuess.toUpperCase()}`);
            }
        } else {
            console.log("Correct Guess!");
            // TODO: Update the displayed word with correct guesses
            wordToGuessDisplay.textContent.replace("_", guess).at(wordToGuess.indexOf(guess));
        }

        round++;
        input.value = "";

        updateSequenceImage();
    } catch (error) {
        console.error("Error In startRound() Function: ", error);
    }
}

// GAME LOGIC STARTS HERE

let round = 1;
let sequence = 1;
let gameOver = false;
let wordToGuess = "";

getWord().then((word) => {
    console.log("The Word To Guess Is: ", word);
    wordToGuess = word;

    return getHint(word).then((hint) => {
        hintDisplay.textContent = hint;
    });
}).catch((error) => {
    console.error("Error getting the word or hint: ", error);
});

const imageArray = getImagePathArray("hangman");
updateSequenceImage();

const submitButton = document.querySelector("#input-button");
submitButton.addEventListener("click", () => {
    console.log("Submit Button Clicked");
    startRound();
});

/*
while (gameOver === false) {

}
*/

