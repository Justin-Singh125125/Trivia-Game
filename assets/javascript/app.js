

$(document).ready(function () {
    var intervalId;

    var game = {
        start: false,
        time: 5,
        isTeleClicked: false,
        currentAnswer: '',
        queryURL: '',
        randomIndexPlacement: 0,
        currentQuestion: 0,
        numOfCorrect: 0,
        numOfWrong: 0,
        isGameOver: false,

        reset: function () {
            console.log('inside reset');
            game.start = false;
            game.time = 5;
            game.isTeleClicked = false;
            game.currentAnswer = '';
            game.randomIndexPlacement = 0;
            game.currentQuestion = 0;
            game.numOfCorrect = 0;
            game.numOfWrong = 0;
            game.isGameOver = false;
            game.reset();

        },
        hideModal: function () {
            $('.modal').modal('hide');
            $('.hide-2').css('display', 'none');
            $('.hide-1').css('display', 'block');

        },
        startClock: function () {
            if (game.isGameOver) {
                game.pauseClock();
                game.resetClock();
                $('.modal').modal('show');
                $('.modal-body').html('GAME-OVER');
                setTimeout(game.hideModal, 3000);



            }
            else {
                game.callAjax();
                intervalId = setInterval(game.decreaseClock, 1000);
            }



        },
        pauseClock: function () {
            clearInterval(intervalId);
        },

        decreaseClock: function () {
            //writes to the game page

            $('#display-time-left').html(game.time + ' Seconds');
            game.time--;
        },
        startGame: function () {
            //could use this for something later
            console.log(game.isTeleClicked);
            //if one of the categories was clicked, load the correct AJAX
            if (game.isTeleClicked) {
                game.startClock();
                game.isGameOver = false;
            }

        },
        resetClock: function () {
            clearInterval(intervalId);
            game.time = 5;
        },

        callAjax: function () {
            if (game.currentQuestion >= 2) {
                game.isGameOver = true;
                //we call this function right away so we can stop the program
                game.startClock();
            }
            $.ajax({
                url: game.queryURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                DisplayTrivia(response);
                game.currentQuestion++;
            })

        },


    };

    function DisplayTrivia(r) {
        //will put the correct answer at a random choice
        //this will ensure questions are never the same
        game.randomIndexPlacement = Math.floor(Math.random() * 4);

        if (game.randomIndexPlacement == 0) {

            game.currentAnswer = r.results[0].correct_answer;

            $('#display-question').html(r.results[0].question);
            $('#choice-1').html(game.currentAnswer)
            $('#choice-2').html(r.results[0].incorrect_answers[0]);
            $('#choice-3').html(r.results[0].incorrect_answers[1]);
            $('#choice-4').html(r.results[0].incorrect_answers[2]);
        }
        if (game.randomIndexPlacement == 1) {

            game.currentAnswer = r.results[0].correct_answer;
            $('#display-question').html(r.results[0].question);
            $('#choice-1').html(r.results[0].incorrect_answers[0])
            $('#choice-2').html(game.currentAnswer);
            $('#choice-3').html(r.results[0].incorrect_answers[1]);
            $('#choice-4').html(r.results[0].incorrect_answers[2]);
        }
        if (game.randomIndexPlacement == 2) {

            game.currentAnswer = r.results[0].correct_answer;
            $('#display-question').html(r.results[0].question);
            $('#choice-1').html(r.results[0].incorrect_answers[0])
            $('#choice-2').html(r.results[0].incorrect_answers[1]);
            $('#choice-3').html(game.currentAnswer);
            $('#choice-4').html(r.results[0].incorrect_answers[2]);
        }
        if (game.randomIndexPlacement == 3) {
            game.currentAnswer = r.results[0].correct_answer;
            $('#display-question').html(r.results[0].question);
            $('#choice-1').html(r.results[0].incorrect_answers[0])
            $('#choice-2').html(r.results[0].incorrect_answers[1]);
            $('#choice-3').html(r.results[0].incorrect_answers[2]);
            $('#choice-4').html(game.currentAnswer);
        }

    }

    $('button').on('click', function () {

        if (this.id == 'Television') {
            $('.you-selected').html("YOU SELECTED: " + $(this).attr('data-value').toUpperCase());
            $('.display-picked').css('visibility', 'visible');
            game.queryURL = 'https://opentdb.com/api.php?amount=10&category=14&type=multiple';
            game.isTeleClicked = true;
        }
        if (this.id == 'video-games') {
            $('.you-selected').html("YOU SELECTED: " + $(this).attr('data-value').toUpperCase());
            $('.display-picked').css('visibility', 'visible');
            game.isTeleClicked = true;
            game.queryURL = 'https://opentdb.com/api.php?amount=10&category=15&type=multiple';
        }
        if (this.id == 'Science-Computers') {
            $('.you-selected').html("YOU SELECTED: " + $(this).attr('data-value').toUpperCase());
            $('.display-picked').css('visibility', 'visible');
            game.isTeleClicked = true;
            game.queryURL = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple';
        }
    })

    $('#start').on('click', function () {
        $('.hide-1').css('display', 'none');
        $('.hide-2').css('display', 'block');
        game.startGame();
    })


    $('.choices-button').on('click', function () {
        // checks if the button that we clicked, matches the correct answer 
        if ($(this).text() == game.currentAnswer) {
            //display that they got the answer correct
            //if it does, we are going to want to reset the clock
            //start the clock
            //grab a new question

            console.log(game.currentQuestion);
            game.numOfCorrect++;
            $('.modal-body').html('CORRECT');
            game.pauseClock();
            $('.modal').modal('show');

            setTimeout(function () {
                $('.modal').modal('hide');
                game.pauseClock();
                game.resetClock();
                game.startClock();
            }, 2000);






        }



    })
})