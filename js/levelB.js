const branchPosition = [], branchSide = [];
let nBranches;

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
    game.load.image("levelA", "assets/imgs/start.png")
    game.load.image("disparo", "assets/imgs/punto.png")
    game.load.image("bg", "assets/imgs/BG.png")
    game.load.image("tv", "assets/imgs/BG-1.png")
    line = game.add.sprite(-10, 0, "drawLine")
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
        
        tempLine.tint = 0xff0080; //change color
        
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