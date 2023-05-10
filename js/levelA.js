let levelAState = {
     
    preload: loadAssets,
    create : displayScreen
};

let threadImg;
let line;
const threadPosition = [];

function loadAssets(){

    game.load.image("drawLine", "assets/imgs/line.png");
    game.load.image("levelA", "assets/imgs/start.png");//cambiar la ruta de las imagenes levels A B C
    game.load.image("bg","assets/imgs/bg.jpg");
    line = game.add.sprite(-10,0,"drawLine")
    console.log(line.width)
};

function displayScreen(){

    game.input.enabled = true;
    game.add.image(0,0,"bg");

    score = 0;
    level = 1.0;
    lives = 3;



    let nThreads = 4; //cambiar a un imput pasado desde Juego

    for (let i = 0; i < nThreads; i++){
        
        threadPosition.push( ( ( game.world.width / (nThreads + 1) ) * (i+1)) - (line.width /4));
        game.add.image(threadPosition[i], 0, "drawLine");
    }

    
};

