let juegoState = {
     
    preload: loadAssets,
    create : displayScreen
};

let btnLevelA, btnLevelB, btnLevelC;

function loadAssets(){

    game.load.image("levelA", "assets/imgs/start.png");//cambiar la ruta de las imagenes levels A B C
    game.load.image("levelB", "assets/imgs/start.png");//cambiar la ruta de las imagenes levels A B C

    game.load.image("tele","assets/imgs/BG-1.png");
    game.load.image("bg","assets/imgs/START SCREEN/BG-MAIN.png");
    
};

function displayScreen(){
    
    game.input.enabled = true;

    //set bacground
    BG = game.add.image(0, 0, "bg")
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)
    

    btnLevelA = game.add.button(game.world.width / 2, (game.world.height / 6) * 2, 'levelA', onLevelAPressed);
    btnLevelB = game.add.button(game.world.width / 2, (game.world.height / 6) * 3, 'levelB', onLevelBPressed);
    btnLevelC = game.add.button(game.world.width / 2, (game.world.height / 6) * 4, 'levelA', onLevelCPressed);

    //TV layout
    TV = game.add.image(0, 0, "tele")
    TV.scale.setTo(game.width/TV.width, game.height/TV.height)
};

function onLevelAPressed(){
    console.log("level A les GOO")
    game.state.start("levelA");
};
function onLevelBPressed(){
    game.state.start("levelB");
};
function onLevelCPressed(){
    game.state.start("inicio");
};