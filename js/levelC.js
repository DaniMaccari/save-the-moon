
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
    game.load.image("disparo", "assets/imgs/punto.png")
    game.load.image("bg", "assets/imgs/BG.png")
    game.load.image("tv", "assets/imgs/BG-1.png")
    game.load.spritesheet("lives","assets/imgs/lifeSpritesheet.png",519,519);  
    game.load.spritesheet("character","assets/imgs/characterSpritesheet.png",519,519); 
    game.load.spritesheet("balas","assets/imgs/balasSpritesheet.png",519,519);
    game.load.image("pantallaNegra","assets/imgs/Solid_black.png")

    game.load.audio("piumSound","assets/snds/disparo.mp3");
    game.load.audio("colisionSound","assets/snds/colision.mp3");
    game.load.audio("tocadoSound","assets/snds/tocado.mp3");
    game.load.audio("cambioSound","assets/snds/cambio.mp3")


}

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

    bugVelocity = 1;
    score = 0;
    part = "C";
    level = 1;
    lives = 5;
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

    spawnEnemyRnd = game.rnd.integerInRange(1500,2500) //entre 1 y 2'5 segundos

    
    
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
    
    //enable collisions
    game.physics.arcade.enable("enemy");
    game.physics.arcade.enable("disparo");
    game.physics.arcade.enable(player);

    createfade();
    
    tvForeground = game.add.image(0, 0, "tv")
    tvForeground.scale.setTo(game.width/tvForeground.width, game.height/tvForeground.height)
    tvForeground.bringToTop();


    createHUD();
    createLives();

    //timerLifeItems.start();
    timerEnemy.start();

}

function updateGame() {
    
    elapsedTime = game.time.elapsed; //get time between frames

    moveBugsLevelB(elapsedTime);
    updateScore();
    updateTimer();
    checkItemCollision();
    checkBulletItemCollision();

    if (itemGroup && itemGroup.children) { //si existe el grupo y tiene hijos
        moveItems();

        game.physics.arcade.overlap( disparo,itemGroup, deleteItem, null, this )
        
        
    }

    game.physics.arcade.overlap(player,itemGroup, ganoVida, null, this )

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