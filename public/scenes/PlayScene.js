class PlayScene extends Phaser.Scene {
  constructor() {
    super('PlayScene');

  }
  preload(){

  }

  create(){

      this.bg = this.add.sprite(width / 2, height / 2, 'bg').setOrigin(0.5);
      this.bg.setDisplaySize(width, height);
      this.cursor = this.input.keyboard.createCursorKeys();
      this.floor = this.physics.add.group({
        immovable: true,
        allowGravity: false,
        key: 'ground',
        repeat: 10,
        setXY: { x: 70, y: height - 43, stepX: 89 },
        setScale: { x: 0.7, y: 0.7}
    });
    this.shrooms = this.physics.add.group({
      immovable: false,
      allowGravity: false,
      key: 'shroom',
      repeat: 4,
      setXY: { x: 300, y: height - 100, stepX: 100 },
      setScale: { x: 0.4, y: 0.4}
  });

      this.player = this.physics.add.sprite(200, 100, 'dino1').setScale(0.1).setSize(300, 400).setOffset(20, 0).setBounce(0);
      this.player.play('walk');
      this.physics.add.overlap(this.shrooms, this.player, this.collect, null, this);
    this.physics.add.collider(this.floor, this.player);
  }

  update(){
    if (this.cursor.up.isDown && this.player.body.touching.down){
    this.player.body.velocity.y = -300;
    this.player.play('jump').once('animationcomplete', () => this.player.play('walk'));
    speed -= 5;
    }
    if(this.input.activePointer.isDown && this.player.body.touching.down){
      this.player.body.velocity.y = -300;
      this.player.play('jump').once('animationcomplete', () => this.player.play('walk'));
      speed -= 5;
    }
    if(this.player.y > height){
      this.scene.start('TitleScene');
    }
    this.floor.children.iterate(function (child) {
        child.body.velocity.x = speed;
        if(child.x < -40){
          child.x = width + (Math.random()*100);

        }
  });
  this.shrooms.children.iterate(function (child) {
      child.body.velocity.x = speed;
      if(child.x < -40){
        child.x = width + (Math.random()*100);
        child.y = height - 100 - (Math.random()*height);
      }
});
}
  collect(player, shroom){
    score += 1;
    shroom.x = width + (Math.random()*100);
    shroom.y = height - 100 - (Math.random()*height);
  }
}
