const DISPARO_GROUP_SIZE = 5;
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
var time, timeText;
let Bug, yBug = 30;
let bugsGroup;
let disparo;
let tvForeground

var startTime;
var timerText;

class BugEnemy {
    constructor(initialThread) {
        this.myThread = initialThread
        this.img = game.add.sprite(threadPosition[initialThread], yBug, "mariquita")
        bugsGroup.addChild(this.img)
        this.img.x = threadPosition[initialThread]
        this.img.y = yBug
        game.physics.arcade.enable(this.img)

        this.img.scale.setTo(0.1, 0.1)
        this.myWidth = this.img.width / 2
        this.img.x -= this.myWidth

        this.isMoving = false
        this.direction = false
        
    }
  
    move() {
        //changes thread/ takes branch
        if(this.isMoving && this.direction){ //izquierda

            this.img.x -= 2
            this.img.y += 1
            if (this.img.x + this.myWidth <= threadPosition[this.myThread]) {
                this.isMoving = false
                this.img.x = threadPosition[this.myThread] - this.myWidth
            }
            
        }
        else if ( this.isMoving && !this.direction){ //derecha
            this.img.x += 2
            this.img.y += 1
            if (this.img.x + this.myWidth >= threadPosition[this.myThread]) {
                this.isMoving = false
                this.img.x = threadPosition[this.myThread] - this.myWidth
            }
        }
        //move down
        else{
            this.img.y += 2
        }
        
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
    startTime = game.time.now;

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


    createDisparo(DISPARO_GROUP_SIZE);//crear grupo de disparos
    bugsGroup = game.add.group()//para que los enemigos aparezcan por debajo de tvForeground

    //enable collisions
    game.physics.arcade.enable("mariquita");
    game.physics.arcade.enable("disparo");

    tvForeground = game.add.image(0, 0, "tv")
    tvForeground.scale.setTo(game.width/tvForeground.width, game.height/tvForeground.height)

    createHUD();

    timer.start();


}

//--- SPAWN ENEMY -------------------------
function spawn() {
    var randomBugPosition = game.rnd.integerInRange(0, nThreads - 1);

    Bug = new BugEnemy(randomBugPosition);
    bugsArray.push(Bug);

    //tvForeground.bringToTop()

}

//--- GET INPUT --------------------------
function getKeyboardInput(e) {

    //lateral move
    if (e.keyCode == Phaser.Keyboard.A || e.keyCode == Phaser.Keyboard.LEFT) {
        if (actualThread > 0) {
            actualThread = actualThread - 1;

        }
    }

    else if (e.keyCode == Phaser.Keyboard.D || e.keyCode == Phaser.Keyboard.RIGHT) {
        if (actualThread < nThreads - 1) {
            actualThread = actualThread + 1;

        }   
    }

    player.x = threadPosition[actualThread] - player.width / 2;

    //shoot imput
    if (e.keyCode == Phaser.Keyboard.SPACEBAR) {
        fireDisparos();
    }
};

//--- GET MOUSE INPUT -------------------
function onMouseDown(pointer) {
    if (pointer.button == Phaser.Mouse.LEFT_BUTTON) {
        fireDisparos();
    }
};

//--- SHOW HUD ------------------------
function createHUD() {

    let styleHUD = { fontSize: "18px", fill: "#FFFFFF" };

    timerText = game.add.text(50,  20, "Time: ", styleHUD);

    scoreText = game.add.text(50,  game.world.height/15, "Score: " + score, styleHUD);

    levelText = game.add.text(50, game.world.height/10, "Level: " + level, styleHUD);

    livesText = game.add.text(50, 100, "Lives: " + lives, styleHUD);

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
    

    if (shot) {
        shot.scale.setTo(0.05, 0.05);
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

//--- BULLET/ENEMY COLLISION --------------------
function hagoDaño(thisShot, thisBug){
    let i = this.i

    thisShot.kill()
    thisBug.kill()
    console.log(i)
    bugsArray.splice(i, 1) //si no está los enemigos quitan vida aún borrados

    score+=10
    console.log("this i is ->" + i)
}


function reciboDaño()
{
    if(lives > 1)
    {
        lives-=1;
        
        livesText.text = "Lives: "+ lives;
        console.log("no te pilles baby")
    }

    else
    {
        //player.kill();
        
        console.log("He muerto")
    }

}

function updateScore() {

    scoreText.text = "Score: "+ score;
}

function updateTimer() {
    var elapsed = game.time.now - startTime;
    var actualTime = Math.floor(elapsed / 1000);
    timerText.text = "Time: " + actualTime; // Display in seconds
    
}


//--- UPADATE ------------
function updateGame() {

    //move enemies
    moveBugs();
    updateScore();
    updateTimer();


    //if mouse input is active
    if( !isKeyboradActive) {
        let mousePos = game.input.mousePointer.x
        for ( let i=0; i < threadPosition.length; i++){
            if(threadPosition[i] -35 < mousePos && threadPosition[i] +35 > mousePos){
                player.x = threadPosition [i] - player.width / 2
            }
        }
        
    }
    
    //deactivate shots
    
    //check collisions BULLET/ENEMI and check if enemy reached bottom
    for (let i = bugsArray.length-1; i >=0; i--) { //de atras hacia adelante para que no salten tantos errores

        
        
        if( bugsArray[i].img.y > playerYpos ){
            reciboDaño()
            
            bugsArray[i].img.destroy()
            bugsArray.splice(i, 1)

        } else {
            game.physics.arcade.overlap( disparo, bugsArray[i].img, hagoDaño, null, { i: i })

        }
    }

}