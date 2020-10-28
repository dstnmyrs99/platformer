class HowToPlayScene extends Phaser.Scene {
  constructor() {
    super('HowToPlayScene');
  }

  preload() {

  }

  create() {
    this.add.text(width / 2, height / 4, `Tap or Click to jump\nCollect as many Mushrooms as you can
Avoid falling in the gaps or getting pushed of the screen\n
POWERUPS\n
Double Jump: Allows a second jump before landing\n
Fly: keep jumping to fly\n
Glide: Hold down jump to stay in the air longer `, {
      fontSize: '20px',
      fill: 'white',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(width / 2, height / 1.25, `Start Game`, {
      fontSize: '32px',
      fill: 'white',
      fontStyle: 'bold',
    }).setOrigin(0.5).setInteractive( {useHandCursor: true}).on('pointerdown', () => {
      speed = -150;
      score = 0;
       this.scene.start('PlayScene');
     });


  }
}
