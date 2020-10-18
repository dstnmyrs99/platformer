class GameOverScene extends Phaser.Scene {
  constructor() {
    super('GameOverScene');
  }
  create() {
      console.log(hiScores);
    this.add.text(width / 4, height / 2 , `High Scores \n\n${hiScores[0].name} ${hiScores[0].score}
                                    \n${hiScores[1].name} ${hiScores[1].score}
                                    \n${hiScores[2].name} ${hiScores[2].score}
                                    \n${hiScores[3].name} ${hiScores[3].score}
                                    \n${hiScores[4].name} ${hiScores[4].score}`, {
      fontSize: '16px',
      fill: '#FF0000',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(width / 2, height / 2, `Your Score: ${score} Points`, {
      fontSize: '16px',
      fill: '#FF0000',
      fontStyle: 'bold',
    }).setOrigin(0.5);
    this.add.text(width / 2, height / 2 +(height / 10), `Click Here To Play Again!`, {
      fontSize: '16px',
      fill: '#FF0000',
      fontStyle: 'bold',
    }).setOrigin(0.5).setInteractive( {useHandCursor: true}).on('pointerdown', () => {
      speed = -150;
      score = 0;
      gameIsOver = false;
       this.scene.start('PlayScene');
     });

     };


}
