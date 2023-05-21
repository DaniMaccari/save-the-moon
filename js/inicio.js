let initialState = {
    preload: loadAssets,
    create : displayScreen
};

let btnStart, btnInfo, btnCredits;
let GAP = 120;

function loadAssets(){
    
    game.load.image("start","assets/imgs/start.png");
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

    btnStart = game.add.button(game.world.width / 1.75, game.world.height / 3,
    'start', onStartButtonPressed);
    btnInfo = game.add.button(game.world.width / 1.75, game.world.height / 3 + GAP,
    'info', onInfoButtonPressed);
    btnCredits = game.add.button(game.world.width / 1.75, game.world.height / 3 + 2*GAP,
    'credits', onCreditsButtonPressed);

}


function onStartButtonPressed(){
    console.log("HOLI")
    game.state.start("juego");
}

function onInfoButtonPressed(){
    game.state.start("settings");
}

function onCreditsButtonPressed(){
    game.state.start("credits");
}