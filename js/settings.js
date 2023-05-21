let settingsState = {
    preload: preloadAssets,
    create: initGame
};

let settingsText;
let buttonMouse, buttonKeyboard;



// methods for each phase of the state
function preloadAssets() {
    game.load.image("tele","assets/imgs/BG-1.png");
    game.load.image("bg","assets/imgs/BG.png");
    game.load.image("boton","assets/imgs/start.png")
}

function initGame() {

    //FONDO
    BG = game.add.image(0,0,"bg")
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)

    buttonMouse = game.add.button(160, 100, "boton", onButtonMouse);
    buttonKeyboard = game.add.button(500, 100, "boton", onButtonKeyboard);

    //MARCO DE LA TELE
    TV = game.add.image(0,0,"tele")
    TV.scale.setTo(game.width/TV.width, game.height/TV.height)
    game.input.enabled = true;
    

    //settingsText = game.add.text(160,30, "SETTINGS", {fontSize: "35px", fill: "#000"});ç
    

    /*Keyboard callback ESTO HABRÁ QUE PASARSELO A LA MAIN ESCENA IGUAL QUE LO DE KEYBOARD INPUT
    game.input.keyboard.onDownCallback = getKeyboardInput;
    game.input.mouse.onDownCallback = getMouseInput;
    */
    
}

    
function onButtonMouse() {
    this.game.global.isKeyboradActive = false
    this.game.global.isMouseActive = true
    game.state.start("inicio");
}

function onButtonKeyboard() {
    this.game.global.isKeyboradActive = true
    this.game.global.isMouseActive = false
    game.state.start("inicio");
}
    
