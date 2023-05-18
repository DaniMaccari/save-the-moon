let levelAState = {
     
    preload: loadAssets,
    create : displayScreen,
    update : updateGame
};


const DISPARO_GROUP_SIZE = 7;
const DISPARO_OFFSET_X = 10;
const DISPARO_OFFSET_Y = -300;
const DISPARO_VEL = 350;
const EMPTY_BRANCH = -10
let threadImg;
let line, player;
const threadPosition = [], branchPosition = [], branchSide = [];
var timer;
let actualThread, nThreads, nBranches, Ypos = 500;
let score; 
let scoreText;
let lives;
let livesText;
let level;
let levelText;
let time;
let timeText;
let Bug, yBug = 0;
let bugs;
let disparo;

function loadAssets(){

    game.load.image("daniel","assets/imgs/shipYellow.png")
    game.load.image("mariquita","assets/imgs/mariquita.png")
    game.load.image("drawLine", "assets/imgs/line.png");
    game.load.image("levelA", "assets/imgs/start.png");//cambiar la ruta de las imagenes levels A B C
    game.load.image("disparo","assets/imgs/punto.png");
    game.load.image("bg","assets/imgs/bg.jpg");
    line = game.add.sprite(-10,0,"drawLine")
    console.log(line.width)
};

function displayScreen(){

    game.input.enabled = true;
    game.input.keyboard.onDownCallback = getKeyboardInput;

    game.add.image(0,0,"bg");
    bugs = game.add.group();


    score = 0;
    level = 1.0;
    lives = 3;

    createHUD();


    timer = game.time.create(false)
    timer.loop(1500,spawn);
    
    nThreads = 8; //cambiar a un imput pasado desde Juego----------------
    nBranches = nThreads/2;

    actualThread = nBranchs;//starting branch

    //places threads
    for (let i = 0; i < nThreads; i++){
        
        threadPosition.push( ( ( game.world.width / (nThreads + 1) ) * (i+1)) - (line.width /2));
        branchPosition.push( EMPTY_BRANCH ); //fill array with -10
        branchSide.push( true ); //if true changes to RIGHT, false changes to LEFT
        game.add.image(threadPosition[i], 0, "drawLine");
    }
    branchSide[nThreads -1] = false //las

    //placeBranches
    while( nBranches > 0){
        let i = integerInRange(0, nThreads-1);

        //put branches in 1/2 random positions
        if( branchPosition[i] != EMPTY_BRANCH){
            branchPosition[i] = integerInRange(40, (game.world.height/3)*2 )
            if( integerInRange(0,1) != 0 && i != 0 ){
                branchSide[i] = false;
            }
        }
    }


    player = game.add.sprite(threadPosition[actualThread], Ypos, "daniel");
    player.scale.setTo(0.6,0.6);
    player.x = threadPosition[actualThread] - (player.width /2);
    createDisparo(DISPARO_GROUP_SIZE);
    
    timer.start();
};


function spawn() {
    var randomBugPosition = game.rnd.integerInRange(0, nThreads -1);

    Bug = game.add.sprite(threadPosition[randomBugPosition], yBug, "mariquita");
    Bug.scale.setTo(0.1,0.1);
    Bug.x -= Bug.width /2;
    bugs.add(Bug);
    
};


function updateGame() {    

}

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

    if(e.keyCode == Phaser.Keyboard.SPACEBAR)
    {
        fireDisparos();
        console.log("Daniel Maricón")
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

    function createDisparo(number)
    {
        disparo = game.add.group();
        disparo.enableBody = true;
        disparo.createMultiple(number, "disparo");
        disparo.callAll("events.onOutOfBounds.add",
        "events.onOutOfBounds", resetMember);
        disparo.callAll("anchor.setTo","anchor",0.5, 1.0);
        disparo.setAll("checkWorldBounds",true);
        
    
    }

    function resetMember(item)
    {
    item.kill();
    }

    function fireDisparos() {

        let x = player.x + player.width/2;
        let y = player.y;
        let vd = -DISPARO_VEL;
        let elDisparo = shootDisparo(x,y,vd);
    
    }
    
    function shootDisparo(x, y, vd)
    {
        let shot = disparo.getFirstExists(false);
        shot.scale.setTo(0.05,0.05)
    
        if (shot) {
            shot.reset(x, y);
            shot.body.velocity.y = vd;
            }
            return shot;
    }

function moveBugs() {
    for (const child of bugs.children) {

        //change later -> add myThread to Bug
        
        child.y += 2;
    }
}
    
function updateGame() {

    moveBugs() 
}

