

const BG_COLOR = "#AA95FF";

const GAME_AREA_WIDTH = 400;
const GAME_AREA_HEIGHT = 400;


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
    
    }
    
function updateGame() {}