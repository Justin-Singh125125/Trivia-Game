

$(document).ready(function () {

    var game = {
        start: false,
        interval: 0,
        time: 5,
    };

    function callAjaxTelevision() {
        var queryURL = ' https://opentdb.com/api.php?amount=5&category=14&type=multiple';
        //create an ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
        })
    }

    function callAjaxVideoGames() {
        var queryURL = 'https://opentdb.com/api.php?amount=5&category=15&type=multiple';
        //create an ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
        })
    }

    function callAjaxComputers() {
        var queryURL = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple';
        //create an ajax call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            console.log(response);
        })
    }


    $('button').on('click', function () {

        if (this.id == 'Television') {
            $('.you-selected').html("YOU SELECTED: " + $(this).attr('data-value').toUpperCase());
            $('.display-picked').css('visibility', 'visible');

        }

    })




    function startClock() {
        interval = setInterval(decreaseClock, 1000);
    }
    function decreaseClock() {

        $('.test').html(game.time);
        game.time--;
    }
    function startGame() {
        startClock();
    }

    $(document).on('click', '#start', startGame());




})


