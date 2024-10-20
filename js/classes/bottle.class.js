class Bottle extends MovableObject {
    width = 81;
    height = 90;
    offset = {
      top: 18,
      right: 20,
      bottom: 10,
      left: 27,
    };
    offsetY = 0;
    y = 340;
  
    imagesBottle = [
      "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
      "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
    ];
  
    pickup_sound = new Audio("audio/pickup_bottle.mp3");
  
    /**
     * Generates a random offset to vary the bottle's x-position.
     * @returns {number} A random offset between -50 and 50.
     */
    get randomOffset() {
      return Math.random() * 100 - 50;
    }
  
    /**
     * Creates a new bottle at a specified x-coordinate.
     * @param {number} x - The initial x-position of the bottle.
     */
    constructor(x) {
      super().loadImage(this.imagesBottle[0]);
      this.loadImages(this.imagesBottle);
  
      this.x = x + this.randomOffset;
      this.animate();
    }
  
    /**
     * Animates the bottle by cycling through its images.
     */
    animate() {
      this.setStoppableInterval(() => this.playAnimation(this.imagesBottle), 300);
    }
  
    /**
     * Plays the bottle pickup sound when collected.
     */
    collect() {
      if (soundOn) {
        this.pickup_sound.play();
      }
    }
  }
  