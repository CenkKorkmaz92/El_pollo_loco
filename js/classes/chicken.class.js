class Chicken extends MovableObject {
    y = 340;
    height = 90;
    width = 72;
    offset = {
      top: 10,
      right: 10,
      bottom: 0,
      left: 10,
    };
    offsetY = 0;
    imagesWalking = [
      "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    ];
    imageDead = "img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
    death_sound = new Audio("audio/chicken_die.mp3");
    soundPlayed = false;
  
    /**
     * Creates a new Chicken instance at a specified x-coordinate.
     * @param {number} x - The initial x-position of the chicken.
     */
    constructor(x) {
      super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
      this.loadImages(this.imagesWalking);
  
      this.x = x + (Math.random() * 100 - 200);
      this.speed = 0.15 + Math.random() * 0.5;
  
      if (this.x > 4500) {
        this.waitForCameraAdjusting();
      } else {
        this.animate();
      }
    }
  
    /**
     * Waits for the camera adjustment before starting animation.
     * Used when the chicken is positioned further in the level.
     */
    waitForCameraAdjusting() {
      let interval = setInterval(() => {
        if (this.world && this.world.isCameraAdjusting) {
          clearInterval(interval);
          this.animate();
        }
      }, 100);
    }
  
    /**
     * Animates the chicken's movement to the left.
     * It moves left at a defined interval and checks if the chicken is dead.
     */
    animate() {
      this.setStoppableInterval(() => this.chickenMoveLeft(), 1000 / 60);
      this.setStoppableInterval(() => this.enemyIsDead(), 100);
    }
  
    /**
     * Moves the chicken to the left continuously.
     * Stops when the chicken is no longer active.
     */
    chickenMoveLeft() {
      if (this.isActive) {
        this.moveLeft();
      }
    }
  }
  