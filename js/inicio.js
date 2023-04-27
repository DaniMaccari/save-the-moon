let initialState = {
    preload: loadAssets,
    create : displayScreen
};

let btnStart, btnInfo, btnCredits;

function loadAssets(){
    
    game.load.image("start","assets/imgs/start.png");
    game.load.image("info","assets/imgs/info.png");
    game.load.image("credits","assets/imgs/credits.png");
    game.load.image("bg","assets/imgs/bg.jpg");
    
}

function displayScreen(){

    game.input.enabled = true;
    game.add.image(0,0,"bg")

    let textTitle = 'Save The Moon';
    let styleTitle = {

        fontSize: '32pt',
        fontWeight: 'bold',
        fill: '#b60404'
    };

    game.add.text(50, game.world.height / 6, textTitle, styleTitle);

    btnStart = game.add.button(game.world.width / 1.75, game.world.height / 3,
    'start', onStartButtonPressed);
    btnInfo = game.add.button(game.world.width / 1.75, game.world.height / 3 + 120,
    'info', onInfoButtonPressed);
    btnCredits = game.add.button(game.world.width / 1.75, game.world.height / 3 + 240,
    'credits', onCreditsButtonPressed);

    function onStartButtonPressed(){
        game.state.start("juego");
    }

    function onInfoButtonPressed(){
        game.state.start("settings");
    }

    function onCreditsButtonPressed(){
        game.state.start("credits");
    }

}