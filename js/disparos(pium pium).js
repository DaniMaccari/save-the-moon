

const DISPARO_GROUP_SIZE = 40;
const DISPARO_OFFSET_X = 10;
const DISPARO_OFFSET_Y = 10;
const DISPARO_VEL = 500;
let fireButton;
let disparo;


function loadAssets(){

    game.load.image("disparo","assets/imgs/punto.png");

}

function displayScreen(){

    createDisparo(DISPARO_GROUP_SIZE);
    manageDisparos(); //ns si es
    //exactamente aqui o en los input

}

function createDisparo(number)
{
    disparo = game.add.group();
    disparo.enableBody = true;
    disparo.createMultiple(number, "disparo");
    disparo.callAll("events.onOutOfBounds.add",
    "events.onOutOfBounds", resetMember);
    disparo.callAll("anchor.setTo","anchor",0.5, 1.0);
    disparo.setAll("checkWorldBounds",true);

}

function resetMember(item)
{
    item.kill();
}

function getKeyboardInput(e) {
    fireButton = game.input.keyboard.addKey
    (Phaser.Keyboard.SPACEBAR);
}

//esto creo que debería ir todo en lo
//keyboard pero aquí lo separan (probar)

function manageDisparos(){

    if(fireButton.justDown || game.input.leftButton.
        justPressed(30)) {fireDisparos();}

}

function fireDisparos() {

    let x = player.x - DISPARO_OFFSET_X;
    let y = player.y - DISPARO_OFFSET_Y;
    let vd = -DISPARO_VEL;
    let elDisparo = shootDisparo(x,y,vd);

}

function shootDisparo(x, y, vd)
{
    let shot = disparo.getFirstExists(false);

    if (shot) {
        shot.reset(x, y);
        shot.body.velocity.y = vd;
        }
        return shot;
}