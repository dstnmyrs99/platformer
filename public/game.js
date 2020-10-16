let speed = -150;
let width = window.innerWidth;
let height = window.innerHeight;
let score = 0;
let jumpTimer = 0;

const config = {
  width: width,
  height: height,
  scene: [
    BootScene,
    TitleScene,
    PlayScene,
  ],
  type: Phaser.CANVAS,
  audio: {
    disableWebAudio: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      fps: 60,
      gravity: {y : 600},
    }
  },
};

const game = new Phaser.Game(config);
