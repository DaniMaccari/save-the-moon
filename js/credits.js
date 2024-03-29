let btnBack;
let dani;
let maggy;
let corvo;
let fadeTween;
let fadeRectangle;

//---------------------------------------------
//--- CREDITS ---------------------------------
//---------------------------------------------

let creditState = { 
    preload: loadCreditAssets,
    create : displayCreditScreen
};

function loadCreditAssets(){
    
        game.load.spritesheet("back","assets/imgs/backSpritesheet.png", 519,519);
        game.load.spritesheet("dani","assets/imgs/CREDITS SCREEN/daniSpritesheet.png", 519,519);
        game.load.spritesheet("maggy","assets/imgs/CREDITS SCREEN/maggySpritesheet.png", 519,519);
        game.load.spritesheet("corvo","assets/imgs/CREDITS SCREEN/corvoSpritesheet.png", 519,519);
        game.load.image("bg","assets/imgs/CREDITS SCREEN/BGcredits.png");
        game.load.image("pantallaNegra","assets/imgs/Solid_black.png")
        game.load.spritesheet("tvAnim","assets/imgs/TVanim.png", 2050,2050);
};
    
function displayCreditScreen(){

    

    game.input.enabled = true;
    BG = game.add.image(0, 0, "bg")
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)


    btnBack = game.add.button(330,450,
    'back', function() {fadeSceneOut("inicio"); },0,1,0,1);
    btnBack.scale.setTo(0.3, 0.3);

    dani = game.add.button(450,250,"dani", danifunction, 0,1,0,1);
    dani.scale.setTo(0.5,0.5);
    
    maggy = game.add.button(285,240,"maggy", maggyfunction, 0,1,0,1);
    maggy.scale.setTo(0.47,0.47);

    corvo = game.add.button(120,250,"corvo", corvofunction, 0,1,0,1);
    corvo.scale.setTo(0.5,0.5);

    TV = game.add.sprite(0,0,"tvAnim")
    TV.scale.setTo(game.width/TV.width, game.height/TV.height)


    createfade();
};

function maggyfunction() {
    window.location.href = "https://twitter.com/moggichita";
}

function danifunction() {

    window.location.href = "https://twitter.com/dani_maccari";
}

function corvofunction() {

    window.location.href = "https://twitter.com/akacorvo_";

}

