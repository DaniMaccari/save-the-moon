

let levelAState = {
     
    preload: loadAssets,
    create : displayScreen
};

let threadImg;
let line, player;
const threadPosition = [];
var timer;
let actualThread, nThreads, Ypos = 500;
let score; 
let scoreText;
let lives;
let livesText;
let level;
let levelText;
let time;
let timeText;


function loadAssets(){

    game.load.image("daniel","assets/imgs/shipYellow.png")
    game.load.image("drawLine", "assets/imgs/line.png");
    game.load.image("levelA", "assets/imgs/start.png");//cambiar la ruta de las imagenes levels A B C
    game.load.image("bg","assets/imgs/bg.jpg");
    line = game.add.sprite(-10,0,"drawLine")
    console.log(line.width)
};

function displayScreen(){

    game.input.enabled = true;
    game.input.keyboard.onDownCallback = getKeyboardInput;

    game.add.image(0,0,"bg");
    


    score = 0;
    level = 1.0;
    lives = 3;

    createHUD();

    //timer = game.time.create(false)
    //timer.loop(1500, spawn);
    
    nThreads = 8; //cambiar a un imput pasado desde Juego
    actualThread = nThreads/2;
    for (let i = 0; i < nThreads; i++){
        
        threadPosition.push( ( ( game.world.width / (nThreads + 1) ) * (i+1)) - (line.width /4));
        game.add.image(threadPosition[i], 0, "drawLine");
    }

    player = game.add.sprite(threadPosition[actualThread], Ypos, "daniel");
    player.scale.setTo(0.6,0.6);
    player.x = threadPosition[actualThread] - (player.width /2);

    //timer.start();
};

/*
function spawn() {
    var randomBugPosition = game.rnd.integerInRange(0, nThreads -1);
};
*/

//function updateGame() {}

function getKeyboardInput(e) {
    console.log("AAAAAAAAAA")
    if (e.keyCode == Phaser.Keyboard.A || e.keyCode == Phaser.Keyboard.LEFT) {
        
        if (actualThread > 0) {
            actualThread = actualThread -1;
        }
        console.log(actualThread);
        console.log(nThreads);
        player.x = threadPosition[actualThread] - (player.width /2);

    }

    else if (e.keyCode == Phaser.Keyboard.D || e.keyCode == Phaser.Keyboard.RIGHT) {
        
        if (actualThread < nThreads-1) {
            actualThread = actualThread +1;
        }
        console.log(actualThread);
        console.log(nThreads);

        player.x = threadPosition[actualThread] - (player.width /2);
    }

}


function createHUD(){
    let scoreX = 5;
    let levelX = game.world.width / 2;
    let livesX = game.world.width - 5;
    let allY = game.world.height - 25;
    let styleHUD =
        {fontSize: '18px', fill: '#FFFFFF'};
        
    scoreText = game.add.text(
        scoreX,allY,'Score: '+score,styleHUD);

    levelText = game.add.text(
    levelX,allY,'Level: '+level,styleHUD);

    levelText.anchor.setTo(0.5, 0);

    livesText = game.add.text(
        livesX,allY,'Lives: '+ lives,styleHUD);
        livesText.anchor.setTo(1, 0);

    }