class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }
  create() {
    this.add.text(width / 2, height / 2 -100, `Game Over`, {
      fontSize: '32px',
      fill: '#FF0000',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(width / 2, height / 2, `Your Score: ${score} Points`, {
      fontSize: '32px',
      fill: '#FF0000',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(width / 2, height / 2 +100, `Click Here To Play Again!`, {
      fontSize: '32px',
      fill: '#FF0000',
      fontStyle: 'bold',
    }).setOrigin(0.5).setInteractive( {useHandCursor: true}).on('pointerdown', () => {
      speed = -150;
      score = 0;
       this.scene.start('PlayScene');
     });

  }
}
