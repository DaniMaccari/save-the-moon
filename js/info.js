let infoState = {   
    preload: loadAssets,
    create : displayScreen};

function loadAssets(){

    game.load.image("start","assets/imgs/start.png");
    game.load.image("bg","assets/imgs/bg.jpg");
    
};

function displayScreen(){

    game.input.enabled = true;
    game.add.image(0,0,"bg");

    btnBack = game.add.button(game.world.width / 2.75, game.world.height / 3 + 240,
    'start', onBackButtonPressed);

    function onBackButtonPressed(){
        game.state.start("levelA");
    };

<<<<<<< HEAD
}
=======
        btnBack = game.add.button(game.world.width / 2.75, game.world.height / 3 + 240,
        'start', onBackButtonPressed);

    }
    
    function onBackButtonPressed(){
        game.state.start("inicio");
    };

>>>>>>> d43a1f3401f20a7f16ee7983b1eb076bdedc0b49
