let creditState = { 
    preload: loadAssets,
    create : displayScreen};


let btnBack;


function loadAssets(){
    
        game.load.image("start","assets/imgs/start.png");
        game.load.image("bg","assets/imgs/BG.png");
        game.load.spritesheet("tvAnim","assets/imgs/TVanim.png", 2050,2050);
};
    
function displayScreen(){
    
    game.input.enabled = true;
    BG = game.add.image(0, 0, "bg")
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)


    btnBack = game.add.button(game.world.width / 2.75, game.world.height / 3 + 240,
    'start', onBackButtonPressed);

    function onBackButtonPressed(){
        game.state.start("inicio");

    }

    /*
    game.anims.create({
        key: "TVanimation",
        frameRate:10,
        frames:game.anims.generateFrameNumbers("tvAnim", {start: 0, end: 2}),
        repeat: -1
    });
    */
    
    TV = game.add.sprite(0,0,"tvAnim")
    TV.scale.setTo(game.width/TV.width, game.height/TV.height)
    TV.animations.add("TVanimation", [0, 1, 2], 10, true)
    TV.animations.play("TVanimation")
};