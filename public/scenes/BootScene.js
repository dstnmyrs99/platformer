class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');

  }
  preload(){
      this.load.image('shroom','assets/Object/Mushroom.png');
      this.load.image('bg','assets/BG.png');
      this.load.image('jump1','assets/png/Jump(1).png');
      this.load.image('jump2','assets/png/Jump(2).png');
      this.load.image('jump3','assets/png/Jump(3).png');
      this.load.image('jump4','assets/png/Jump(4).png');
      this.load.image('jump5','assets/png/Jump(5).png');
      this.load.image('jump6','assets/png/Jump(6).png');
      this.load.image('jump7','assets/png/Jump(7).png');
      this.load.image('jump8','assets/png/Jump(8).png');
      this.load.image('jump9','assets/png/Jump(9).png');
      this.load.image('jump10','assets/png/Jump(10).png');
      this.load.image('jump11','assets/png/Jump(11).png');
      this.load.image('jump12','assets/png/Jump(12).png');
      this.load.image('dino1','assets/png/Run(1).png');
      this.load.image('dino2','assets/png/Run(2).png');
      this.load.image('dino3','assets/png/Run(3).png');
      this.load.image('dino4','assets/png/Run(4).png');
      this.load.image('dino5','assets/png/Run(5).png');
      this.load.image('dino6','assets/png/Run(6).png');
      this.load.image('dino7','assets/png/Run(7).png');
      this.load.image('dino8','assets/png/Run(8).png');
      this.load.image('ground','assets/Tiles/2.png');
      this.load.image('ground2','assets/Tiles/14.png');
      this.load.audio('pickup', 'audio/Pickup.wav');
      this.load.audio('death', 'audio/PlayerDeath.wav');
      this.load.audio('jump', 'audio/jump.wav');
      this.load.audio('bg', 'audio/bg.mp3');

  }
  create(){
    this.anims.create({
        key: 'walk',
        frames: [
            { key: 'dino1'},
            { key: 'dino2'},
            { key: 'dino3'},
            { key: 'dino4'},
            { key: 'dino5'},
            { key: 'dino6'},
            { key: 'dino7'},
            { key: 'dino8'}
        ],
        frameRate: 16,
        repeat: -1
    });
    this.anims.create({
        key: 'jump',
        frames: [
            { key: 'jump1'},
            { key: 'jump2'},
            { key: 'jump3'},
            { key: 'jump4'},
            { key: 'jump5'},
            { key: 'jump6'},
            { key: 'jump7'},
            { key: 'jump8'},
            { key: 'jump9'},
            { key: 'jump10'},
            { key: 'jump11'},
            { key: 'jump12'}
        ],
        frameRate: 16,
        repeat: 0
    });
    this.scene.start('TitleScene');
  }
}
