const DISPARO_GROUP_SIZE = 5;
const DISPARO_OFFSET_X = 10;
const DISPARO_OFFSET_Y = -300;
const DISPARO_VEL = 350;


let bugVelocity;
let threadImg;
let line, player;
var threadPosition = [], bugsArray = [], threadObjects = [];
var timerEnemy;
var timerLifeItems;

let actualThread, middleThread, playerYpos = 560, playerYchange = 7;

let Bug, yBug = 30;
let bugsGroup;
let disparo;
let tvForeground
let itemGroup;

let spawnEnemyRnd;
let spawnItemRnd;

var startTime;


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

            this.img.x -= 2 * bugVelocity;
            this.img.y += 1 * bugVelocity;
            if (this.img.x + this.myWidth <= threadPosition[this.myThread]) {
                this.isMoving = false
                this.img.x = threadPosition[this.myThread] - this.myWidth
            }
            
        }
        else if ( this.isMoving && !this.direction){ //derecha
            this.img.x += 2 * bugVelocity;
            this.img.y += 1 * bugVelocity;
            if (this.img.x + this.myWidth >= threadPosition[this.myThread]) {
                this.isMoving = false
                this.img.x = threadPosition[this.myThread] - this.myWidth
            }
        }
        //move down
        else{
            this.img.y += bugVelocity;
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
    game.load.image("mariquita", "assets/imgs/mariquita.png");
    game.load.image("drawLine", "assets/imgs/line.png");
    game.load.image("disparo", "assets/imgs/punto.png");
    game.load.image("bg", "assets/imgs/BG.png");
    game.load.image("tv", "assets/imgs/BG-1.png");
    game.load.spritesheet("lives","assets/imgs/lifeSpritesheet.png",519,519);
    game.load.image("pantallaNegra","assets/imgs/Solid_black.png")

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

    level = 1;
    score = 0;
    part = 1;
    lives = 5;
    bugVelocity = 2; //Velocidad de los bugs cuando empieza el juego

    spawnEnemyRnd = game.rnd.integerInRange(1500,3000) //entre 1 y 3 segundos
    spawnItemRnd = game.rnd.integerInRange(5000,8000) //entre 5 y 3 segundos

    startTime = game.time.now;

    timerEnemy = game.time.create(false);
    timerEnemy.loop(spawnEnemyRnd, spawn);

    timerLifeItems = game.time.create(false);
    timerLifeItems.loop(spawnItemRnd,spawnLifeItems);


    //--- num of threads ---
    //nThreads = 5
    middleThread = Math.floor(nThreads / 2) 
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

    
    player.enableBody = true;

    itemGroup = game.add.group();
    itemGroup.enableBody = true;
    
    //enable collisions
    game.physics.arcade.enable("mariquita");
    game.physics.arcade.enable("disparo");
    game.physics.arcade.enable(player);
    //game.physics.arcade.enable("disparo"); //hay q cambuarlo al sprite luego

    createfade();

    tvForeground = game.add.image(0, 0, "tv")
    tvForeground.scale.setTo(game.width/tvForeground.width, game.height/tvForeground.height)

    createHUD();
    createLives();
    timerEnemy.start();
    timerLifeItems.start();


}

//--- SPAWN ENEMY -------------------------
function spawn() {
    var randomBugPosition = game.rnd.integerInRange(0, nThreads - 1);

    Bug = new BugEnemy(randomBugPosition);
    bugsArray.push(Bug);

}

function spawnLifeItems() {

    const randomThread = game.rnd.integerInRange(0, nThreads - 1); // Generate random thread
    var x = threadPosition[randomThread];
    const item = itemGroup.create(x, 30, 'disparo');
    item.anchor.setTo(0.5, 0.5);
    item.scale.setTo(0.1,0.1);
    console.log("LIFE ITEMS");
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

function moveItems() {
    
    var children = itemGroup.children;
    var numChildren = children.length;
    for (var i = 0; i < numChildren; i++) {
      var item = children[i];
      item.y += 2; }
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


function deleteItem(thisShot,thisItem) {
    console.log("BORRO DISPARO E ITEM")
    thisShot.kill();
    thisItem.kill();
}

function checkItemCollision() {
    itemGroup.forEach(function(item) {
        if (item.y > playerYpos) {
            item.kill(); // Remove the item from the group
        }
    }, this);
}

function checkBulletItemCollision() {

    //check collisions BULLET/ENEMI and check if enemy reached bottom
    for (let i = bugsArray.length-1; i >=0; i--) { //de atras hacia adelante para que no salten errores

        
        
        if( bugsArray[i].img.y > playerYpos ){
            reciboDaño();
            
            bugsArray[i].img.destroy()
            bugsArray.splice(i, 1);

        } else {
            game.physics.arcade.overlap( disparo, bugsArray[i].img, hagoDaño, null, { i: i })

        }
    }
}

function checkScore() {


    if (score >= 80 ) {
        fadeSceneOutBetweenScenes("levelB");
        console.log("aASIDODSIODIOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOS")
    }

    else if (score >= 60) {

        levelAPhase2();
        
    }

    else  if (score >=40) {
        levelAPhase3();
    }


}

function levelAPhase2() {

    level = 2;
    spawnEnemyRnd = game.rnd.integerInRange(1500,2000) //entre 1 y 2 segundos
    spawnItemRnd = game.rnd.integerInRange(6000,8000) //entre 6 y 8 segundos
    bugVelocity = 4;

    updateLevel();
    
}

function levelAPhase3() {

    level = 3;
    spawnEnemyRnd = game.rnd.integerInRange(1500,2000) //entre 1 y 2 segundos
    spawnItemRnd = game.rnd.integerInRange(6000,8000) //entre 6 y 8 segundos
    bugVelocity = 4;

    updateLevel();
    
}


//--- UPDATE ------------
function updateGame() {

    //move enemies
    moveBugs();

    if (itemGroup && itemGroup.children) { //si existe el grupo y tiene hijos
        moveItems();

        game.physics.arcade.overlap( disparo,itemGroup, deleteItem, null, this )
        
        
    }
    
    game.physics.arcade.overlap(player,itemGroup, ganoVida, null, this )

    //Update HUD
    updateScore();
    updateTimer();
    checkItemCollision();
    checkBulletItemCollision();
    checkScore();

    //if mouse input is active
    if( !isKeyboradActive) {
        let mousePos = game.input.mousePointer.x
        for ( let i=0; i < threadPosition.length; i++){
            if(threadPosition[i] -35 < mousePos && threadPosition[i] +35 > mousePos){
                player.x = threadPosition [i] - player.width / 2
            }
        }
        
    }


}