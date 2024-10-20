class MovableObject extends DrawableObject {
    offset = {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    };
    offsetY = 0;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isActive = true;
    isHurtCooldown = false;
    intervals = [];
  
    /**
     * Sets an interval that can be stopped later.
     *
     * @param {Function} callbackFunction - The function to execute at each interval.
     * @param {number} intervalDuration - The interval time in milliseconds.
     */
    setStoppableInterval(callbackFunction, intervalDuration) {
      let intervalId = setInterval(callbackFunction, intervalDuration);
      this.intervals.push(intervalId);
    }
  
    /**
     * Stops all active intervals.
     */
    stopAllIntervals() {
      this.intervals.forEach(clearInterval);
    }
  
    /**
     * Applies gravity to the object by adjusting its vertical position and speed.
     */
    applyGravity() {
      setInterval(() => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.acceleration;
        } else {
          this.y = this.groundPosition;
          this.speedY = 0;
        }
      }, 1000 / 20);
    }
  
    /**
     * Checks if the object is above ground level.
     *
     * @returns {boolean} True if the object is above ground, false otherwise.
     */
    isAboveGround() {
      if (this instanceof ThrowableObject) {
        return true;
      } else {
        return this.y < this.groundPosition;
      }
    }
  
    /**
     * Reduces the object's energy by 20 points when hit.
     * Records the time of the hit.
     */
    hit() {
      this.energy -= 20;
      if (this.energy < 0) {
        this.energy = 0;
      }
      this.lastHit = new Date().getTime();
    }
  
    /**
     * Checks if the object is hurt based on the time since the last hit.
     *
     * @returns {boolean} True if the object is hurt, false otherwise.
     */
    isHurt() {
      let timepassed = new Date().getTime() - this.lastHit;
      timepassed = timepassed / 1000;
      return timepassed < 1;
    }
  
    /**
     * Checks if the object is dead.
     *
     * @returns {boolean} True if the object's energy is 0, false otherwise.
     */
    isDead() {
      return this.energy == 0;
    }
  
    /**
     * Checks if the object is colliding with another movable object.
     *
     * @param {MovableObject} movableObject - The other object to check for collision.
     * @returns {boolean} True if the objects are colliding, false otherwise.
     */
    isColliding(MovableObject) {
      return (
        this.x + this.width - this.offset.right >
          MovableObject.x + MovableObject.offset.left &&
        this.y + this.height - this.offset.bottom >
          MovableObject.y + MovableObject.offset.top &&
        this.x + this.offset.left <
          MovableObject.x + MovableObject.width - MovableObject.offset.right &&
        this.y + this.offset.top <
          MovableObject.y + MovableObject.height - MovableObject.offset.bottom
      );
    }
  
    /**
     * Plays an animation by cycling through a set of images.
     *
     * @param {Array} images - The array of image paths for the animation.
     */
    playAnimation(images) {
      let i = this.currentImage % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImage++;
    }
  
    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
      this.x += this.speed;
    }
  
    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
      this.x -= this.speed;
    }
  
    /**
     * Makes the object jump by setting vertical speed.
     */
    jump() {
      this.speedY = 25;
    }
  
    /**
     * Handles the animation and sound effects for when the enemy dies.
     */
    enemyIsDead() {
      if (!this.isActive) {
        this.loadImage(this.imageDead);
        if (!this.soundPlayed) {
          if (soundOn) {
            this.death_sound.volume = 0.6;
            this.death_sound.play();
          }
          this.soundPlayed = true;
        }
        this.speedY = -25;
      } else {
        this.playAnimation(this.imagesWalking);
      }
    }
  
    /**
     * Checks if the character is to the left of the Endboss.
     * @param {number} characterX - X position of the character.
     * @param {number} endbossX - X position of the Endboss.
     * @returns {boolean} True if the character is on the left.
     */
    isCharacterLeft(characterX, endbossX) {
      return characterX < endbossX;
    }
  
    /**
     * Calculates a random interval between jumps.
     * @returns {number} Time interval for next jump.
     */
    calculateNextJumpInterval() {
      const minJumpInterval = 2000;
      const maxJumpInterval = 4000;
      return (
        minJumpInterval + Math.random() * (maxJumpInterval - minJumpInterval)
      );
    }
  
    /**
     * Generates a random distance between two values.
     * @param {number} min - Minimum distance.
     * @param {number} max - Maximum distance.
     * @returns {number} Random distance between min and max.
     */
    getRandomDistance(min, max) {
      return Math.random() * (max - min) + min;
    }
  }
  