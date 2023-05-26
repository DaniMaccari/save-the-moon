
var time, timeText;
let score, scoreText;
let lives, livesText;
let part, levelText;
var level;
var lifeIterator = 1;

function createHUD() {

    let styleHUD = { fontSize: "18px", fill: "#FFFFFF" };

    timeText = game.add.text(50,  20, "Time: ", styleHUD);

    scoreText = game.add.text(50,  game.world.height/15, "Score: " + score, styleHUD);

    levelText = game.add.text(50, game.world.height/10, "Part: " + part +  " Level: " + level , styleHUD);

}

function createLives() {

    lifeGroup = game.add.group();

    const lifesX = 300;
    const lifestY = 730;
    const spacing = 55;

  for (let i = 0; i < lives; i++) {
    const life = lifeGroup.create(lifesX + i * spacing, lifestY, 'lives');

    life.frame = 0; // Set the initial frame of the sprite sheet
    life.anchor.setTo(0.5, 0.5); 
    life.scale.setTo(0.15,0.13);
  }
   

}

function updateLevel() {

    levelText.text = "Part: " + part +  " Level: " + level;
}

function updateScore() {

    scoreText.text = "Score: "+ score;
}


function updateTimer() {
    elapsed = game.time.now - startTime;
    actualTime = Math.floor(elapsed / 1000);
    timeText.text = "Time: " + actualTime; // Display in seconds
    
}

function updateTimerLevelB(timeLevelB) {
    timeLevelB = game.time.now - startTime;
    actualTime = Math.floor(timeLevelB / 1000);
    timeText.text = "Time: " + actualTime; // Display in seconds
    
}

function ganoVida(player, thisItem) {

    var lifeGained;
    thisItem.kill()

    if(lives > 0 && lives < 5) {

        lives ++;

        lifeGained = lifeGroup.getAt(lives-1); 
        lifeGained.frame = 0;
        console.log("life gained "+lives)
    }
}

function reciboDaño()
{
    
    var lifeLost;
    

    if(lives > 0) {

        lives--; 
        lifeLost = lifeGroup.getAt(lives); 

        lifeLost.frame = 1;
        console.log("life lost "+lives)
        
    } else {
        //player.kill();
        
        console.log("He muerto")
    }

   
    

}

