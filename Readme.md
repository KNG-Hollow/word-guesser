# Need To Implement

    - ${PROJ_ROOT}/api.json contains the location of a random word generator api. The data String is stored in the "website" Key. The Api responds with a single String value with a length of {6}.

    - ${PROJ_ROOT}/api.json also contains a free dictionary api to use with words that are gathered from the random word generator.
        + WORD MUST BE APPENDED TO "dictionary" API'S URL

    - User has {10} attempts to guess a random number.

    - Each missing letter will be represented with {_}.
    The value will fill in when a letter is correctly guessed.

    - Incorrect guesses will be stored in an array and displayed. Have a component showing progression of game (guesses left, etc.)

    - Give an alert if guess has been already made and have user try again

    - Display fail screen when user fails to guess the word correctly

    - Display victory screen when user has guessed word correctly 
