
var time, timeText;
let score, scoreText;
let lives, livesText;
let level, levelText;
var lifeIterator = 1;

function createHUD() {

    let styleHUD = { fontSize: "18px", fill: "#FFFFFF" };

    timeText = game.add.text(50,  20, "Time: ", styleHUD);

    scoreText = game.add.text(50,  game.world.height/15, "Score: " + score, styleHUD);

    levelText = game.add.text(50, game.world.height/10, "Level: " + level, styleHUD);

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
   
  console.log("LIFES SPRITES CREATED");

}

function updateScore() {

    scoreText.text = "Score: "+ score;
}


function updateTimer() {
    var elapsed = game.time.now - startTime;
    var actualTime = Math.floor(elapsed / 1000);
    timeText.text = "Time: " + actualTime; // Display in seconds
    
}



function reciboDaño()
{
    
    var lifeLost;
    

    if(lives > 0) {

        lives--; 
        lifeLost = lifeGroup.getAt(lives); //last object of the group

        lifeLost.frame = 1;
        
        
    } else {
        //player.kill();
        
        console.log("He muerto")
    }

    console.log(lives);
    

}

