const DISPARO_GROUP_SIZE = 7;
const DISPARO_OFFSET_X = 10;
const DISPARO_OFFSET_Y = -300;
const DISPARO_VEL = 350;

let threadImg;
let line, player;
const threadPosition = [], bugsArray = [];
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
let Bug, yBug = 0;
let bugs;
let disparo;

class BugEnemy {
    constructor(initialThread) {
        this.myThread = initialThread
        this.img = game.add.sprite(threadPosition[initialThread], yBug, "mariquita")
        console.log(this.myThread)
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
    game.load.image("bg", "assets/imgs/bg.jpg");
    line = game.add.sprite(-10, 0, "drawLine");
    console.log(line.width);
}

function displayScreen() {
    game.input.enabled = true;
    game.input.keyboard.onDownCallback = getKeyboardInput;

    game.add.image(0, 0, "bg");

    score = 0;
    level = 1.0;
    lives = 4;

    //bugs = game.add.group();
    createHUD();

    timer = game.time.create(false);
    timer.loop(1500, spawn);

    nThreads = 8;
    actualThread = nThreads / 2;
    for (let i = 0; i < nThreads; i++) {
        threadPosition.push(
        (game.world.width / (nThreads + 1)) * (i + 1) - line.width / 2
        );
        game.add.image(threadPosition[i], 0, "drawLine");
    }

    player = game.add.sprite(threadPosition[actualThread], Ypos, "daniel");
    player.scale.setTo(0.6, 0.6);
    player.x = threadPosition[actualThread] - player.width / 2;
    createDisparo(DISPARO_GROUP_SIZE);

    timer.start();


}

function spawn() {
    var randomBugPosition = game.rnd.integerInRange(0, nThreads - 1);

    Bug = new BugEnemy(randomBugPosition);
    bugsArray.push(Bug);
    //bugs.add(Bug)

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
    let scoreX = 5;
    let levelX = game.world.width / 2;
    let livesX = game.world.width - 5;
    let allY = game.world.height - 25;
    let styleHUD = { fontSize: "18px", fill: "#FFFFFF" };

    scoreText = game.add.text(scoreX, allY, "Score: " + score, styleHUD);

    levelText = game.add.text(levelX, allY, "Level: " + level, styleHUD);

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
/*    
    for( const child in bugs.children){
        child.move()
    }
*/
}

function updateGame() {
    moveBugs();
    game.physics.arcade.overlap(disparo,bugsArray,hagoDaño,null,this);
    game.physics.arcade.overlap(player,bugsArray,reciboDaño,null,this);

}

function hagoDaño(disparo,bugs)
{
    disparo.kill();
    bugs.kill();
    console.log("te hago daño baby")
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