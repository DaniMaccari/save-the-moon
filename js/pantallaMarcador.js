

class HallOfFame {

    constructor(thesize = 10) {
        this.size = thesize;
        this.list = [];
    }

    addNewScore(newScore) {
        let i;
        for (i = 0 ; i < this.list.length ; i++)
            if (newScore > this.list[i].score)
                break;
        let instant = (new Date()).toUTCString();
        this.list.splice(i, 0, {score: newScore, date: instant});
        if (this.list.length > this.size)
            this.list.pop();
        if (i < this.size)
            return i;
        else
            return -1;
    }

    loadFromStorage() {
        if (localStorage.sizeHOF !== undefined)
            this.size = JSON.parse(localStorage.sizeHOF);
        if (localStorage.listHOF !== undefined)
            this.list = JSON.parse(localStorage.listHOF);
    }

    saveToStorage() {
        localStorage.sizeHOF = JSON.stringify(this.size);
        localStorage.listHOF = JSON.stringify(this.list);
    }

    resetStorage() {
        localStorage.removeItem("sizeHOF");
        localStorage.removeItem("listHOF");
    }

    getSize() {
        return this.size;
    }

    setSize(thesize) {
        if (thesize !== undefined) {
            this.size = thesize;
            while (this.list.length > this.size)
                this.list.pop();
        }
    }

    displayOnStage(x, y, w, h) {
        let hT = Math.floor(0.25 * h);
        let sT = Math.floor(0.25 * 0.6 * h);
        let styleT = {font:sT+'px Arial', fill:'#FFFFFF',
                      boundsAlignH:'center', boundsAlignV:'bottom'};
        let title = game.add.text(0, 0, 'Hall of Fame', styleT);
        title.setTextBounds(x, y, w, hT);

        let hL = Math.floor(0.75 * 0.1 * h);
        let sL = Math.floor(0.75 * 0.1 * 0.8 * h);
        let wCP = Math.floor(0.06 * w);
        let wCS = Math.floor(0.18 * w);
        let wCD = Math.floor(0.76 * w);
        let styleL = {font:sL+'px Arial', fill:'#FFFFFF',
                      boundsAlignH:'right', boundsAlignV:'bottom'};
        let placeL, scoreL, dateL;
        for (let i = 0 ; i < this.list.length ; i++) {
            placeL = game.add.text(0, 0, i+1, styleL);
            placeL.setTextBounds(x, y+hT+hL*i, wCP, hL);

            scoreL = game.add.text(0, 0, this.list[i].score, styleL);
            scoreL.setTextBounds(x+wCP, y+hT+hL*i, wCS, hL);

            dateL = game.add.text(0, 0, this.list[i].date, styleL);
            dateL.setTextBounds(x+wCP+wCS, y+hT+hL*i, wCD, hL);
        }
    }

}

let shooterHOF;
let msgUser;

let marcadorState = {
    preload: preloadHOF,
    create: createHOF
};

function restartPlay() {
    game.state.start('inicio');
}


function preloadHOF() {

    game.load.image("bg", "assets/imgs/BG.png");
    game.load.image("tv", "assets/imgs/BG-1.png");

    shooterHOF = new HallOfFame();
    shooterHOF.loadFromStorage();
    shooterHOF.addNewScore(score);
}


function createHOF() {
    BG = game.add.image(0, 0, "bg");
    BG.scale.setTo(game.width/BG.width, game.height/BG.height)

    shooterHOF.displayOnStage(150, 100, 500, 400);

    let msg = game.add.text(0, 0, msgUser,
              {font:'27px Arial', fill:'#FFFFFF',
               boundsAlignH:'center', boundsAlignV:'bottom'});
    msg.setTextBounds(0, game.world.height-150, game.world.width, 40);



    tvForeground = game.add.image(0, 0, "tv")
    tvForeground.scale.setTo(game.width/tvForeground.width, game.height/tvForeground.height)

    let again = game.add.text(0, -275, "Press 'R' to go back to the beginning.",
    {font:'27px Arial', fill:'#FFFFFF',
     boundsAlignH:'center', boundsAlignV:'bottom'});
    again.setTextBounds(0, game.world.height-80, game.world.width, 40);
        
    let rkey = game.input.keyboard.addKey(Phaser.Keyboard.R);
    rkey.onDown.addOnce(restartPlay, this);
}


