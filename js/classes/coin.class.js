class Coin extends MovableObject {
    width = 140;
    height = 140;
    offset = {
      top: 48,
      right: 48,
      bottom: 48,
      left: 48,
    };
    offsetY = 0;
    imagesCoin = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];
    coin_sound = new Audio("audio/collectcoin.mp3");
  
    /**
     * Generates a random offset for the coin's position.
     * @returns {number} Random offset between -50 and 50.
     */
    get randomOffset() {
      return Math.random() * 100 - 50;
    }
  
    /**
     * Creates a new Coin instance.
     * @param {number} x - The initial x-position of the coin.
     * @param {number} y - The initial y-position of the coin.
     */
    constructor(x, y) {
      super().loadImage("img/8_coin/coin_1.png");
      this.loadImages(this.imagesCoin);
      this.x = x + this.randomOffset;
      this.y = y + this.randomOffset;
      this.animate();
    }
  
    /**
     * Starts the animation of the coin, cycling through coin images.
     */
    animate() {
      this.setStoppableInterval(() => this.playAnimation(this.imagesCoin), 300);
    }
  
    /**
     * Plays the coin collection sound when the coin is collected.
     */
    collect() {
      if (soundOn) {
        this.coin_sound.volume = 0.5;
        this.coin_sound.play();
      }
    }
  }
  