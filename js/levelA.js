let levelAState = {
     
    preload: loadAssets,
    create : displayScreen
};

let threadImg;
let line;
let score; 
let scoreText;
let level;
let levelText;
let lives;
let livesText;

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
    level = 1.1;
    lives = 3;


    let nThreads = 4; //cambiar a un imput pasado desde Juego

    for (let i = 0; i < nThreads; i++){
        
        threadPosition.push( ( ( game.world.width / (nThreads + 1) ) * (i+1)) - (line.width /4));
        game.add.image(threadPosition[i], 0, "drawLine");
    }

    createHUD();
    
};


function createHUD() {
    let scoreX = 5;
    let levelX = game.world.width / 2;
    let livesX = game.world.width - 5;
    let allY = game.world.height /2;
    let styleHUD =
    {fontSize: '18px', fill: '#FFFFFF'};

    scoreText = game.add.text(
    scoreX,allY,'Score: '+score,styleHUD);

    levelText = game.add.text(
    35,0,'Level: '+level,styleHUD);

    levelText.anchor.setTo(0.5, 0);

    livesText = game.add.text(
    livesX,allY,'Lives: '+lives,styleHUD);

    livesText.anchor.setTo(1, 0);
    console.log("yeeee" + lives);
};