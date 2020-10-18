let speed = -150;
let width = window.innerWidth;
let height = window.innerHeight;
let score = 0;
let jumpTimer = 0;
var hiScores;
let gameIsOver = false;


async function postData(url, data = {}){
  let highScores = await fetch(url, {method: 'GET'});
   const json = await highScores.json();
   return json;
}

async function postScores(url, data = {}){
  let newScore = await fetch(url, {method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      body: JSON.stringify(data),})
  .then(response => response.json());
}

this.newScores = postData('/scores').then((name)=> {
  hiScores = name});


const config = {
  width: width,
  height: height,
  scene: [
    BootScene,
    TitleScene,
    PlayScene,
    GameOverScene,
  ],
  type: Phaser.CANVAS,
  audio: {
    disableWebAudio: true
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      fps: 60,
      gravity: {y : 600},
    }
  },
};

const game = new Phaser.Game(config);
