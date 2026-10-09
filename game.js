$(document).ready(() => {
    var buttonColors = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var level = 0;
    var title = $("#level-title");
    var flag = false;
    var acceptingInput = false;
    var clicks = $(".btn");
        function startGame() {
        if (!flag) {
            title.text("Level " + level);
            nextSequence();
            flag = true;
        }
        }
        $(document).on("keydown click", startGame);
    clicks.click(function () {
        if (!acceptingInput) {
            return;
        }
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
    function nextSequence() {
        acceptingInput = false;
        userClickedPattern = [];
        level = level + 1;
        title.text("Level " + level);
        var randomNumber = Math.random();
        randomNumber = randomNumber * 4;
        randomNumber = Math.floor(randomNumber);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100).promise().done(function () {
            acceptingInput = true;
        });
        playSound(randomChosenColor);
    }
    function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
        audio.play();
    }
    function animatePress(currentColor) {
        var delayInMilliseconds = 100;
        $("#" + currentColor).addClass("pressed");
        setTimeout(function () {
            $("#" + currentColor).removeClass("pressed");
        }, delayInMilliseconds);
    }
    function checkAnswer(currentLevel) {
        var delayInMilliseconds = 100;
        if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
            if (userClickedPattern.length === gamePattern.length) {
                acceptingInput = false;
                setTimeout(function () {
                    nextSequence();
                }, delayInMilliseconds);
            }
        }
        else {
            $("body").addClass("game-over");
            $("body").removeClass("bg-primary");
            setTimeout(function () {
                $("body").removeClass("game-over");
                $("body").addClass("bg-primary");
            }, 200);
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
                title.text("Game Over, Press Any Key or Tap to Restart");
            startOver();
        }
    }
    function startOver() {
        acceptingInput = false;
        level = 0;
        gamePattern = [];
        flag = false;
    }
})