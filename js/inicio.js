let initialState = {
    preload: loadAssets,
    create : displayScreen,
    update: updateGame,
};

let btnStart, btnInfo, btnCredits;
let GAP = 120;
let TV, BG;

function loadAssets(){
    
    game.load.spritesheet("start","assets/imgs/START SCREEN/Startspritesheet.png", {frameWidth:925, frameHeight:519});
    game.load.image("info","assets/imgs/info.png");
    game.load.image("credits","assets/imgs/credits.png");
    game.load.image("tele","assets/imgs/BG-1.png");
    game.load.image("bg","assets/imgs/BG.png");
}

function displayScreen(){

    
    game.input.enabled = true;
    BG = game.add.image(0,0,"bg")
    TV = game.add.image(0,0,"tele")
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)
    TV.scale.setTo(game.width/TV.width, game.height/TV.height)

    btnStart = game.add.sprite(200, 200,
    'start',1);

   
    // btnStart.scale.setTo(0.5, 0.5);

    btnInfo = game.add.button(game.world.width / 1.75, game.world.height / 3 + GAP,
    'info', onInfoButtonPressed);
    btnCredits = game.add.button(game.world.width / 1.75, game.world.height / 3 + 2*GAP,
    'credits', onCreditsButtonPressed);

   

}


function onStartButtonPressed(){
    game.state.start("juego");
 
}

function onInfoButtonPressed(){
    game.state.start("settings");
}

function onCreditsButtonPressed(){
    game.state.start("credits");
}

function updateGame() {
    
}