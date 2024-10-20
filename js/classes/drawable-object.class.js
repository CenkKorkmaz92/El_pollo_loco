class DrawableObject {
    height = 150;
    width = 100;
    x = 120;
    y = 280;
    offset = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    offsetY = 0;
    img;
    imageCache = {};
    currentImage = 0;
  
    /**
     * Loads an image from the specified path and sets it as the object's image.
     * @param {string} path - The file path of the image.
     */
    loadImage(path) {
      this.img = new Image();
      this.img.src = path;
    }
  
    /**
     * Loads multiple images from the given array and caches them for animation purposes.
     * @param {string[]} array - An array of image paths to load.
     */
    loadImages(array) {
      array.forEach((path) => {
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
      });
    }
  
    /**
     * Draws the object's current image on the canvas context.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    draw(ctx) {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
  
    /**
     * Draws a border around the object for debugging purposes.
     * The border color is green and it outlines the object's collision area.
     * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
     */
    drawBorder(ctx) {
      if (this.objects()) {
        ctx.beginPath();
        ctx.lineWidth = "5";
        ctx.strokeStyle = "green";
        ctx.rect(
          this.x + this.offset.left,
          this.y + this.offset.top,
          this.width - (this.offset.left + this.offset.right),
          this.height - (this.offset.top + this.offset.bottom)
        );
        ctx.stroke();
      }
    }
  
    /**
     * Checks if the object is one of the main game objects that require a debug border.
     * @returns {boolean} True if the object is an instance of a specific game entity.
     */
    objects() {
      return (
        this instanceof Character ||
        this instanceof Chicken ||
        this instanceof Chick ||
        this instanceof Coin ||
        this instanceof Bottle ||
        this instanceof ThrowableObject ||
        this instanceof Endboss
      );
    }
  }
  