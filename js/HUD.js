
var time, timeText;
let score, scoreText;
let lives, livesText;
let level, levelText;


function createHUD() {

    let styleHUD = { fontSize: "18px", fill: "#FFFFFF" };

    timerText = game.add.text(50,  20, "Time: ", styleHUD);

    scoreText = game.add.text(50,  game.world.height/15, "Score: " + score, styleHUD);

    levelText = game.add.text(50, game.world.height/10, "Level: " + level, styleHUD);

    livesText = game.add.text(50, 100, "Lives: " + lives, styleHUD);

}

function updateScore() {

    scoreText.text = "Score: "+ score;
}


function updateTimer() {
    var elapsed = game.time.now - startTime;
    var actualTime = Math.floor(elapsed / 1000);
    timerText.text = "Time: " + actualTime; // Display in seconds
    
}

function reciboDaño(lives)
{
    if(lives > 1)
    {
        lives-=1;
        
        livesText.text = "Lives: "+ lives;
        console.log("no te pilles baby")
    }

    else
    {
        //player.kill();
        
        console.log("He muerto")
    }

}

function reciboDaño()
{
    if(lives > 1) {
        lives-=1;
        
        livesText.text = "Lives: "+ lives;
        console.log("no te pilles baby")
    } else {
        //player.kill();
        
        console.log("He muerto")
    }

}
