let speed = -150;
const config = {
  width: 640,
  height: 360,
  scene: [
    TitleScene,
    PlayScene,
  ],
  type: Phaser.AUTO,
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
