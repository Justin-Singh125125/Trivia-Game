

$(document).ready(function () {
    var game = {
        timeClock: 30,
        clockInterval: 0,
        isClockRunning: false,

        startClock: function () {
            //decreases clock every second
            this.clockInterval = setInterval(game.decreaseClock, 1000);
        },

        decreaseClock: function () {
            if (game.timeClock < 0) {

                //were going get the next question
                game.resetClock();
                game.stopClock();

            }
            else {
                //diplays the time
                $('#display').html(game.timeClock);
                game.timeClock--;
            }

        },
        resetClock: function () {
            clearInterval(game.clockInterval);
        },

        stopClock: function () {
            game.pauseClock();
        },
        pauseClock: function () {
            clearInterval(game.clockInterval);
        },
        resetClock: function () {
            game.timeClock = 30;
        },

        generateRandomQ(index) {
            Questions[index]

        }
    }

    var Questions = [

        //question 1 
        {
            question: '',
            choice1: '',


        },

        {

        },

        {

        },

        {

        },

        {

        },
        {

        },


    ]


    //if the button is pressed 
    $('#start-game').on('click', function () {
        //starts the countdown for the game
        console.log('test');
        game.startClock();
    })
})
