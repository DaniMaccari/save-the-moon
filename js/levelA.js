const DISPARO_GROUP_SIZE = 7;
const DISPARO_OFFSET_X = 10;
const DISPARO_OFFSET_Y = -300;
const DISPARO_VEL = 350;

let threadImg;
let line, player, BG;
const threadPosition = [], bugsArray = [];
var timer;
let actualThread, nThreads, playerYpos = 540;
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

//START LEVEL ---------------------------------------------------------------
let levelAState = {
    preload: loadAssets,
    create: displayScreen,
    update: updateGame,
};

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

function displayScreen() {
    game.input.enabled = true;
    game.input.keyboard.onDownCallback = getKeyboardInput;

    BG = game.add.image(0, 0, "bg");
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)

    score = 0;
    level = 1.0;
    lives = 4;

    createHUD();
    bugs = game.add.group();
    

    timer = game.time.create(false);
    timer.loop(1500, spawn);

    nThreads = 2;
    actualThread = nThreads / 2;

    //--- CREAR THREADS ---------------------------------------------------
    for (let i = 0; i < nThreads; i++) {
        threadPosition.push( 15+
        (game.world.width / (nThreads + 1)) * (i + 1) );
        let tempLine = game.add.image(threadPosition[i], 100, "drawLine");
        tempLine.scale.setTo(0.3, 0.3)
        tempLine.x -= (tempLine.width / 2)
        
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

function spawn() {
    var randomBugPosition = game.rnd.integerInRange(0, nThreads - 1);

    Bug = new BugEnemy(randomBugPosition);
    bugsArray.push(Bug);

        

    
    /*Bug = game.add.sprite(threadPosition[randomBugPosition],yBug,"mariquita")

    Bug.scale.setTo(0.1,0.1);
    Bug.y -= Bug.width / 2
    Bug.myThread = randomBugPosition
    bugs.add(Bug)

    console.log(Bug.y)
    */

}

function getKeyboardInput(e) {
    if (e.keyCode == Phaser.Keyboard.A || e.keyCode == Phaser.Keyboard.LEFT) {
        if (actualThread > 0) {
        actualThread = actualThread - 1;
        }
        console.log(actualThread);
        console.log(nThreads);
        player.x = threadPosition[actualThread] - player.width / 2;
    } else if (e.keyCode == Phaser.Keyboard.D || e.keyCode == Phaser.Keyboard.RIGHT) {
        if (actualThread < nThreads - 1) {
        actualThread = actualThread + 1;
        }
        console.log(actualThread);
        console.log(nThreads);

        player.x = threadPosition[actualThread] - player.width / 2;
    }

    if (e.keyCode == Phaser.Keyboard.SPACEBAR) {
        fireDisparos();
        console.log("Daniel Maricón");
    }
}

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

function moveBugs() {
    
    //no se pueden hacer grupos que sus hijos llamen a funciones?
    for (let i = 0; i < bugsArray.length; i++) {
       bugsArray[i].move();
    }
   
   /* for( const child in bugs.Children){
        child.y += 2;
        console.log(child.y)
    }
*/
}

function updateGame() {
    moveBugs();

    for (let i = 0; i < bugsArray.length; i++) {
        game.physics.arcade.overlap(disparo, bugsArray[i].img, hagoDaño, null, this);
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