let creditState = { 
    preload: loadAssets,
    create : displayScreen};


let btnBack;
let dani;
let maggy;
let corvo;
let fadeTween;
let fadeRectangle;

function loadAssets(){
    
        game.load.spritesheet("back","assets/imgs/backSpritesheet.png", 519,519);
        game.load.spritesheet("dani","assets/imgs/CREDITS SCREEN/daniSpritesheet.png", 519,519);
        game.load.image("bg","assets/imgs/START SCREEN/BG-MAIN.png");
        game.load.image("pantallaNegra","assets/imgs/Solid_black.png")
        game.load.spritesheet("tvAnim","assets/imgs/TVanim.png", 2050,2050);
};
    
function displayScreen(){

    

    game.input.enabled = true;
    BG = game.add.image(0, 0, "bg")
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)


    btnBack = game.add.button(330,450,
    'back', function() {fadeSceneOut("inicio"); },0,1,0,1);
    btnBack.scale.setTo(0.3, 0.3);

    dani = game.add.button(300,200,"dani", null, 0,1,0,1);
    dani.scale.setTo(0.4,0.4);
    
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
    fadeTween.to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
}

function fadeSceneOut(siguienteEscena) {


    fadeTween = game.add.tween(fadeRectangle)
    fadeTween.to({ alpha: 1 }, 500, Phaser.Easing.Linear.None, true);
    
    fadeTween.onComplete.add(function() {
      game.state.start(siguienteEscena);
    }, this);
  }