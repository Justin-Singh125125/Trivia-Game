

$(document).ready(function () {




    var game = {
        timeClock: 30,
        clockInterval: 0,
        isClockRunning: false,
        twoDArray: [
            //Brian
            ['Who ruined Adam West\'s pizza in the episode where West and Meg have an affair?', 'Stewie', 'Meg', 'Brian', 'Noid'],
            //McBrien
            ['Once Peter met his irish father. He had a sheep. His name was?', 'O\'Brien', 'McBrien', 'O\'Brian', 'McBrian'],
            //they forgot
            ['Why did the chicken man and Peter stopped fighting for a while?', 'Because they didn\'t remember why they were fighting', 'Because they got tired of fighting each other', 'Peter killed the chicken man', 'They made peace with eachother'],
            //megs butt
            ['In the episode of "Petergeist", What was the only exit from the ghost world?', 'Meg\'s mouth', 'The toilet', 'Meg\s butt', 'The Tv in the bedroom'],
            //wasnt any towels in the house
            ['Why did Lois go mad on the episode "A Very Special Family Guy Freakin\' Christmas"', 'The turkey was burnt', 'There wasn\'t any towels in the house', 'The house burned down', 'Peter gave the family\'s present to charity'],
            //grabbed the minigun
            ['How did Stewie apparently kill Lois, on the episode "Lois is dead" part 1?', 'Shot her with a minigun', 'Burned her alive with a flamethrower', 'Shot her with a harpoon', 'Stabbed her with a knife'],
            ['Why did Peter get angry at Lois on the episode "Brian and Stewie Griffin in: Europe?"', 'She didn\'t know the last line of "Rock and Roll all Nite"', 'She wans\'t a KISS fan', 'She didn\'t let Petter watch "A Christmas with KISS"', 'She forgot to make him breakfast'],
        ],



        displayAllQuestions: function () {
            for (var row = 0; row < game.twoDArray.length; row++) {
                for (var col = 0; col < game.twoDArray[row].length; col++) {
                    console.log(game.twoDArray[row][col]);
                }
            }
        },
        displayRandomQuestion: function () {
            var random1 = Math.floor(Math.random() * game.twoDArray.length);
            console.log(game.twoDArray[random1][0]);
            console.log(game.twoDArray[random1][1]);
            console.log(game.twoDArray[random1][2]);
            console.log(game.twoDArray[random1][3]);
            console.log(game.twoDArray[random1][4]);
        },

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


    game.displayRandomQuestion();
    //if the button is pressed 
    $('#start-game').on('click', function () {
        //starts the countdown for the game
        console.log('test');
        game.startClock();
    })
})
