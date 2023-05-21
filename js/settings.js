let settingsState = {
    preload: preloadAssets,
    create: initGame
};

let settingsText;
let buttonMouse, buttonKeyboard;



// methods for each phase of the state
function preloadAssets() { 
    game.load.image("tele","assets/imgs/BG-1.png");
    game.load.image("bg","/assets/SETTINGS SCREEN/settingsBG.png");
    game.load.image("thread_on","/assets/SETTINGS SCREEN/thread_on.png");
    game.load.image("thread_off","/assets/SETTINGS SCREEN/thread_off.png");
    game.load.spritesheet("keyboard","assets/SETTINGS SCREEN/keyboardSpritesheet.png",519,519);
    game.load.spritesheet("mouse","assets/SETTINGS SCREEN/mouseSpritesheet.png",519,519);
}

function initGame() {

    //FONDO
    BG = game.add.image(0,0,"bg")
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)

    //Botones del Keyboard y el mouse
    buttonKeyboard = game.add.button(440, 200, "keyboard", onButtonKeyboard,0,1,0,1);
    buttonKeyboard.scale.setTo(0.4, 0.4);
    buttonMouse = game.add.button(180, 200, "mouse", onButtonMouse,0,1,0,1);
    buttonMouse.scale.setTo(0.4, 0.4);

    //MARCO DE LA TELE
    TV = game.add.image(0,0,"tele")
    TV.scale.setTo(game.width/TV.width, game.height/TV.height)
    game.input.enabled = true;

    //THREAD SELECTOR
    
}

    
function onButtonMouse() {


    this.game.global.isKeyboradActive = false;
    this.game.global.isMouseActive = true;
    game.state.start("inicio");
}


function onButtonKeyboard() {
    this.game.global.isKeyboradActive = true
    this.game.global.isMouseActive = false
    game.state.start("inicio");
}
    
