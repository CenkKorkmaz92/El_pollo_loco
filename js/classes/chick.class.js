class Chick extends MovableObject {
    width = 50;
    height = 50;
    offset = {
      top: 0,
      right: 5,
      bottom: 0,
      left: 5,
    };
    offsetY = 0;
    y = 375;
    groundPosition = 375;
    imagesWalking = [
      "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
      "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
    ];
    imageDead = "img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  
    death_sound = new Audio("audio/chick_dead.mp3");
    soundPlayed = false;
  
    /**
     * Creates a new Chick instance at a specified x-coordinate.
     * @param {number} x - The initial x-position of the chick.
     */
    constructor(x) {
      super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
      this.loadImages(this.imagesWalking);
      this.x = x + (Math.random() * 100 - 200);
      this.speed = 0.15 + Math.random() * 0.5;
      this.applyGravity();
  
      if (this.x > 4500) {
        this.waitForCameraAdjusting();
      } else {
        this.animate();
      }
    }
  
    /**
     * Waits for the camera adjustment before starting animation.
     * Used when the chick is positioned further in the level.
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
     * Animates the chick's movement and checks if the chick is dead.
     * It moves left and jumps at random intervals.
     */
    animate() {
      this.setStoppableInterval(() => this.chickenMoveLeft(), 1000 / 60);
      this.setStoppableInterval(() => this.enemyIsDead(), 100);
      this.chickenJump();
    }
  
    /**
     * Moves the chick to the left continuously.
     */
    chickenMoveLeft() {
      if (this.isActive) {
        this.moveLeft();
      }
    }
  
    /**
     * Causes the chick to jump with random speed between 25 and 30.
     */
    jump() {
      this.speedY = 25 + Math.random() * 5;
    }
  
    /**
     * Starts the jumping process with a random initial delay.
     */
    chickenJump() {
      let startDelay = this.getRandomStartDelay();
  
      setTimeout(() => {
        this.initiateJumping();
      }, startDelay);
    }
  
    /**
     * Continuously triggers jumping at random intervals.
     */
    initiateJumping() {
      let jumpFunction = () => {
        if (this.isGameOver()) return;
        if (this.isActive) this.jump();
  
        let nextJump = this.getNextJumpInterval();
        setTimeout(jumpFunction, nextJump);
      };
      jumpFunction();
    }
  
    /**
     * Returns a random delay before the first jump occurs.
     * @returns {number} Random delay in milliseconds.
     */
    getRandomStartDelay() {
      return Math.random() * 2000;
    }
  
    /**
     * Returns a random interval for the next jump.
     * @returns {number} Random interval between 2000 and 4000 milliseconds.
     */
    getNextJumpInterval() {
      return 2000 + Math.random() * 2000;
    }
  
    /**
     * Checks if the game is over.
     * @returns {boolean} True if the game is over, otherwise false.
     */
    isGameOver() {
      return this.world && this.world.gameEnd;
    }
  }
  