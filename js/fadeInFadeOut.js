
function createfade() {
    fadeRectangle = game.add.sprite(0,0, "pantallaNegra");
    fadeRectangle.width = game.width;
    fadeRectangle.height = game.height;
    fadeRectangle.alpha = 1;
    fadeSceneIn();
}

function fadeSceneIn() {
    fadeTween = game.add.tween(fadeRectangle)
    fadeTween.to({ alpha: 0 }, 400, Phaser.Easing.Linear.None, true);
}

function fadeSceneOut(siguienteEscena) {


    fadeTween = game.add.tween(fadeRectangle)
    fadeTween.to({ alpha: 1 }, 400, Phaser.Easing.Linear.None, true);
    
    fadeTween.onComplete.add(function() {
      game.state.start(siguienteEscena);
    }, this);
  }