

const BG_COLOR = "#AA95FF";

const GAME_AREA_WIDTH = 500;
const GAME_AREA_HEIGHT = 400;
let settingsText;

// game instance
let game = new Phaser.Game(GAME_AREA_WIDTH, GAME_AREA_HEIGHT,
    Phaser.CANVAS, "game");


// Entry point
window.onload = startGame;

function startGame() {
    game.state.add('settings', settingsState);
    game.state.start('settings');
    
}

//settings STATE phases
let settingsState = {
    preload: preloadAssets,
    create: initGame,
    update: updateGame
};

// methods for each phase of the state
function preloadAssets() {
}

function initGame() {

    game.stage.backgroundColor = BG_COLOR;
    settingsText = game.add.text(160,30, "SETTINGS", {fontSize: "35px", fill: "#000"});

    //Keyboard callback ESTO HABRÁ QUE PASARSELO A LA MAIN ESCENA CREO DE ALGUNA FORMA
    game.input.keyboard.onDownCallback = getKeyboardInput;

    
    }
    
function updateGame() {}

function getKeyboardInput(e) {

    if (e.KeyCode == Phaser.Keyboard.A || e.KeyCode == Phaser.Keyboard.LEFT) {
        //Movimiento hacia la izquierda
    }

    else if (e.KeyCode == Phaser.Keyboard.D || e.KeyCode == Phaser.Keyboard.RIGHT) {
        //Movimiento hacia la derecha
    }

}