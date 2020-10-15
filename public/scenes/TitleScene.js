class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {

  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.text(width / 2, height / 2, `Axle's Game`, {
      fontSize: '32px',
      fill: '#FF0000',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(width / 2, height / 2 +100, `Click Here To Play!`, {
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
