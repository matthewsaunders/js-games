import Phaser from "phaser";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

const game = new Phaser.Game(config);

function preload() {
  this.load.image("sky", "/images/demo/sky.png");
  this.load.image("ground", "/images/demo/platform.png");
  this.load.image("star", "/images/demo/star.png");
  this.load.image("bomb", "/images/demo/bomb.png");
  this.load.spritesheet("dude", "/images/demo/dude.png", {
    frameWidth: 32,
    frameHeight: 48,
  });
}

function create() {
  this.add.image(400, 300, "sky");

  const platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, "ground").setScale(2).refreshBody();

  platforms.create(600, 400, "ground");
  platforms.create(50, 250, "ground");
  platforms.create(750, 220, "ground");
}

function update() {}

console.log("game");
