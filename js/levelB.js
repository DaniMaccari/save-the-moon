var branchPosition = [], branchDirection = [];

//START LEVEL B --------------------------------------------
let levelBState = {
     
    preload: loadAssets,
    create : displayScreen,
    update : updateGame
};

function loadAssets() {
    game.load.image("daniel", "assets/imgs/shipYellow.png")
    game.load.image("mariquita", "assets/imgs/mariquita.png")
    game.load.image("drawLine", "assets/imgs/line.png")
    game.load.image("drawBranch", "assets/imgs/line_tumbada.png")
    game.load.image("levelA", "assets/imgs/start.png")
    game.load.image("disparo", "assets/imgs/punto.png")
    game.load.image("bg", "assets/imgs/BG.png")
    game.load.image("tv", "assets/imgs/BG-1.png")
    //line = game.add.sprite(-10, 0, "drawLine")
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
    branchPosition = []
    branchDirection = []

    for (let i = 0; i < nThreads; i++) {
        threadPosition.push( 
        (game.world.width / (nThreads + 1)) * (i + 1) );
        let tempLine = game.add.image(threadPosition[i], 110, "drawLine");
        tempLine.scale.setTo(0.3, 0.3)
        tempLine.x -= (tempLine.width / 2)
        
        //tempLine.tint = 0xff0080; //change color

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

            branchPosition[aux] = game.rnd.integerInRange(200, game.height*0.5)
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

    createHUD();

    timer.start();

}

function moveBugsLevelB() {

    for (let i = 0; i < bugsArray.length; i++) {
        bugsArray[i].move()
        
        //check branch
        if ( !bugsArray[i].isMoving &&
            bugsArray[i].img.y > branchPosition[bugsArray[i].myThread] &&
            bugsArray[i].img.y < branchPosition[bugsArray[i].myThread] +10){
            
            if( game.rnd.integerInRange(0, 2) == 0){
                
                bugsArray[i].isMoving = true
                if ( branchDirection[bugsArray[i].myThread] ) {//hacia la izquierda
                    bugsArray[i].myThread -= 1
                    bugsArray[i].direction = true

                } else { //hacia la derecha
                    bugsArray[i].myThread += 1
                    bugsArray[i].direction = false

                }
                
            }

        }
    }
}

function updateGame() {
    moveBugsLevelB()
    updateScore()
    updateTimer()

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