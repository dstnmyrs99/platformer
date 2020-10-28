class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');
  }
  preload(){

  }

  create(){
    this.activePowerup = ''
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
  this.powerups = this.physics.add.group({
    immovable: false,
    allowGravity: false,
    key: 'shroom2',
    repeat: 1,
    setXY: { x: 1500, y: height - 90, stepX: 6000 },
    setScale: { x: 0.5, y: 0.5}
});

      this.player = this.physics.add.sprite(width / 2, 100, 'dino1').setScale(0.1).setSize(1, 400).setOffset(150, 0);
      this.player.play('walk');
      this.physics.add.overlap(this.shrooms, this.player, this.collect, null, this);
      this.physics.add.overlap(this.powerups, this.player, this.powerUp, null, this);
    this.physics.add.collider(this.floor, this.player);
    this.physics.add.collider(this.highGround, this.player);
    this.scoreText = this.add.text(width / 2, 50, 'Score: 0', { fontSize: '50px', fill: '#000' }).setOrigin(0.5);
    this.PowerUpText = this.add.text(width / 2, height / 2, '', { fontSize: '100px', fill: '#000' }).setOrigin(0.5);
    this.flyText = this.add.text(width / 2, 75, '', { fontSize: '30px', fill: '#000' }).setOrigin(0.5);

  }

  update(){
    this.player.body.velocity.x = 0;
    if(this.activePowerup == ''){
      if (this.cursor.up.isDown || this.input.activePointer.isDown){
          this.jumpNoPwerup();
        }else{
          jumpTimer = 0;
        }
      }else if(this.activePowerup == 'Double Jump'){
        if (this.cursor.up.isDown || this.input.activePointer.isDown){
            this.doubleJump();
          }else if(this.player.body.touching.down){
            this.numOfJumps = 0;
            jumpTimer = 0;

          }else{
            jumpTimer = 0;
          }
      }else if(this.activePowerup == 'Glide'){
        if (this.cursor.up.isDown || this.input.activePointer.isDown){
            this.glide();
          }else{
            this.player.setGravityY(0);
            jumpTimer = 0;
          }
      }else if(this.activePowerup == 'Fly'){

        if (this.cursor.up.isDown || this.input.activePointer.isDown){
            this.fly();
          }else{
            jumpTimer = 0;
          }
      }

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
        child.x = width + (Math.random()*1000);
        child.y = Phaser.Math.Between(height - 100, 10);
      }
});
this.powerups.children.iterate(function (child) {

    child.body.velocity.x = speed;
    if(child.y > height - 100){
      child.body.velocity.y = speed;
    }else if(child.y < height - 300){
      child.body.velocity.y = -speed;
    }
    if(child.x < -40){
      child.x = Phaser.Math.Between(width + 3000, width + 1000);
      child.y = Phaser.Math.Between(height - 100, height - 300);
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

  powerUp(player, shroom){
    this.flyText.setText('');
    this.numOfJumps = 0;
    this.player.body.setGravityY(0);
    jumpTimer = 0;
    this.pu = Phaser.Math.Between(1, 3 );
    if(this.pu == 1){
      this.activePowerup = 'Double Jump';
    }else if(this.pu == 2){
      this.activePowerup = 'Glide';
    }else if(this.pu == 3){
      this.activePowerup = 'Fly';
    }
    shroom.x = Phaser.Math.Between(width + 3000, width + 1000);
    shroom.y = Phaser.Math.Between(height - 100, height - 300);
    this.PowerUpText.setText(this.activePowerup);
    this.time.delayedCall(2000, ()=> this.PowerUpText.setText('') , null, this);
    this.pickupSound.play();
  }
  jumpNoPwerup(){
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
    }

    doubleJump(){
        if(jumpTimer === 0  && this.numOfJumps < 2){
          this.jump.play();
          this.player.play('jump').once('animationcomplete', () => this.player.play('walk'));
          speed -= 5;
          jumpTimer = 1;
          this.numOfJumps += 1;
          this.player.body.velocity.y = -200;
        }else if(jumpTimer > 0 && jumpTimer < 20){
          jumpTimer ++;
          this.player.body.velocity.y = -200 - (jumpTimer);
        }
      }

      fly(){
        this.flyText.setText('Flaps remaining: ' + (15 - this.numOfJumps));
          if(jumpTimer === 0){
            this.jump.play();
            this.player.play('jump').once('animationcomplete', () => this.player.play('walk'));
            speed -= 1;
            jumpTimer = 1;
            this.player.body.velocity.y = -200;
            if(!this.player.body.touching.down){
              this.numOfJumps += 1;
            }
          }else if(jumpTimer > 0 && jumpTimer < 20){
            jumpTimer ++;
            this.player.body.velocity.y = -200 - (jumpTimer);
          }
          if(this.numOfJumps == 15){
            this.flyText.setText('');
            this.activePowerup = '';

          }
        }

        glide(){
            if(jumpTimer === 0  && this.player.body.touching.down){
              this.jump.play();
              this.player.play('jump').once('animationcomplete', () => this.player.play('walk'));
              speed -= 5;
              jumpTimer = 1;
              this.player.body.velocity.y = -200;
            }else if(jumpTimer > 0 && jumpTimer < 20){
              jumpTimer ++;
              this.player.body.velocity.y = -200 - (jumpTimer);
            }else if(jumpTimer >= 20 ){
              this.player.body.setGravityY(-400);
            }
          }


}
