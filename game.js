$(document).ready(()=>{
    var buttonColors = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var level = 0;
    var title = $("#level-title");
    var flag = false;
    var clicks = $(".btn");
    const fs = require('fs');
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
            writeRecord(currentLevel);
            title.text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }
    function startOver(){
        level = 0;
        gamePattern = [];
        flag = false;
    }
    function writeRecord(correctSeq){
        let player_name = prompt("Please enter your name");
        let current_datetime = new Date();
        let score = (level-1)*100+correctSeq*10;
        let data = {
            name: player_name,
            lvl: level,
            score: score
        };
        let record = JSON.stringify(data, null, 2)
        let fname = player_name + current_datetime + ".txt"; 
        fs.writeFile("records/" + fname, record,
            (err)=> {
                if (err) throw err;
                console.log("Data saved");
            })
    }
})