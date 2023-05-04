let score; // Repeated declaration in hof.js
let scoreText;
let level;
let levelText;
let lives;
let livesText;


function createHUD() {
    let scoreX = 5;
    let levelX = game.world.width / 2;
    let livesX = game.world.width - 5;
    let allY = game.world.height - 25;
    let styleHUD =
    {fontSize: '18px', fill: '#FFFFFF'};

    scoreText = game.add.text(
    scoreX,allY,'Score: '+score,styleHUD);

    levelText = game.add.text(
    levelX,allY,'Level: '+level,styleHUD);

    levelText.anchor.setTo(0.5, 0);

    livesText = game.add.text(
    livesX,allY,'Lives: '+lives,styleHUD);

    livesText.anchor.setTo(1, 0);
}


