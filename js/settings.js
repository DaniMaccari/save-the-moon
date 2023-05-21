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
    game.load.image("bg","/assets/imgs/SETTINGS SCREEN/settingsBG.png");
    game.load.spritesheet("keyboard","assets/imgs/SETTINGS SCREEN/keyboardSpritesheet.png", 519, 519);
    game.load.spritesheet("mouse","assets/imgs/SETTINGS SCREEN/mouseSpritesheet.png", 519, 519);
    game.load.spritesheet("threads","assets/imgs/SETTINGS SCREEN/threadsSpritesheet.png", 182, 519);
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
    let initialThreadPosX = 230;
    arrThreads = []

    for (let i=0; i<9; i++) {
        let threadButton = game.add.button(initialThreadPosX, 480, "threads", onButtonThread, 1,0,1,0)
        if ( i<3 ){
            threadButton.setFrames( 1, 0, 1, 0)
        }
        threadButton.scale.setTo(0.17, 0.17)
        arrThreads.push(threadButton)
        initialThreadPosX += threadButton.width +10
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
    
function onButtonThread(buttonIndex) {

    let stop = false
    for (let i = 0; i < arrThreads.length; i++) {

        //update eachbutton
        if ( !stop || i<3) {
            arrThreads[i].setFrames( 1, 0, 1, 0)
        } else {
            arrThreads[i].setFrames( 0, 1, 0, 1)
        }
        
        //when reached clicked buton
        if (arrThreads[i] == buttonIndex) {
            stop = true
        } 
    }
}