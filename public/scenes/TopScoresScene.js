class TopScoresScene extends Phaser.Scene {
  constructor() {
    super('TopScoresScene');
  }

  preload() {

  }

  create(){
    this.add.text(width / 2, height / 2 , `High Scores \n\n${hiScores[0].name} ${hiScores[0].score}
                                    \n${hiScores[1].name} ${hiScores[1].score}
                                    \n${hiScores[2].name} ${hiScores[2].score}
                                    \n${hiScores[3].name} ${hiScores[3].score}
                                    \n${hiScores[4].name} ${hiScores[4].score}`, {
      fontSize: '16px',
      fill: '#FF0000',
      fontStyle: 'bold',
    }).setOrigin(0.5);

    this.add.text(width / 2, height - 50, `Start Game`, {
      fontSize: '32px',
      fill: 'black',
      fontStyle: 'bold',
    }).setOrigin(0.5).setInteractive( {useHandCursor: true}).on('pointerdown', () => {
      speed = -150;
      score = 0;
       this.scene.start('PlayScene');
     });
     this.add.text(width / 2, height - 100, `Main Menu`, {
       fontSize: '32px',
       fill: 'black',
       fontStyle: 'bold',
     }).setOrigin(0.5).setInteractive( {useHandCursor: true}).on('pointerdown', () => {
       speed = -150;
       score = 0;
        this.scene.start('TitleScene');
      });
  }

}
