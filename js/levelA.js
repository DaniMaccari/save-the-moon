

let levelAState = {
     
    preload: loadAssets,
    create : displayScreen
};

let threadImg;
let line, marica;
const threadPosition = [];
var timer;
let actualThread, nThreads, Ypos = 500;

function loadAssets(){

    game.load.image("mariquita","assets/imgs/mariquita.png")
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
    

    //timer = game.time.create(false)
    //timer.loop(1500, spawn);
    

    nThreads = 4; //cambiar a un imput pasado desde Juego
    actualThread = nThreads/2;
    for (let i = 0; i < nThreads; i++){
        
        threadPosition.push( ( ( game.world.width / (nThreads + 1) ) * (i+1)) - (line.width /4));
        game.add.image(threadPosition[i], 0, "drawLine");
    }

    marica = game.add.sprite(threadPosition[actualThread], Ypos, "mariquita");
    marica.scale.setTo(0.2,0.25);

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
        
        if (actualThread != 0) {
            actualThread = actualThread -1;
        }
        console.log("LEFT")
        marica.x = threadPosition[actualThread]

    }

    else if (e.keyCode == Phaser.Keyboard.D || e.keyCode == Phaser.Keyboard.RIGHT) {
        
        if (actualThread != nThreads-1) {
            actualThread = actualThread +1;
        }
        marica.x = threadPosition[actualThread]
    }
;
}