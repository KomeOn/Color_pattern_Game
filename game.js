$(document).ready(()=>{
    var buttonColors = ["red", "blue", "green", "yellow"];
    var gamePattern = [];
    var userClickedPattern = [];
    var level = 0;
    var title = $("#level-title");
    var flag = false;
    var clicks = $(".btn");
    display();
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
            writeRecord(currentLevel);
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
        let score = (level-1)*100+correctSeq*10;
        let record = {
            name: player_name,
            lvl: level,
            score: score
        };
        if (localStorage.getItem("score")){
            let data = JSON.parse(localStorage.getItem("score"));
            data.push(record);
            let newData = JSON.stringify(data);
            localStorage.setItem("score", newData);
        } 
        else {
            let data = [];
            data.push(record);
            data = JSON.stringify(data); 
            localStorage.setItem("score", data);
        }
    }
    function display(){
        let div = $(".records");
        let data = JSON.parse(localStorage.getItem("score"));
        console.log(data);
        if (data == null )
        {
            var p = $('<p style="text-align:center; font-size:20px; font-weight: bold"> </p>').text("No records");
            div.append(p);
        }
        else {
            let table = $("<table></table>").css({'width': '50%', 'border-collapse': 'collapse',
                'margin': '15px auto', 'font-family': 'Arial, sans-serif'});
            let headRow = $("<tr></tr>");
            headRow.append("<th> Name </th>").css({'background-color': '#4CAF50', 'color': 'white',
                'text-align': 'center', 'padding': '10px'});;
            headRow.append("<th> Level </th>").css({'background-color': '#4CAF50', 'color': 'white',
                'text-align': 'center', 'padding': '10px'});;
            headRow.append("<th> Score </th>").css({'background-color': '#4CAF50', 'color': 'white',
                'text-align': 'center', 'padding': '10px'});;
            table.append(headRow);
            for(let i = 0; i < data.length; i = i+1){
                // console.log("name: ", data[i].name, " level: ", data[i].lvl, " score: ", data[i].score);
                let row = $("<tr></tr>");
                row.append("<td>" + data[i].name + "</td>").css({'border': '1px solid #ddd','padding': '10px','text-align': 'center'});;
                row.append("<td>" + data[i].lvl + "</td>").css({'border': '1px solid #ddd','padding': '10px','text-align': 'center'});;
                row.append("<td>" + data[i].score + "</td>").css({'border': '1px solid #ddd','padding': '10px','text-align': 'center'});;
                table.append(row);
            }
            div.append(table);

        }
    }
})