let settingsState = {
    preload: preloadAssets,
    create: initGame
};

let settingsText;
let buttonMouse, buttonKeyboard;

// methods for each phase of the state
function preloadAssets() {
    game.load.image("bg","assets/imgs/bg.jpg");
}

function initGame() {

    
    game.input.enabled = true;
    game.add.image(0,0,"bg");

    //settingsText = game.add.text(160,30, "SETTINGS", {fontSize: "35px", fill: "#000"});ç
    buttonMouse = game.add.button(160, 70, onButtonMouse);
    buttonKeyboard = game.add.button(160, 90, onButtonKeyboard);

    /*Keyboard callback ESTO HABRÁ QUE PASARSELO A LA MAIN ESCENA IGUAL QUE LO DE KEYBOARD INPUT
    game.input.keyboard.onDownCallback = getKeyboardInput;
    game.input.mouse.onDownCallback = getMouseInput;
    */
    
}

    
function onButtonMouse() {
    //disable Keyboard
    game.state.start("inicio");
}

function onButtonKeyboard() {
    //disable mouse
    game.state.start("inicio");
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