

$(document).ready(function () {
    //for the timer
    var intervalId;
    //all of these variables are for playing background music
    var mainMusic = document.getElementById('main-music');
    var winningSound = document.getElementById('winning-sound');
    var losingSound = document.getElementById('losing-sound');
    var outOfTime = document.getElementById('out-of-time-sound');
    //sets the source to the sound links
    mainMusic.src = './assets/sounds/main-music.wav';
    winningSound.src = './assets/sounds/winningSound.wav';
    losingSound.src = './assets/sounds/losingSound.wav';
    outOfTime.src = './assets/sounds/out-of-time.mp3';
    //plays the sound if called
    function playOutOfTime() {
        outOfTime.play();
    }
    //plays the sound if called
    function playLosingSound() {
        losingSound.play();
    }
    //plays the sound if called
    function playWinningSound() {
        winningSound.play();
    }
    //plays the sound if called
    function playMainMusic() {
        mainMusic.src = '';
        mainMusic.src = './assets/sounds/main-music.wav';
        mainMusic.play();
    }
    //stops music
    function stopMainMusic() {
        mainMusic.pause();
    }
    //an object that will hold all variables that relate to the game
    var game = {
        start: false,
        time: 30,
        currentAnswer: '',
        queryURL: '',
        randomIndexPlacement: 0,
        currentQuestion: 0,
        numOfCorrect: 0,
        numOfWrong: 0,
        isGameOver: false,
        questionIndex: 0,
        numOfUnanswered: 0,
        //resets the game
        reset: function () {
            game.start = false;
            game.time = 30;
            game.currentAnswer = '';
            game.randomIndexPlacement = 0;
            game.currentQuestion = 0;
            game.numOfCorrect = 0;
            game.numOfWrong = 0;
            game.isGameOver = false;
            game.questionIndex = 0;
            game.numOfUnanswered = 0;
        },
        gameOver: function () {
            //write game over content 
            $('.modal-body').html('<p>GAME OVER!</p>');
            $('.modal-body').append('<p>Total Questions: ' + game.currentQuestion + '</p>');
            $('.modal-body').append('<p>Correct Answers: ' + game.numOfCorrect + '</p>');
            $('.modal-body').append('<p>Incorrect Answers: ' + game.numOfWrong + '</p>');
            $('.modal-body').append('<p>Unanswered: ' + game.numOfUnanswered + '</p>');
            $('.modal').modal('show');
            //I have this so the user can see the modal for 8 seconds, so they have time to see their score
            setTimeout(game.hideModal, 8000);
            //these two lines of code switch the view of what the user sees
            $('.hide-2').css('display', 'none');
            $('.hide-1').css('display', 'block');
            game.reset();
        },
        //hides the modal when called
        hideModal: function () {
            $('.modal').modal('hide');
        },
        startClock: function () {
            intervalId = setInterval(game.decreaseClock, 1000);
        },
        pauseClock: function () {
            clearInterval(intervalId);
        },
        decreaseClock: function () {
            //if time < 0
            if (game.time < 0) {
                $('.modal-body').html('<p>Time\'s up!</p>');
                $('.modal-body').append('<p>The correct answer was ' + game.currentAnswer + '.</p>');
                $('.modal').modal('show');
                stopMainMusic();
                game.pauseClock();
                playOutOfTime();
                game.numOfUnanswered++;
                //pauses the program for the user to see the modal
                setTimeout(function () {
                    game.hideModal();
                    game.callAjax();
                }, 3000);
            }
            else {
                //if remaing time is not zero, display an updated version of the time
                $('#display-time-left').html('Remaining Time: ' + game.time + ' Seconds');
                game.time--;
            }
        },
        startGame: function () {
            //changes the view of the page to the game page
            $('.hide-1').css('display', 'none');
            $('.hide-2').css('display', 'block');
            //calls ajax to get question
            game.callAjax();
        },
        resetClock: function () {
            clearInterval(intervalId);
            game.time = 30;
        },
        callAjax: function () {
            //if we exceed 10 grabbed questions, call game over function
            //i delayed the time for a second, so the user can see if they got their last question right or wrong
            if (game.currentQuestion >= 10) {
                setTimeout(function () {
                    game.gameOver();
                }, 1000);
            }
            else {
                //if we did not exceed 10 grabbed questions, call ajax to get next question, update variables
                $.ajax({
                    url: game.queryURL,
                    method: "GET"
                }).then(function (response) {
                    displayTrivia(response);
                    game.questionIndex++;
                    game.currentQuestion++;
                    game.resetClock();
                    game.startClock();
                    playMainMusic();
                })
            }
        },
    };
    //display what is returned from ajax
    function displayTrivia(r) {
        //arranges the correct answer into a random choice
        game.randomIndexPlacement = Math.floor(Math.random() * 4);
        // a series of these if statements so I can place the correct answer where i need it
        if (game.randomIndexPlacement == 0) {
            game.currentAnswer = r.results[game.questionIndex].correct_answer;
            $('#display-question').html(r.results[game.questionIndex].question);
            $('#choice-1').html(game.currentAnswer)
            $('#choice-2').html(r.results[game.questionIndex].incorrect_answers[0]);
            $('#choice-3').html(r.results[game.questionIndex].incorrect_answers[1]);
            $('#choice-4').html(r.results[game.questionIndex].incorrect_answers[2]);
        }
        if (game.randomIndexPlacement == 1) {
            game.currentAnswer = r.results[game.questionIndex].correct_answer;
            $('#display-question').html(r.results[game.questionIndex].question);
            $('#choice-1').html(r.results[game.questionIndex].incorrect_answers[0])
            $('#choice-2').html(game.currentAnswer);
            $('#choice-3').html(r.results[game.questionIndex].incorrect_answers[1]);
            $('#choice-4').html(r.results[game.questionIndex].incorrect_answers[2]);
        }
        if (game.randomIndexPlacement == 2) {
            game.currentAnswer = r.results[game.questionIndex].correct_answer;
            $('#display-question').html(r.results[game.questionIndex].question);
            $('#choice-1').html(r.results[game.questionIndex].incorrect_answers[0])
            $('#choice-2').html(r.results[game.questionIndex].incorrect_answers[1]);
            $('#choice-3').html(game.currentAnswer);
            $('#choice-4').html(r.results[game.questionIndex].incorrect_answers[2]);
        }
        if (game.randomIndexPlacement == 3) {
            game.currentAnswer = r.results[game.questionIndex].correct_answer;
            $('#display-question').html(r.results[game.questionIndex].question);
            $('#choice-1').html(r.results[game.questionIndex].incorrect_answers[0])
            $('#choice-2').html(r.results[game.questionIndex].incorrect_answers[1]);
            $('#choice-3').html(r.results[game.questionIndex].incorrect_answers[2]);
            $('#choice-4').html(game.currentAnswer);
        }
    }
    $('button').on('click', function () {
        if (this.id == 'Television') {
            $('.you-selected').html("YOU SELECTED: " + $(this).attr('data-value').toUpperCase());
            $('.display-picked').css('visibility', 'visible');
            game.queryURL = 'https://opentdb.com/api.php?amount=10&category=14&type=multiple';
        }
        if (this.id == 'video-games') {
            $('.you-selected').html("YOU SELECTED: " + $(this).attr('data-value').toUpperCase());
            $('.display-picked').css('visibility', 'visible');
            game.queryURL = 'https://opentdb.com/api.php?amount=10&category=15&type=multiple';
        }
        if (this.id == 'Science-Computers') {
            $('.you-selected').html("YOU SELECTED: " + $(this).attr('data-value').toUpperCase());
            $('.display-picked').css('visibility', 'visible');
            game.queryURL = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple';
        }
    })
    $('#start').on('click', function () {
        game.startGame();
    })
    $('.choices-button').on('click', function () {
        // checks if the button that we clicked, matches the correct answer 
        if ($(this).text() == game.currentAnswer) {
            game.numOfCorrect++;
            game.pauseClock();
            $('.modal-body').html('CORRECT');
            $('.modal').modal('show');
            stopMainMusic();
            playWinningSound();
            //so the user can see the modal if they win
            setTimeout(function () {
                game.hideModal();
                game.callAjax();
            }, 3000);
        }
        else {
            game.numOfWrong++;
            game.pauseClock();
            stopMainMusic();
            playLosingSound();
            $('.modal-body').html('WRONG ANSWER!');
            $('.modal-body').append('<p>The correct answer was ' + game.currentAnswer + '.</p>');
            $('.modal').modal('show');
            //so the user can see the modal if they lose
            setTimeout(function () {
                game.hideModal();
                game.callAjax();
            }, 3000);
        }
    })
})