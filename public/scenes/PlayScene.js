class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');

  }
  preload(){

  }

  create(){
    this.death = this.sound.add('death');
    this.bgMusic = this.sound.add('bg', { loop: true });
    this.bgMusic.play();
    this.jump = this.sound.add('jump');
    this.pickupSound = this.sound.add('pickup');
      this.bg = this.add.sprite(width / 2, height / 2, 'bg').setOrigin(0.5);
      this.bg.setDisplaySize(width, height);
      this.cursor = this.input.keyboard.createCursorKeys();
      this.floor = this.physics.add.group({
        immovable: true,
        allowGravity: false,
        key: 'ground',
        repeat: width / 65,
        setXY: { x: 70, y: height - 43, stepX: 89 },
        setScale: { x: 0.7, y: 0.7}
    });
    this.highGround = this.physics.add.group({
      immovable: true,
      allowGravity: false,
      key: 'ground2',
      repeat: width / 100,
      setXY: { x: 1000, y: height - 200, stepX: 300, stepY: -22},
      setScale: { x: 0.7, y: 0.2}
  });
    this.shrooms = this.physics.add.group({
      immovable: false,
      allowGravity: false,
      key: 'shroom',
      repeat: width  / 100,
      setXY: { x: 600, y: height - 100, stepX: 100 },
      setScale: { x: 0.4, y: 0.4}
  });

      this.player = this.physics.add.sprite(width / 2, 100, 'dino1').setScale(0.1).setSize(200, 400).setOffset(20, 0);
      this.player.play('walk');
      this.physics.add.overlap(this.shrooms, this.player, this.collect, null, this);
    this.physics.add.collider(this.floor, this.player);
    this.physics.add.collider(this.highGround, this.player);
    this.scoreText = this.add.text(width / 2, 50, 'Score: 0', { fontSize: '50px', fill: '#000' }).setOrigin(0.5);
  }

  update(){
    this.player.body.velocity.x = 0;
    if (this.cursor.up.isDown || this.input.activePointer.isDown){
      if(jumpTimer === 0  && this.player.body.touching.down){
        this.jump.play();

        this.player.play('jump').once('animationcomplete', () => this.player.play('walk'));
        speed -= 5;
        jumpTimer = 1;
        this.player.body.velocity.y = -200;
      }else if(jumpTimer > 0 && jumpTimer < 20){
        jumpTimer ++;
        this.player.body.velocity.y = -200 - (jumpTimer);
      }
          }else{
            jumpTimer = 0;
          }
    // if(this.input.activePointer.isDown && this.player.body.touching.down){
    //   this.player.body.velocity.y = -200;
    //   this.player.play('jump').once('animationcomplete', () => this.player.play('walk'));
    //   speed -= 5;
    //}
    if(this.player.y > height){
      this.death.play();
      this.bgMusic.stop();
      if(!gameIsOver){
      this.gameover();
    }
    }
    this.floor.children.iterate(function (child) {
        child.body.velocity.x = speed;
        if(child.x < -40){
          child.x = width + (Math.random()*100);

        }
  });
  this.highGround.children.iterate(function (child) {
      child.body.velocity.x = speed - 50;
      if(child.x < -40){
        child.x = width + (Math.random()*400);
        child.y = Phaser.Math.Between(height - 100, 10 );

      }
});
  this.shrooms.children.iterate(function (child) {
      child.body.velocity.x = speed;
      if(child.x < -40){
        child.x = width + (Math.random()*100);
        child.y = Phaser.Math.Between(height - 100, 10 );
      }
});
}
  collect(player, shroom){
    score += 1;
    shroom.x = width + (Math.random()*100);
    shroom.y = Phaser.Math.Between(height - 100, 10 );
    this.scoreText.setText('Score: ' + score);
    this.pickupSound.play();
  }
  gameover(){
    gameIsOver = true;
    if(score > hiScores[4].score){
      this.name = prompt("Enter your name");
      postScores('/newScore', {name: this.name, score: score})
      .then(this.newScores2 = postData('/scores').then((newName) => {
   hiScores = newName;

}))
}
    setTimeout(()=>this.scene.start('GameOverScene'), 1000);
  }
}
