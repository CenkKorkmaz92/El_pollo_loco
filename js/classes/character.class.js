class Character extends MovableObject {
  height = 270;
  width = 144;
  groundPosition = 165;
  y = 165;
  offset = {
    top: 125,
    right: 45,
    bottom: 8,
    bottom: 10,
    left: 35,
  };
  offsetY = 0;
  world;
  speed = 7;
  sleep = false;
  sleepTimer = null;
  hasApproachedEndboss = false;

  imagesWalking = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  imagesJumping = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  imagesDead = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  imagesHurt = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  imagesIdle = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  imagesIdleLong = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  walking_sound = new Audio("audio/walking.mp3");
  jump_sound = new Audio("audio/jump.mp3");
  hurt_sound = new Audio("audio/character_hurt.mp3");
  death_sound = new Audio("audio/gameover4.mp3");
  sleep_sound = new Audio("audio/snoring.mp3");

  /**
   * Initializes the character with animations and movement controls.
   */
  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesJumping);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesIdleLong);
    this.applyGravity();
    this.animate();
    this.checkKeyDown();
  }

  /**
   * Starts character animations and movement logic.
   */
  animate() {
    this.setStoppableInterval(() => this.characterMovements(), 1000 / 60);
    this.setStoppableInterval(() => this.characterStatus(), 100);
  }

  /**
   * Handles character movements such as walking and jumping.
   */
  characterMovements() {
    this.walking_sound.pause();

    if (!this.world.isCameraAdjusting) {
      this.walking_sound.pause();
      this.characterMoveRight();
      this.characterMoveLeft();
      this.characterJump();
    }
    this.adjustCameraForEndboss();
  }

  /**
   * Updates character status (e.g., walking, jumping, hurt, or idle).
   */
  characterStatus() {
    if (this.isDead()) {
      this.playAnimation(this.imagesDead);
      this.handleCharacterDeath();
    } else if (this.isHurt()) {
      this.handleCharacterHurt();
    } else if (this.isAboveGround()) {
      this.playAnimation(this.imagesJumping);
      this.clearSleepTimer();
    } else if (
      (this.world.keyboard.right || this.world.keyboard.left) &&
      !this.world.isCameraAdjusting
    ) {
      this.playAnimation(this.imagesWalking);
      this.clearSleepTimer();
    } else {
      this.characterSleep();
    }
  }

  /**
   * Adjusts camera positioning when approaching the endboss.
   */
  adjustCameraForEndboss() {
    const endboss = this.world.level.enemies[0];

    if (this.world.character.x > 4000 && !this.hasApproachedEndboss) {
      this.adjustCameraTowardsTarget(-this.x + 260, 0.5);
    } else if (this.hasApproachedEndboss) {
      this.setCameraFixedPosition(-this.x + 260);
    } else {
      this.setCameraFixedPosition(-this.x + 100);
    }
  }

  /**
   * Adjusts the camera position towards the target position.
   *
   * @param {number} targetCameraX - The target x-coordinate for the camera.
   * @param {number} step - The step size for each adjustment.
   */
  adjustCameraTowardsTarget(targetCameraX, step) {
    this.world.isCameraAdjusting = true;

    if (this.world.camera_x < targetCameraX) {
      this.world.camera_x += step;
    } else {
      this.setCameraFixedPosition(targetCameraX);
      this.hasApproachedEndboss = true;
      this.world.isCameraAdjusting = false;
    }
  }

  /**
   * Sets the camera to a fixed position in the game world.
   *
   * @param {number} position - The x-coordinate to set the camera to.
   */
  setCameraFixedPosition(position) {
    this.world.camera_x = position;
  }

  /**
   * Moves the character right if the right arrow key is pressed and within level bounds.
   * Handles direction, walking sound, and sleep sound.
   */
  characterMoveRight() {
    if (this.world.keyboard.right && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      if (!this.isAboveGround()) {
        this.characterPlayWalkingSound();
      } else {
        this.walking_sound.pause();
      }
      this.stopSleepSound();
    }
  }

  /**
   * Moves the character left if the left key is pressed and x > -600.
   * Sets direction, handles walking and sleep sounds.
   */
  characterMoveLeft() {
    if (this.world.keyboard.left && this.x > -600) {
      this.moveLeft();
      this.otherDirection = true;
      if (!this.isAboveGround()) {
        this.characterPlayWalkingSound();
      } else {
        this.walking_sound.pause();
      }
      this.stopSleepSound();
    }
  }

  /**
   * Plays the walking sound for the character if the sound is enabled.
   * Adjusts the playback rate and volume of the walking sound before playing it.
   */
  characterPlayWalkingSound() {
    if (soundOn) {
      this.walking_sound.playbackRate = 1.5;
      this.walking_sound.volume = 0.5;
      this.walking_sound.play();
    }
  }

  /**
   * Makes the character jump and plays the jump sound.
   */
  characterJump() {
    if (this.world.keyboard.up && !this.isAboveGround()) {
      this.jump();
      this.playJumpSound();
      this.currentImage = 0;
      this.stopSleepSound();
    }
  }

  /**
   * Plays the jump sound effect if sound is on.
   */
  playJumpSound() {
    if (soundOn) {
      this.jump_sound.play();
    }
  }

  /**
   * Handles character death by marking the game as lost and playing the death sound.
   */
  handleCharacterDeath() {
    world.gameEnd = true;
    world.gameLost = true;
    if (soundOn) {
      this.death_sound.play();
    }
  }

  /**
   * Handles the character hurt animation and sound.
   * Starts a cooldown to prevent continuous triggering of hurt state.
   */
  handleCharacterHurt() {
    if (!this.isHurtCooldown) {
      this.playAnimation(this.imagesHurt);
      if (soundOn) {
        this.hurt_sound.play();
      }
      if (this.sleep) {
        this.sleep_sound.pause();
      }
      this.startHurtCooldown();
    }
  }

  /**
   * Starts a cooldown timer to prevent the hurt state from triggering continuously.
   */
  startHurtCooldown() {
    this.isHurtCooldown = true;
    setTimeout(() => {
      this.isHurtCooldown = false;
    }, 1000);
  }

  /**
   * Manages the character's idle and sleep animations.
   * Plays sleep sound if the character is idle for a long time.
   */
  characterSleep() {
    if (!this.sleep) {
      this.playAnimation(this.imagesIdle);
      this.startSleepTimer();
    } else {
      this.playAnimation(this.imagesIdleLong);
      if (soundOn) {
        this.sleep_sound.play();
      } else {
        this.sleep_sound.pause();
        this.sleep_sound.currentTime = 0;
      }
    }
  }

  /**
   * Starts a timer that puts the character to sleep if idle for a set duration.
   */
  startSleepTimer() {
    if (!this.sleepTimer) {
      this.sleepTimer = setTimeout(() => {
        this.sleep = true;
      }, 15000);
    }
  }

  /**
   * Clears the sleep timer if the character is active again.
   */
  clearSleepTimer() {
    if (this.sleepTimer) {
      clearTimeout(this.sleepTimer);
      this.sleepTimer = null;
    }
    this.sleep = false;
    this.stopSleepSound();
  }

  /**
   * Listens for key presses and clears the sleep state when any key is pressed.
   */
  checkKeyDown() {
    document.addEventListener("keydown", (e) => {
      if (!e.repeat) {
        this.clearSleepTimer();
        this.sleep = false;
      }
    });
  }

  /**
   * Stops the sleep sound and resets its position if the character is no longer sleeping.
   */
  stopSleepSound() {
    if (!this.sleep) {
      this.sleep_sound.pause();
      this.sleep_sound.currentTime = 0;
    }
  }

  /**
   * Stops all character-related sounds and resets their playback positions.
   */
  stopAllSounds() {
    this.walking_sound.pause();
    this.walking_sound.currentTime = 0;
    this.jump_sound.pause();
    this.hurt_sound.pause();
    this.sleep_sound.pause();
  }
}
