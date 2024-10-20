class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    speed = 0.2;
  
    /**
     * Creates a new Cloud instance.
     * @param {number} imageNumber - The image number for the cloud to load.
     * @param {number} x - The initial x-position of the cloud.
     */
    constructor(imageNumber, x) {
      super().loadImage(`img/5_background/layers/4_clouds/${imageNumber}.png`);
      this.x = x;
      this.animate();
    }
  
    /**
     * Starts the animation of the cloud, making it move to the left.
     * The cloud moves at a constant speed over time.
     */
    animate() {
      this.setStoppableInterval(() => this.moveLeft(), 1000 / 20);
    }
  }
  