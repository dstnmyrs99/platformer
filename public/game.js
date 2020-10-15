let speed = -150;
const config = {
  width: 800,
  height: 600,
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
