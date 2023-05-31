let settingsText;
let buttonMouse, buttonKeyboard; 
let backButton;
let arrThreads = []
let fadeTweenConf;
let fadeRectangleConf;

//---------------------------------------------
//--- SETTINGS ------------------------------
//---------------------------------------------

let settingsState = {
    preload: preloadSettingsAssets,
    create: initSettingsGame
};

// methods for each phase of the state
function preloadSettingsAssets() { 
    game.load.image("tele","assets/imgs/BG-1.png");
    game.load.image("bg","assets/imgs/SETTINGS SCREEN/settingsBGG.png");
    game.load.spritesheet("back","assets/imgs/backSpritesheet.png", 519,519);
    game.load.spritesheet("keyboard","assets/imgs/SETTINGS SCREEN/keyboardSpritesheet.png", 519, 519);
    game.load.spritesheet("mouse","assets/imgs/SETTINGS SCREEN/mouseSpritesheet.png", 519, 519);
    game.load.spritesheet("threads","assets/imgs/SETTINGS SCREEN/confthreadSpritesheet.png", 182, 182);
    game.load.image("pantallaNegra","assets/imgs/Solid_black.png")
}

function initSettingsGame() {

    //BACKGROUND
    BG = game.add.image(0,0,"bg")
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)

    //Keyboard and mouse
    buttonKeyboard = game.add.button(440, 200, "keyboard", onButtonKeyboard,0,1,0,1);
    buttonKeyboard.scale.setTo(0.4, 0.4);
    buttonMouse = game.add.button(180, 200, "mouse", onButtonMouse,0,1,0,1);
    buttonMouse.scale.setTo(0.4, 0.4);
    
    //TV FOREGROUNDbuttonKeyboard = game.add.button(440, 200, "keyboard", onButtonKeyboard,0,1,0,1);
    TV = game.add.image(0,0,"tele")
    TV.scale.setTo(game.width/TV.width, game.height/TV.height)
    game.input.enabled = true;


    //Back button
    backButton = game.add.button(370, 530, "back", function() {fadeSceneOut("inicio"); },0,1,0,1);
    backButton.scale.setTo(0.17, 0.17);

    //THREAD SELECTOR
    let initialThreadPosX = 210;
    arrThreads = []

    for (let i=0; i<9; i++) {
        let threadButton = game.add.button(initialThreadPosX, 480, "threads", onButtonThread, 1,0,1,0)
        if ( i<3 ){
            threadButton.setFrames( 1, 0, 1, 0)
        }
        threadButton.scale.setTo(0.2, 0.2)
        arrThreads.push(threadButton)
        initialThreadPosX += threadButton.width +10
    }

    createfade();
}

//activate mouse, deactivate keyboard
function onButtonMouse() {
    
    buttonMusic.play();
    buttonMouse.setFrames(1,1,1,1)
    buttonKeyboard.setFrames(1,0,0,0)
    isKeyboradActive = false
    
}

//activate keyboard, deactivate mouse
function onButtonKeyboard() {

    buttonMusic.play();
    buttonKeyboard.setFrames(1,1,1,1)
    buttonMouse.setFrames(1,0,0,0)
    isKeyboradActive = true
    
}
    
function onButtonThread(buttonIndex) {
    
    buttonMusic.play();
    let stop = false
    let contador = 0

    for (let i = 0; i < arrThreads.length; i++) {

        //update eachbutton
        if ( !stop || i<3) {
            arrThreads[i].setFrames( 1, 0, 1, 0)
            contador += 1
        } else {
            arrThreads[i].setFrames( 0, 1, 0, 1)
        }
        
        //when reached clicked buton
        if (arrThreads[i] == buttonIndex) {
            stop = true
        } 
    }

    nThreads = contador
    console.log(nThreads)
}

