let settingsState = {
    preload: preloadAssets,
    create: initGame
};

let settingsText;
let buttonMouse, buttonKeyboard;
let arrThreads = []
let isKeyboradActive = true, isMouseActive = false;


// methods for each phase of the state
function preloadAssets() { 
    game.load.image("tele","assets/imgs/BG-1.png");
    game.load.image("bg","/assets/SETTINGS SCREEN/settingsBG.png");
    game.load.spritesheet("keyboard","assets/SETTINGS SCREEN/keyboardSpritesheet.png",519,519);
    game.load.spritesheet("mouse","assets/SETTINGS SCREEN/mouseSpritesheet.png",519,519);
    game.load.spritesheet("threads","assets/SETTINGS SCREEN/threadsSpritesheet.png",182,519);
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
    let initialThreadPosX = 200;
    let threadButton;
    threadButton.scale.setTo(0.2, 0.2);

    for (let i=0; i<9; i++) {
        threadButton = game.add.button(initialThreadPosX,500,"threads", onButtonThread(i), 0,0,0,0);
        arrThreads.push(threadButton);
        initialThreadPosX += threadButton.width;
    }
}

//lolololo

function onButtonMouse() {

    buttonMouse.setFrames(1,1,1,1);
    buttonKeyboard.setFrames(1,0,0,0);
    isKeyboradActive = false;
    isMouseActive = true;
    game.state.start("inicio");
}


function onButtonKeyboard() {

    buttonKeyboard.setFrames(1,1,1,1);
    buttonMouse.setFrames(1,0,0,0);
    isKeyboradActive = true
    isMouseActive = false
    game.state.start("inicio");
}
    
function onButtonThread(button) {
    for (let i= 0; i<9; i++) {
        if (i<= button) {
            button.setFrames(1,1,1,1);
        }
        else {
            button.setFrames(0,0,0,0);
        }
    }
}