let levelAState = {
     
    preload: loadAssets,
    create : displayScreen
};

let threadImg;

const threadPosition = [];

function loadAssets(){

    game.load.image("drawLine", "assets/img/line.png")
    game.load.image("levelA", "assets/imgs/start.png");//cambiar la ruta de las imagenes levels A B C
    game.load.image("bg","assets/imgs/bg.jpg");
    
};

function displayScreen(){

    game.input.enabled = true;
    game.add.image(0,0,"bg");

    let nThreads = 4; //cambiar a un imput pasado desde Juego

    for (let i = 0; i < nThreads; i++){
        threadPosition.push( ( game.world.width / (nThreads + 1) ) * i);
        game.add.image(threadPosition[i], game.world.height, "drawLine");
    }
};

