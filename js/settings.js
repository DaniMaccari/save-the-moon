
const BG_COLOR = "#AA95FF";

let settingsText;
let buttonMouse, buttonKeyboard;

let settingsState = {
    preload: preloadAssets,
    create: initGame
};


// methods for each phase of the state
function preloadAssets() {
}

function initGame() {

    game.input.enabled = true;
    
    game.stage.backgroundColor = BG_COLOR;
    settingsText = game.add.text(160,30, "SETTINGS", {fontSize: "35px", fill: "#000"});ç
    buttonMouse = game.add.button(160, 70, "onButtonMouse");
    buttonKeyboard = game.add.button(160, 70, "onButtonKeyboard");


    //Keyboard callback ESTO HABRÁ QUE PASARSELO A LA MAIN ESCENA IGUAL QUE LO DE KEYBOARD INPUT
    game.input.keyboard.onDownCallback = getKeyboardInput;
    game.input.mouse.onDownCallback = getMouseInput;
    
    }

function onButtonMouse() {
    //disable Keyboard
}

function onButtonKeyboard() {
    //disable mouse

}
    
//function updateGame() {}

function getKeyboardInput(e) {

    if (e.KeyCode == Phaser.Keyboard.A || e.KeyCode == Phaser.Keyboard.LEFT) {
        //Movimiento hacia la izquierda
    }

    else if (e.KeyCode == Phaser.Keyboard.D || e.KeyCode == Phaser.Keyboard.RIGHT) {
        //Movimiento hacia la derecha
    }

}