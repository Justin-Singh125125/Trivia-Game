

$(document).ready(function () {
    var intervalId;

    var mainMusic = document.getElementById('main-music');
    var winningSound = document.getElementById('winning-sound');
    var losingSound = document.getElementById('losing-sound');
    mainMusic.src = './assets/sounds/main-music.wav';
    winningSound.src = './assets/sounds/winningSound.wav';
    losingSound.src = './assets/sounds/losingSound.wav';

    function playLosingSound() {
        losingSound.play();
    }
    function playWinningSound() {
        winningSound.play();
    }

    function playMainMusic() {
        mainMusic.src = '';
        mainMusic.src = './assets/sounds/main-music.wav';
        mainMusic.play();
    }
    function stopMainMusic() {
        mainMusic.pause();
    }



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

        },

        gameOver: function () {

            $('.modal-body').html('<p>GAME OVER!</p>');
            $('.modal-body').append('<p>Total Questions: ' + game.currentQuestion + '</p>');
            $('.modal-body').append('<p>Guesse\'s Correct: ' + game.numOfCorrect + '</p>');
            $('.modal-body').append('<p>Guesse\'s Incorrect: ' + game.numOfWrong + '</p>');
            $('.modal').modal('show');
            setTimeout(game.hideModal, 8000);

            $('.hide-2').css('display', 'none');
            $('.hide-1').css('display', 'block');
            game.reset();
        },
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
            //writes to the game page
            if (game.time < 0) {
                $('.modal-body').html('Time\'s up!')
                $('.modal').modal('show');
                stopMainMusic();
                game.pauseClock();
                setTimeout(function () {
                    game.hideModal();
                    game.callAjax();
                }, 3000);
            }
            else {
                $('#display-time-left').html(game.time + ' Seconds');
                game.time--;
            }

        },
        startGame: function () {
            //changes the page to the game page
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
            if (game.currentQuestion >= 10) {
                setTimeout(function () {
                    game.gameOver();
                }, 1000);

            }
            else {
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

    function displayTrivia(r) {
        //will put the correct answer at a random choice
        //this will ensure questions are never the same
        game.randomIndexPlacement = Math.floor(Math.random() * 4);
        console.log(game.questionIndex);
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
            //display that they got the answer correct
            //if it does, we are going to want to reset the clock
            //start the clock
            //grab a new question

            game.numOfCorrect++;
            game.pauseClock();
            $('.modal-body').html('CORRECT');
            $('.modal').modal('show');
            stopMainMusic();
            playWinningSound();
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
            $('.modal').modal('show');
            setTimeout(function () {
                game.hideModal();
                game.callAjax();
            }, 3000);



        }



    })
})