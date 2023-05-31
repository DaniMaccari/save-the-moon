//---------------------------------------------
//--- END SCREEN ------------------------------
//---------------------------------------------

let endScreenState = {
    preload: preloadEnding,
    create: createEnding,
    update: updateEnding
};

function restartPlay() {
    fadeSceneOutBetweenScenes("levelA");
}

function correElTiempo(){

    elapsed = game.time.now - startTime;
    actualTime = Math.floor(elapsed / 1000);    
}

function preloadEnding() {

    game.load.image("bg", "assets/imgs/START SCREEN/BG-MAIN.png");
    game.load.image("tv", "assets/imgs/BG-1.png");
}


function createEnding() {
    BG = game.add.image(0, 0, "bg");
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)

    let again = game.add.text(0, -315, "Press 'ENTER' to restart at level A.",
    {font:'27px Alkatra', fill:'#FFFFFF',
     boundsAlignH:'center', boundsAlignV:'bottom'});
    again.setTextBounds(0, game.world.height-80, game.world.width, 40);
        
    let enterkey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    enterkey.onDown.addOnce(restartPlay, this);

    let finalTime = game.add.text(
        game.world.centerX, // X position in the center of the game world
        300, // Y position in the center of the game world
        "time is A: " + timerA + " time in B: " + timerB + " time in C: " + timerC,
        {
          font: '25px Alkatra',
          fill: '#FFFFFF',
          boundsAlignH: 'center',
          boundsAlignV: 'bottom'
        }
      );
      finalTime.anchor.setTo(0.5, 0.5);

    if(!gameFinished)
    {
        let puntacion = game.add.text(0, -370, "you managed to survive a total of \n" + generalTime + " seconds, try again!",    
        {font:'25px Alkatra', fill:'#FFFFFF',
        boundsAlignH:'center', boundsAlignV:'bottom'});
       puntacion.setTextBounds(0, game.world.height-80, game.world.width, 40);
    }

    else
    {
        
        let puntacion = game.add.text(0, -370, "CONGRATULATIONS, you completed the game \n in " + generalTime + " seconds, want to play again?",    
        {font:'25px Alkatra', fill:'#FFFFFF',
        boundsAlignH:'center', boundsAlignV:'bottom'});
       puntacion.setTextBounds(0, game.world.height-80, game.world.width, 40);

    }

    //Back button
    backButton = game.add.button(340, 510, "back", function() {fadeSceneOut("inicio"); },0,1,0,1);
    backButton.scale.setTo(0.25, 0.25);

    tvForeground = game.add.image(0, 0, "tv")
    tvForeground.scale.setTo(game.width/tvForeground.width, game.height/tvForeground.height)


    startTime = game.time.now;

}

function updateEnding()
{
    updateTimer();

    
    if(actualTime >= 20)
    {
        fadeSceneOutBetweenScenes("inicio");
    }
}
