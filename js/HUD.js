
var actualTime;
var elapsed;

var time, timeText;
let score, scoreText;
let lives, livesText;
let part, levelText;
var level;
var lifeIterator = 1;
var textCreated = false;
var text2Created = false;

function createHUD() {


    let styleHUD = {font: "Alkatra", fontSize: "18px", fill: "#FFFFFF" };

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


function ganoVida(player, thisItem) {

    itemSound.play();
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
        tocadoSound.play();
        console.log("life lost "+lives)
        
    } if(lives==0) {
        //player.kill();
        switch ( part ){
            case "A":
                timerA = actualTime
                break
            case "B":
                timerB = actualTime
                break
            case "C":
                timerC = actualTime
                break
            default:
                generalTime = actualTime
                break
        }

        generalTime += actualTime

        fadeSceneOutBetweenScenes("endScreen")
        console.log("He muerto")
    }

}

function notBombAvailable() {

    if (textCreated==false) {   
        
        textCreated = true;
        var text = game.add.text(game.world.centerX, game.world.centerY, 'NO BOMB', {
            font: '32px Arial',
            fill: '#ffffff'
        });

      text.anchor.setTo(0.5);

      //desaparece a los 2 segundos
      
      var delay = 2000; 

      game.time.events.add(delay, function() {
        text.destroy(); 
        textCreated = false;
      }, this);

    }
      
      
}


function BombAvailable() {

    if (text2Created==false) {   
        
        text2Created = true;
        var text = game.add.text(game.world.centerX, game.world.centerY, "PRESS E TO THROW THE BOMB", {
            font: '32px Arial',
            fill: '#ffffff'
        });

      text.anchor.setTo(0.5);

      //desaparece a los 2 segundos
      
      var delay = 2000; 

      game.time.events.add(delay, function() {
        text.destroy(); 
        text2Created = false;
      }, this);

    }
      
      
}


