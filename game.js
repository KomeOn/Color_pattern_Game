$(document).ready(()=>{
    var buttonColors = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var level = 0;
    var title = $("#level-title");
    var flag = false;
    var clicks = $(".btn");
    $(document).keypress(function(){
        if(!flag){
            title.text("Level "+level);
            nextSequence();
    		flag = true;
        }
    })
    clicks.click(function() {
        var userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        animatePress(userChosenColor);
        playSound(userChosenColor);
        checkAnswer(userClickedPattern.length-1);
    });
    function nextSequence(){
        userClickedPattern = [];
        level = level +1;
        title.text("Level "+level);
        var randomNumber = Math.random();
        randomNumber = randomNumber * 4 ;
        randomNumber = Math.floor(randomNumber);
        var randomChosenColor = buttonColors[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColor);
    }
    function playSound(name) {
        var audio = new Audio("sounds/" + name + ".mp3");
	    audio.play();
    }
    function animatePress(currentColor){
        var delayInMilliseconds = 100; 
        $("#" + currentColor).addClass("pressed");
        setTimeout(function() {
            $("#" + currentColor).removeClass("pressed");
        }, delayInMilliseconds);
    }
    function checkAnswer(currentLevel){
        var delayInMilliseconds = 100; 
        if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
            if(userClickedPattern.length === gamePattern.length){
                setTimeout(function() {
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
            title.text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }
    function startOver(){
        level = 0;
        gamePattern = [];
        flag = false;
    }
})