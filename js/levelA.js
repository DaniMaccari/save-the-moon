const DISPARO_GROUP_SIZE = 7;
const DISPARO_OFFSET_X = 10;
const DISPARO_OFFSET_Y = -300;
const DISPARO_VEL = 350;

let threadImg;
let line, player;
var threadPosition = [], bugsArray = [], threadObjects = [];
var timer;
let actualThread, middleThread, playerYpos = 560, playerYchange = 7;
let score, scoreText;
let lives, livesText;
let level, levelText;
let time, timeText;
let Bug, yBug = 0;
let bugs;
let disparo;

class BugEnemy {
    constructor(initialThread) {
        this.myThread = initialThread
        this.img = game.add.sprite(threadPosition[initialThread], yBug, "mariquita")
        game.physics.arcade.enable(this.img);

        this.img.scale.setTo(0.1, 0.1)
        this.myWidth = this.img.width / 2
        this.img.x -= this.myWidth

    }
  
    move() {
        this.img.y += 2;
    }
  }

//---------------------------------------------
//--- START LEVEL -----------------------------
//---------------------------------------------
let levelAState = {
    preload: loadAssets,
    create: displayScreen,
    update: updateGame,
};

//--- load assets ---------------
function loadAssets() {
    game.load.image("daniel", "assets/imgs/shipYellow.png");
    game.load.image("vida1","assets/imgs/barra1.png")
    game.load.image("vida2","assets/imgs/barra2.png")
    game.load.image("vida3","assets/imgs/barra3.png")
    game.load.image("vida4","assets/imgs/barra4.png")
    game.load.image("vida0","assets/imgs/barra vacía.png")
    game.load.image("mariquita", "assets/imgs/mariquita.png");
    game.load.image("drawLine", "assets/imgs/line.png");
    game.load.image("levelA", "assets/imgs/start.png");
    game.load.image("disparo", "assets/imgs/punto.png");
    game.load.image("bg", "assets/imgs/BG.png");
    game.load.image("tv", "assets/imgs/BG-1.png");
    line = game.add.sprite(-10, 0, "drawLine");
    console.log(line.width);
}

//--- create level --------------
function displayScreen() {
    game.input.enabled = true;
    if ( isKeyboradActive) {
        game.input.keyboard.onDownCallback = getKeyboardInput

    } else {
        game.input.mouse.capture = true
        game.input.onDown.add(onMouseDown, this);
    }
    

    BG = game.add.image(0, 0, "bg");
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)

    score = 0;
    level = 1.0;
    lives = 4;

    createHUD();
    bugs = game.add.group();
    

    timer = game.time.create(false);
    timer.loop(1500, spawn);

    //--- num of threads ---
    //nThreads = 5
    middleThread = Math.floor(nThreads / 2) //arreglar cuando es impar
    actualThread = middleThread

    //create threads
    threadPosition = []
    for (let i = 0; i < nThreads; i++) {
        threadPosition.push( 
        (game.world.width / (nThreads + 1)) * (i + 1) );
        let tempLine = game.add.image(threadPosition[i], 110, "drawLine");
        tempLine.scale.setTo(0.3, 0.3)
        tempLine.x -= (tempLine.width / 2)
        
        //tempLine.tint = 0xff0080; //change color
        
    }

    player = game.add.sprite(threadPosition[actualThread], playerYpos, "daniel");
    player.scale.setTo(0.6, 0.6);
    player.x = threadPosition[actualThread] - player.width / 2;

    createDisparo(DISPARO_GROUP_SIZE);

    

    //enable collisions
    game.physics.arcade.enable("mariquita");
    game.physics.arcade.enable("disparo");

    tvForeground = game.add.image(0, 0, "tv")
    tvForeground.scale.setTo(game.width/tvForeground.width, game.height/tvForeground.height)
    tvForeground.bringToTop();

    timer.start();


}

//--- SPAWN ENEMY -------------------------
function spawn() {
    var randomBugPosition = game.rnd.integerInRange(0, nThreads - 1);

    Bug = new BugEnemy(randomBugPosition);
    bugsArray.push(Bug);
}

//--- GET INPUT --------------------------
function getKeyboardInput(e) {

    //lateral move
    if (e.keyCode == Phaser.Keyboard.A || e.keyCode == Phaser.Keyboard.LEFT) {
        if (actualThread > 0) {
            actualThread = actualThread - 1;

            /*
            if( actualThread < middleThread){
                player.y -= playerYchange
            } else {
                player.y += playerYchange
            }
            */
        }
    }

    else if (e.keyCode == Phaser.Keyboard.D || e.keyCode == Phaser.Keyboard.RIGHT) {
        if (actualThread < nThreads - 1) {
            actualThread = actualThread + 1;

            /*
            if( actualThread > middleThread){
                player.y -= playerYchange
            } else {
                player.y += playerYchange
            }
            */
        }   
    }

    player.x = threadPosition[actualThread] - player.width / 2;

    //shoot imput
    if (e.keyCode == Phaser.Keyboard.SPACEBAR) {
        fireDisparos();
        console.log("Disparo");
    }
};

//--- GET MOUSE INPUT -------------------
function onMouseDown(pointer) {
    if (pointer.button === Phaser.Mouse.LEFT_BUTTON) {
        fireDisparos();
    }
};

//--- SHOW HUD ------------------------
function createHUD() {
    let levelX = game.world.width / 2;
    let livesX = game.world.width - 5;
    let allY = - 25;
    let styleHUD = { fontSize: "18px", fill: "#FFFFFF" };

    scoreText = game.add.text(game.world.width/15,  game.world.height/15, "Score: " + score, styleHUD);

    levelText = game.add.text(game.world.width/9, game.world.height/10, "Level: " + level, styleHUD);

    levelText.anchor.setTo(0.5, 0);

    livesText = game.add.text(livesX, allY, "Lives: " + lives, styleHUD);
    livesText.anchor.setTo(1, 0);
}

function createDisparo(number) {
    disparo = game.add.group();
    disparo.enableBody = true;
    disparo.createMultiple(number, "disparo");

    disparo.callAll("events.onOutOfBounds.add", "events.onOutOfBounds", resetMember);
    disparo.callAll("anchor.setTo", "anchor", 0.5, 1.0);
    disparo.setAll("checkWorldBounds", true);
}

function resetMember(item) {
     item.kill();
}

function fireDisparos() {
    let x = player.x + player.width / 2;
    let y = player.y;
    let vd = -DISPARO_VEL;
    let elDisparo = shootDisparo(x, y, vd);
}

function shootDisparo(x, y, vd) {
    let shot = disparo.getFirstExists(false);
    shot.scale.setTo(0.05, 0.05);

    if (shot) {
        shot.reset(x, y);
        shot.body.velocity.y = vd;
    }
    return shot;
}

//--- MOVE ALL BUGS/ENEMIES ---------------------
function moveBugs() {
    for (let i = 0; i < bugsArray.length; i++) {
       bugsArray[i].move();

    }

}



function hagoDaño(thisShot,thisBug)
{
    thisShot.kill();
    thisBug.kill();
    console.log("te hago daño baby")
    score+=10;
}


function reciboDaño(player,bugs)
{
    if(lives > 1)
    {
        lives-=1;
        bugs.kill();
        console.log("no te pilles baby")
    }

    else
    {
        player.kill();
        bugs.kill();
        console.log("no te pilles baby")
    }

}

//--- UPADATE ------------
function updateGame() {

    //move enemies
    moveBugs();

    //if mouse input is active
    if( !isKeyboradActive) {
        let mousePos = game.input.mousePointer.x
        for ( let i=0; i < threadPosition.length; i++){
            if(threadPosition[i] -35 < mousePos && threadPosition[i] +35 > mousePos){
                player.x = threadPosition [i] - player.width / 2
            }
        }
        
    }
    

    //check collisions BULLET/ENEMI
    for (let i = 0; i < bugsArray.length; i++) {
        game.physics.arcade.overlap(disparo, bugsArray[i].img, hagoDaño, null, this);

    }

}