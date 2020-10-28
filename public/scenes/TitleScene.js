class TitleScene extends Phaser.Scene {
  constructor() {
    super('TitleScene');
  }

  preload() {

  }

  create() {
    this.bg = this.add.sprite(width / 2, height / 2, 'menu').setOrigin(0.5);
    this.bg.setDisplaySize(width, height);
    this.cursors = this.input.keyboard.createCursorKeys();
    this.add.text(width / 2, height / 4, `Axle's Game`, {
      fontSize: '50px',
      fill: 'black',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(width / 2, height / 2, `Start Game`, {
      fontSize: '32px',
      fill: 'black',
      fontStyle: 'bold',
    }).setOrigin(0.5).setInteractive( {useHandCursor: true}).on('pointerdown', () => {
      speed = -150;
      score = 0;
       this.scene.start('PlayScene');
     });
     this.add.text(width / 2, height / 2 + 50, `How to play`, {
       fontSize: '32px',
       fill: 'black',
       fontStyle: 'bold',
     }).setOrigin(0.5).setInteractive( {useHandCursor: true}).on('pointerdown', () => {
       speed = -150;
       score = 0;
        this.scene.start('HowToPlayScene');
      });
      this.add.text(width / 2, height / 2 + 100, `Top Scores`, {
        fontSize: '32px',
        fill: 'black',
        fontStyle: 'bold',
      }).setOrigin(0.5).setInteractive( {useHandCursor: true}).on('pointerdown', () => {
        speed = -150;
        score = 0;
         this.scene.start('TopScoresScene');
       });

  }
}
