let juegoState = {
     
    preload: loadAssets,
    create : displayScreen
};

let btnLevelA, btnLevelB, btnLevelC

function loadAssets(){

    game.load.image("levelA", "assets/imgs/start.png");//cambiar la ruta de las imagenes levels A B C
    game.load.image("levelB", "assets/imgs/start.png");
    game.load.image("levelC", "assets/imgs/start.png");
    game.load.image("bg","assets/imgs/bg.jpg");
    
};

function displayScreen(){

    game.input.enabled = true;
    game.add.image(0,0,"bg");

    btnLevelA = game.add.button(game.world.width / 2, (game.world.height / 6) * 2, 'levelA', onLevelAPressed);
    btnLevelB = game.add.button(game.world.width / 2, (game.world.height / 6) * 3, 'levelB', onLevelBPressed);
    btnLevelC = game.add.button(game.world.width / 2, (game.world.height / 6) * 4, 'levelC', onLevelCPressed);

    function onLevelAPressed(){
        game.state.start("inicio");
    };
    function onLevelBPressed(){
        game.state.start("inicio");
    };
    function onLevelCPressed(){
        game.state.start("inicio");
    };


}