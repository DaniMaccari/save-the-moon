

let spawnUltiRnd;

let haveUlti = false;


let levelCState = {
     
    preload: loadAssets,
    create : displayScreen,
    update : updateGame
};

function loadAssets() {
    
    game.load.image("enemy", "assets/imgs/enemy.png");
    game.load.image("lifeItem", "assets/imgs/lifeItem.png");
    game.load.image("drawLine", "assets/imgs/line.png")
    game.load.image("drawBranch", "assets/imgs/line_tumbada.png")
    game.load.image("bomb", "assets/imgs/PARTC/bomb.png")
    game.load.image("bg", "assets/imgs/BG.png")
    game.load.image("tv", "assets/imgs/BG-1.png")
    game.load.spritesheet("lives","assets/imgs/lifeSpritesheet.png",519,519);  
    game.load.spritesheet("bombHUD","assets/imgs/PARTC/bombSpritesheet.png",519,519);  
    game.load.spritesheet("character","assets/imgs/characterSpritesheet.png",519,519); 
    game.load.spritesheet("balas","assets/imgs/balasSpritesheet.png",519,519);
    game.load.image("pantallaNegra","assets/imgs/Solid_black.png")
    game.load.image("whiteFlash","assets/imgs/PARTC/whiteFlashBomb.png")

    game.load.audio("piumSound","assets/snds/disparo.mp3");
    game.load.audio("colisionSound","assets/snds/colision.mp3");
    game.load.audio("tocadoSound","assets/snds/tocado.mp3");
    game.load.audio("cambioSound","assets/snds/cambio.mp3")


}

function displayScreen() {

    bugsArray = []

    //LA BOMBA SE ACTIVA CON E
    var keyE = game.input.keyboard.addKey(Phaser.Keyboard.E);
    keyE.onDown.add(tiraBomba, this);

    game.input.enabled = true;
    if ( isKeyboradActive) {
        game.input.keyboard.onDownCallback = getKeyboardInput

    } else {
        game.input.mouse.capture = true
        game.input.onDown.add(onMouseDown, this);
    }
    

    BG = game.add.image(0, 0, "bg");
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)

    bugVelocity = 0.2;
    score = 0;
    part = "C";
    level = 1;
    lives = 5;
    enemyCounter = 0;
    startTime = game.time.now;

    piumSound = game.sound.add("piumSound");
    piumSound.volume = 0.5;
    colisionSound = game.sound.add("colisionSound");
    colisionSound.volume = 0.7;
    tocadoSound = game.sound.add("tocadoSound");
    tocadoSound.volume = 0.5;
    cambioSound = game.sound.add("cambioSound");
    cambioSound.volume = 0.5;
    

    timerLifeItems = game.time.create(false);

    
    //spawnUltiRnd = game.rnd.integerInRange(1500,10000) //entre 1 y 2'5 segundos
    //timerUlti = game.time.create(false);
    //timerUlti.loop(spawnUltiRnd, spawnUlti);

    spawnEnemyRnd = game.rnd.integerInRange(800,1000) //entre 1 y 2'5 segundos
    timerEnemy = game.time.create(false);
    timerEnemy.loop(spawnEnemyRnd, spawn);


    //--- num of threads ---
    //nThreads = 5
    middleThread = Math.floor(nThreads / 2) //arreglar cuando es impar
    actualThread = middleThread

    //create threads
    threadPosition = []
    branchPosition = []
    branchDirection = []

    for (let i = 0; i < nThreads; i++) {
        threadPosition.push( 
        (game.world.width / (nThreads + 1)) * (i + 1) );
        let tempLine = game.add.image(threadPosition[i], 110, "drawLine");
        tempLine.scale.setTo(0.3, 0.3)
        tempLine.x -= (tempLine.width / 2)

        branchPosition.push(-10)
        branchDirection.push(false)
    }

    //create thread branches
    let nBranches = middleThread
    let aux
    let branchGap = 0.3 - (nThreads * 0.02)
    console.log(branchGap)
    while (nBranches >= 0){
        aux = game.rnd.integerInRange(0, nThreads - 1)
        

        //if this thread doents have branch
        if ( branchPosition[aux] == -10 ){

            branchPosition[aux] = game.rnd.integerInRange(160, game.height*0.5)
            console.log("pos->" + aux + " altura y->" + branchPosition[aux])

            let tempBranch = game.add.image(threadPosition[aux], branchPosition[aux], "drawBranch")
            

            //señala izquierda entra if, señala derecha se queda como está
            if ( aux == nThreads-1 || (aux != 0  && game.rnd.integerInRange(0, 1) == 0)){
                branchDirection[aux] = true 
                tempBranch.scale.setTo( -branchGap, branchGap)
                tempBranch.x += 15

            } else {
                tempBranch.scale.setTo( branchGap, branchGap)
                tempBranch.x -= 15
            }
            

            nBranches -= 1
            
            console.log(branchDirection[aux])
        }
    }

    player = game.add.sprite(threadPosition[actualThread], playerYpos, "character");
    player.scale.setTo(0.27, 0.27);
    player.x = threadPosition[actualThread] - player.width / 2;

    player.enableBody = true;

    createDisparo(DISPARO_GROUP_SIZE)//crear grupo de disparos
    bugsGroup = game.add.group()//para que los enemigos aparezcan por debajo de tvForeground

    itemGroup = game.add.group();
    itemGroup.enableBody = true;

    ultiGroup = game.add.group();
    ultiGroup.enableBody = true;
    
    //enable collisions
    game.physics.arcade.enable("enemy");
    game.physics.arcade.enable("bomb");
    game.physics.arcade.enable(player);

    createfade();
    
    tvForeground = game.add.image(0, 0, "tv")
    tvForeground.scale.setTo(game.width/tvForeground.width, game.height/tvForeground.height)
    tvForeground.bringToTop();

    bombHUD = game.add.sprite(640,660,"bombHUD",0);
    bombHUD.scale.setTo(0.25,0.25);

    createHUD();
    createLives();

    //timerLifeItems.start();
    timerEnemy.start();


}

function spawnUlti() {

    const randomThread = game.rnd.integerInRange(0, nThreads - 1); // Generate random thread
    var x = threadPosition[randomThread];
    const ulti = ultiGroup.create(x, 30, 'bomb');
    ulti.anchor.setTo(0.5, 0.5);
    ulti.scale.setTo(0.27,0.27);
    console.log("ULTI SPAWN");
    enemyCounter = 0;


}

function moveUlti() {
    
    var children = ultiGroup.children;
    var numChildren = children.length;
    for (var i = 0; i < numChildren; i++) {
      var ulti = children[i];
      ulti.y += 2; }
}

function tiraBomba() {

    

    if (haveUlti == true) {

        //FLASHLIGHT ANIMATION
        const flashlight = game.add.sprite(0, 0, 'whiteFlash');
        flashlight.width = game.width;
        flashlight.height = game.height;

        flashlight.alpha = 0;


        const fadeInTween = game.add.tween(flashlight).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None);
        const fadeOutTween = game.add.tween(flashlight).to({ alpha: 0 }, 500, Phaser.Easing.Linear.None);

        fadeInTween.chain(fadeOutTween);


        // Start the initial fade in
        fadeInTween.start();


        destroyAllEnemies()
        console.log("Tengo bomba");
        bombHUD.frame = 0;
        haveUlti = false;

    }

    else {
        notBombAvailable(); //Texto en el HUD de que no has cogido una bomba
    }

}

function destroyAllEnemies() {

    for (let i = 0; i < bugsArray.length; i++) {
      bugsArray[i].img.destroy();
    }
    bugsArray = []; // clear the bugsArray
}

function deleteUlti(thisShot,thisUlti) {
    console.log("BORRO DISPARO E ULTI")
    thisShot.kill();
    thisUlti.kill();
}

function gotUlti(thisPlayer,thisUlti) {

    haveUlti = true;
    BombAvailable();
    bombHUD.frame = 1;
    thisUlti.kill();
}

function checkScoreC() {

    if ( level = 3 && score > 145 ){
        level = 0
        timerC = actualTime
        generalTime += actualTime
        gameFinished = true
        cambioSound.play();
        fadeSceneOutBetweenScenes("endScreen");

    } else if ( level = 2 && score > 95 ){
        cambioSound.play();
        levelCPhase3();

    } else if ( level = 1 && score > 45 ){
        cambioSound.play();
        levelCPhase2();

    } //else: está en la fase 1
}



function levelCPhase2() {

    level = 2;
    //spawnEnemyRnd = game.rnd.integerInRange(1500,2000) //entre 1 y 2 segundos
    //timerEnemy.loop(17500, spawn); //actualizar nuevo timer
    spawnItemRnd = game.rnd.integerInRange(6000,8000) //entre 6 y 8 segundos
    bugVelocity = 0.4;

    updateLevel(); //HUD
    
}

function levelCPhase3() {

    level = 3;
    spawnEnemyRnd = game.rnd.integerInRange(1500,2000) //entre 1 y 2 segundos
    //timerEnemy.loop(spawnEnemyRnd, spawn); //actualizar nuevo timer
    spawnItemRnd = game.rnd.integerInRange(6000,8000) //entre 6 y 8 segundos
    bugVelocity = 0.65;

    updateLevel(); //HUD
    
}

function updateGame() {
    
    elapsedTime = game.time.elapsed; //get time between frames

    moveBugsLevelB(elapsedTime);
    checkScoreC();
    updateScore();
    updateTimer();
    checkItemCollision();
    checkBulletItemCollision();

    if (ultiGroup && ultiGroup.children) { //si existe el grupo y tiene hijos
        moveUlti();
    
    }

    if (itemGroup && itemGroup.children) { //si existe el grupo y tiene hijos
        moveItems();

        game.physics.arcade.overlap( disparo,itemGroup, deleteItem, null, this )
        
        
    }

    game.physics.arcade.overlap(player,itemGroup, ganoVida, null, this )

    game.physics.arcade.overlap(player,ultiGroup, gotUlti, null, this )
    game.physics.arcade.overlap( disparo,ultiGroup, deleteUlti, null, this )

    //if mouse input is active
    if( !isKeyboradActive) {
        let mousePos = game.input.mousePointer.x
        for ( let i=0; i < threadPosition.length; i++){
            if(threadPosition[i] -35 < mousePos && threadPosition[i] +35 > mousePos){
                player.x = threadPosition [i] - player.width / 2
            }
        }
        
    }

    if (isShooting) {
        player.frame = 1;
    } 

    else {
        player.frame = 0;
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