class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
  
    /**
     * Creates a background object with a specified image and position.
     * @param {string} imagePath - The path to the background image.
     * @param {number} x - The x-coordinate of the background object.
     */
    constructor(imagePath, x) {
      super().loadImage(imagePath);
      this.x = x;
      this.y = 480 - this.height;
    }
  }
  