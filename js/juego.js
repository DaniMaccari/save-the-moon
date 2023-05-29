
let btnLevelA, btnLevelB, btnLevelC, BackButton;


let juegoState = {
     
    preload: loadAssets,
    create : displayScreen
};


function loadAssets(){

    game.load.spritesheet("levelA","assets/imgs/partASpritesheet.png", 925,519);
    game.load.spritesheet("levelB", "assets/imgs/partBSpritesheet.png",925,519);
    game.load.spritesheet("levelC", "assets/imgs/partCSpritesheet.png",925,519);
    game.load.spritesheet("back","assets/imgs/backSpritesheet.png", 519,519);
    game.load.image("tele","assets/imgs/BG-1.png");
    game.load.image("bg","assets/imgs/START SCREEN/BG-MAIN.png");
    
};

function displayScreen(){
    
    game.input.enabled = true;

    //set background
    BG = game.add.image(0, 0, "bg")
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)
    
    //Buttons

    BackButton = game.add.button(470,470,"back",onBackPressed,0,1,0,1);
    BackButton.scale.setTo(0.25,0.25);

    btnLevelA = game.add.button(180,200,"levelA",onLevelAPressed,0,1,0,1);
    btnLevelA.scale.setTo(0.3,0.3);

    btnLevelB = game.add.button(400,315,"levelB",onLevelBPressed,0,1,0,1);
    btnLevelB.scale.setTo(0.3,0.3);

    btnLevelC = game.add.button(180,440,"levelC",onLevelCPressed,0,1,0,1);
    btnLevelC.scale.setTo(0.3,0.3);

    //TV layout
    TV = game.add.image(0, 0, "tele")
    TV.scale.setTo(game.width/TV.width, game.height/TV.height)

    createfade();
};

function onBackPressed() {
    buttonMusic.play();
    game.state.start("inicio");
}

function onLevelAPressed(){

    menuMusic.stop();
    game.state.start("levelA");
};

function onLevelBPressed(){

    menuMusic.stop();
    game.state.start("levelB");
};

function onLevelCPressed(){

    menuMusic.stop();
    game.state.start("inicio");
};