class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {

  }

  create() {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.text(280, 150, `Axle's Game`, {
      fontSize: '32px',
      fill: '#FF0000',
      fontStyle: 'bold',
    });
    this.add.text(225, 200, `Click Here To Play!`, {
      fontSize: '32px',
      fill: '#FF0000',
      fontStyle: 'bold',
    }).setInteractive( {useHandCursor: true}).on('pointerdown', () => {
      speed = -150;
       this.scene.start('PlayScene');
     });

  }
}
