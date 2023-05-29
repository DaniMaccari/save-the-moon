
let marcadorState = {
    preload: preloadEnding,
    create: createEnding
};

function restartPlay() {
    game.state.start('inicio');
}


function preloadEnding() {

    game.load.image("bg", "assets/imgs/BG.png");
    game.load.image("tv", "assets/imgs/BG-1.png");
}


function createEnding() {
    BG = game.add.image(0, 0, "bg");
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)

    let again = game.add.text(0, -305, "Press 'R' to go back to the beginning.",
    {font:'27px Arial', fill:'#FFFFFF',
     boundsAlignH:'center', boundsAlignV:'bottom'});
    again.setTextBounds(0, game.world.height-80, game.world.width, 40);
        
    let rkey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    rkey.onDown.addOnce(restartPlay, this);

    if(score >= 20)
    {
        let puntacion = game.add.text(0, -500, "You won! You've arrived to: " + score + " in just "+ actualTime +" seconds!!",    
        {font:'27px Arial', fill:'#FFFFFF',
        boundsAlignH:'center', boundsAlignV:'bottom'});
       puntacion.setTextBounds(0, game.world.height-80, game.world.width, 40);
    }

    else
    {
        let puntacion = game.add.text(0, -500, "You lost... You've arrived to: " + score + " in just "+ actualTime +" seconds, try again!",    
        {font:'27px Arial', fill:'#FFFFFF',
        boundsAlignH:'center', boundsAlignV:'bottom'});
       puntacion.setTextBounds(0, game.world.height-80, game.world.width, 40);

    }

    tvForeground = game.add.image(0, 0, "tv")
    tvForeground.scale.setTo(game.width/tvForeground.width, game.height/tvForeground.height)



    startTime = game.time.now;


    
}


