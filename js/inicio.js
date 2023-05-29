let initialState = {
    preload: loadAssets,
    create : displayScreen,
    update: updateGame,
};

let btnStart, btnConf, btnCredits;
let TV, BG;
var musicPlaying = false;
let buttonMusic;

function loadAssets(){
    
    game.load.spritesheet("start","assets/imgs/START SCREEN/Startspritesheet.png", 925,519);
    game.load.spritesheet("conf","assets/imgs/START SCREEN/ConfSpritesheet.png",519,519);
    game.load.spritesheet("credits","assets/imgs/START SCREEN/InfoSpritesheet.png",519,519);
    game.load.image("tele","assets/imgs/BG-1.png");
    game.load.image("bg","assets/imgs/START SCREEN/BG-MAIN.png");
    game.load.image("pantallaNegra","assets/imgs/Solid_black.png")

    game.load.audio("menuMusic","assets/imgs/music/menuMusic.mp3");
    game.load.audio("buttonMusic","assets/imgs/music/ButtonMusic.wav");
}

function displayScreen(){

    
    game.input.enabled = true;
    BG = game.add.image(0, 0, "bg")
    
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)
    

    btnStart = game.add.button(190, 200, "start", onStartButtonPressed, 0, 1, 0, 1)
    btnStart.scale.setTo(0.5, 0.5);

    btnConf = game.add.button(260, 420, "conf", onConfButtonPressed, 0, 1, 0, 1)
    btnConf.scale.setTo(0.22, 0.22);
    
    btnCredits = game.add.button(420, 420, "credits", onCreditsButtonPressed, 0, 1, 0, 1)
    btnCredits.scale.setTo(0.22, 0.22);

    TV = game.add.image(0, 0, "tele")
    TV.scale.setTo(game.width/TV.width, game.height/TV.height)

    createfade();

    if (!musicPlaying) {
        menuMusic = game.sound.add("menuMusic");
        menuMusic.loop = true;
        menuMusic.volume = 0.5;
        menuMusic.play();
        musicPlaying = true;
      }

    buttonMusic = game.sound.add("buttonMusic");
    buttonMusic.volume = 0.7;


    
}


function onStartButtonPressed(){

    buttonMusic.play();
    fadeSceneOut("juego")
 
}

function onConfButtonPressed(){
    
    buttonMusic.play();
    game.state.start("settings");
}

function onCreditsButtonPressed(){

    buttonMusic.play();
    game.state.start("credits");
}

function updateGame() {
    
}