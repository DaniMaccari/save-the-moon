let game;

window.onload = startGame;

function startGame(){
    game = new Phaser.Game(800,600, Phaser.CANVAS, "Save The Moon");

    //Inicio
    game.state.add("inicio", initialState);
    game.state.start("inicio");
    
    game.state.add("juego", juegoState);
    //game.state.add("info", infoState);
    game.state.add("credits", creditState);
    game.state.add("settings", settingsState);
}
