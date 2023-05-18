let settingsState = {
    preload: preloadAssets,
    create: initGame
};

let settingsText;
let buttonMouse, buttonKeyboard;

// methods for each phase of the state
function preloadAssets() {
    game.load.image("bg","assets/imgs/bg.jpg");
    game.load.image("boton","assets/imgs/start.png")
}

function initGame() {

    
    game.input.enabled = true;
    game.add.image(0,0,"bg");

    //settingsText = game.add.text(160,30, "SETTINGS", {fontSize: "35px", fill: "#000"});ç
    buttonMouse = game.add.button(160, 100, "boton", onButtonMouse);
    buttonKeyboard = game.add.button(500, 100, "boton", onButtonKeyboard);

    /*Keyboard callback ESTO HABRÁ QUE PASARSELO A LA MAIN ESCENA IGUAL QUE LO DE KEYBOARD INPUT
    game.input.keyboard.onDownCallback = getKeyboardInput;
    game.input.mouse.onDownCallback = getMouseInput;
    */
    
}

    
function onButtonMouse() {
    //this.input.keyboard.enabled = false
    //this.input.mouse.enabled = true
    
    game.state.start("inicio");
}

function onButtonKeyboard() {
    //this.input.mouse.enabled = false
    //this.input.keyboard.enabled = true

    game.state.start("inicio");
}
    
