$(document).ready(function () {
    var intervalId;

    var game = {
        start: false,
        time: 5,
        isTeleClicked: false,


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

                game.callAjaxTelevision();
            }
            game.startClock();
        },

        callAjaxTelevision: function () {
            var queryURL = 'https://opentdb.com/api.php?amount=10&category=14&type=multiple';
            //create an ajax call
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (response) {

                console.log(response);
            })
        },
    };





    // function callAjaxVideoGames() {
    //     var queryURL = 'https://opentdb.com/api.php?amount=5&category=15&type=multiple';
    //     //create an ajax call
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function (response) {

    //         console.log(response);
    //     })
    // }

    // function callAjaxComputers() {
    //     var queryURL = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple';
    //     //create an ajax call
    //     $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     }).then(function (response) {

    //         console.log(response);
    //     })
    // }

})