class ThrowableObject extends MovableObject {
  width = 81;
  height = 90;
  offset = {
    top: 10,
    right: 30,
    bottom: 10,
    left: 30,
  };
  isActive = true;
  otherDirection = false;
  hasHitEndboss = false;

  imagesRotate = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  imagesBottleSplash = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  throw_sound = new Audio("audio/throwing.mp3");
  splash_sound = new Audio("audio/bottleSmash.mp3");

  /**
   * Initializes a new ThrowableObject.
   * @param {number} x - The initial x position of the bottle.
   * @param {number} y - The initial y position of the bottle.
   */
  constructor(x, y) {
    super().loadImage(
      "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png"
    );
    this.loadImages(this.imagesRotate);
    this.loadImages(this.imagesBottleSplash);
    this.x = x;
    this.y = y;
    this.throw();
  }

  /**
   * Initiates the throwing action, applying gravity and setting the direction.
   */
  throw() {
    this.speedY = 20;
    this.applyGravity();
    this.otherDirection = world.character.otherDirection;
    this.setStartPosition();
    this.playThrowSound();
    this.startMovementAnimation();
  }

  /**
   * Starts the movement animation of the bottle and controls its direction.
   */
  startMovementAnimation() {
    this.movementInterval = setInterval(() => {
      if (!this.isActive) {
        clearInterval(this.movementInterval);
        return;
      }
      this.throwDirection();
      this.playAnimation(this.imagesRotate);
    }, 1000 / 30);
  }

  /**
   * Sets the starting position of the throwable object based on the character's direction.
   */
  setStartPosition() {
    if (this.otherDirection) {
      this.x = world.character.x - 30;
    }
  }

  /**
   * Determines the direction in which the bottle is thrown.
   * Calls the appropriate direction method based on the character's current direction.
   */
  throwDirection() {
    if (this.otherDirection) {
      this.throwLeft();
    } else {
      this.throwRight();
    }
  }

  /**
   * Moves the bottle to the left by decreasing the x-coordinate.
   */
  throwLeft() {
    this.x -= 15;
  }

  /**
   * Moves the bottle to the right by increasing the x-coordinate.
   */
  throwRight() {
    this.x += 15;
  }

  /**
   * Plays the sound of the bottle being thrown.
   */
  playThrowSound() {
    if (soundOn) {
      this.throw_sound.volume = 0.7;
      this.throw_sound.play();
    }
  }

  /**
   * Plays the sound of the bottle smashing upon impact.
   */
  playSplashSound() {
    if (soundOn) {
      this.splash_sound.volume = 0.3;
      this.splash_sound.play();
    }
  }

  /**
   * Handles the splash effect when the bottle hits the ground or a target.
   * Stops the bottle's movement, plays the splash sound, and starts the splash animation.
   */
  splash() {
    this.isActive = false;
    clearInterval(this.movementInterval);
    this.speedY = 0;
    this.playSplashSound();
    this.startSplashAnimation();
    this.removeAfterSplash();
  }

  /**
   * Starts the splash animation when the bottle breaks.
   */
  startSplashAnimation() {
    this.splashAnimationInterval = setInterval(() => {
      this.playAnimation(this.imagesBottleSplash);
    }, 1000 / 30);
  }

  /**
   * Removes the bottle from the game world after the splash animation finishes.
   */
  removeAfterSplash() {
    setTimeout(() => {
      world.throwableObjects = world.throwableObjects.filter(
        (bottle) => bottle !== this
      );
    }, 300);
  }
}
