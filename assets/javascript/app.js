

$(document).ready(function () {
    var intervalId;

    var game = {
        start: false,
        time: 5,
        isTeleClicked: false,
        currentAnswer: '',
        queryURL: '',
        randomIndexPlacement: '',


        startClock: function () {

            intervalId = setInterval(game.decreaseClock, 1000);
        },

        decreaseClock: function () {
            //writes to the game page
            $('#display-time-left').html(game.time + ' Seconds');
            game.time--;
        },
        startGame: function () {
            //could use this for something later
            console.log(game.isTeleClicked);
            if (game.isTeleClicked) {

                game.callAjax();
            }
            game.startClock();
        },

        callAjax: function () {

            $.ajax({
                url: game.queryURL,
                method: "GET"
            }).then(function (response) {

                console.log(response);
                DisplayTrivia(response);

            })
        },

    };

    function DisplayTrivia(r) {
        //will put the correct answer at a random choice
        game.randomIndexPlacement = Math.floor(Math.random() * 4);

        if (game.randomIndexPlacement == 0) {

            game.currentAnswer = r.results[0].correct_answer;

            $('#display-question').html(r.results[0].question);
            $('#choice-1').append(r.results[0].correct_answer)
            $('#choice-2').append(r.results[0].incorrect_answers[1]);
            $('#choice-3').append(r.results[0].incorrect_answers[2]);
            $('#choice-4').append(r.results[0].incorrect_answers[2]);
        }
        if (game.randomIndexPlacement == 1) {
            game.currentAnswer = r.results[0].correct_answer;
            $('#display-question').html(r.results[0].question);
            $('#choice-1').append(r.results[0].incorrect_answers[0])
            $('#choice-2').append(r.results[0].correct_answer);
            $('#choice-3').append(r.results[0].incorrect_answers[2]);
            $('#choice-4').append(r.results[0].incorrect_answers[2]);
        }
        if (game.randomIndexPlacement == 2) {

            game.currentAnswer = r.results[0].correct_answer;
            $('#display-question').html(r.results[0].question);
            $('#choice-1').append(r.results[0].incorrect_answers[0])
            $('#choice-2').append(r.results[0].incorrect_answers[0]);
            $('#choice-3').append(r.results[0].correct_answer);
            $('#choice-4').append(r.results[0].incorrect_answers[2]);
        }
        if (game.randomIndexPlacement == 3) {
            game.currentAnswer = r.results[0].correct_answer;
            $('#display-question').html(r.results[0].question);
            $('#choice-1').append(r.results[0].incorrect_answers[0])
            $('#choice-2').append(r.results[0].incorrect_answers[0]);
            $('#choice-3').append(r.results[0].incorrect_answers[0]);
            $('#choice-4').append(r.results[0].correct_answer);
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
            game.queryURL = 'https://opentdb.com/api.php?amount=5&category=15&type=multiple';
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
        if ($(this).text() == game.currentAnswer) {
            alert('That right!');
        }
    })












})


