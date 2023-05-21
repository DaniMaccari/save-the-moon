let creditState = { 
    preload: loadAssets,
    create : displayScreen};


let btnBack;
let fadeTween;
let fadeRectangle;

function loadAssets(){
    
        game.load.image("start","assets/imgs/start.png");
        game.load.image("bg","assets/imgs/BG.png");
        game.load.image("pantallaNegra","assets/imgs/Solid_black.png")
        game.load.spritesheet("tvAnim","assets/imgs/TVanim.png", 2050,2050);
};
    
function displayScreen(){

    

    game.input.enabled = true;
    BG = game.add.image(0, 0, "bg")
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)


    btnBack = game.add.button(game.world.width / 2.75, game.world.height / 3 + 240,
    'start', function() {fadeSceneOut("inicio"); });

    
    
    TV = game.add.sprite(0,0,"tvAnim")
    TV.scale.setTo(game.width/TV.width, game.height/TV.height)
    TV.animations.add("TVanimation", [0, 1, 2], 15, true)
    TV.animations.play("TVanimation")

    fadeRectangle = game.add.sprite(0,0, "pantallaNegra");
    fadeRectangle.width = game.width;
    fadeRectangle.height = game.height;
    fadeRectangle.alpha = 1;

    fadeSceneIn();
};

function fadeSceneIn() {
    fadeTween = game.add.tween(fadeRectangle)
    fadeTween.to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
}

function fadeSceneOut(siguienteEscena) {


    fadeTween = game.add.tween(fadeRectangle)
    //fadeTween.from({alpha:0});
    fadeTween.to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true);
    //fadeTween.start();
    
    fadeTween.onComplete.add(function() {
      game.state.start(siguienteEscena);
    }, this);
  }