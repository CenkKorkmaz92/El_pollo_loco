class Endboss extends MovableObject {
    height = 400;
    width = 350;
    y = 60;
    groundPosition = 60;
    offset = {top: 60, right: 60, bottom: 40, left: 60,};
    offsetY = 0;
    world;
    speed = 1;
    attack = false;
    hadFirstContact = false;
    spawningFinished = false;
    direction = "left";
  
    imagesAlert = [
      "img/4_enemie_boss_chicken/2_alert/G5.png",
      "img/4_enemie_boss_chicken/2_alert/G6.png",
      "img/4_enemie_boss_chicken/2_alert/G7.png",
      "img/4_enemie_boss_chicken/2_alert/G8.png",
      "img/4_enemie_boss_chicken/2_alert/G9.png",
      "img/4_enemie_boss_chicken/2_alert/G10.png",
      "img/4_enemie_boss_chicken/2_alert/G11.png",
      "img/4_enemie_boss_chicken/2_alert/G12.png",
    ];
  
    imagesWalking = [
      "img/4_enemie_boss_chicken/1_walk/G1.png",
      "img/4_enemie_boss_chicken/1_walk/G2.png",
      "img/4_enemie_boss_chicken/1_walk/G3.png",
      "img/4_enemie_boss_chicken/1_walk/G4.png",
    ];
  
    imagesAttack = [
      "img/4_enemie_boss_chicken/3_attack/G13.png",
      "img/4_enemie_boss_chicken/3_attack/G14.png",
      "img/4_enemie_boss_chicken/3_attack/G15.png",
      "img/4_enemie_boss_chicken/3_attack/G16.png",
      "img/4_enemie_boss_chicken/3_attack/G17.png",
      "img/4_enemie_boss_chicken/3_attack/G18.png",
      "img/4_enemie_boss_chicken/3_attack/G19.png",
      "img/4_enemie_boss_chicken/3_attack/G20.png",
    ];
  
    imagesHurt = [
      "img/4_enemie_boss_chicken/4_hurt/G21.png",
      "img/4_enemie_boss_chicken/4_hurt/G22.png",
      "img/4_enemie_boss_chicken/4_hurt/G23.png",
    ];
  
    imagesDead = [
      "img/4_enemie_boss_chicken/5_dead/G24.png",
      "img/4_enemie_boss_chicken/5_dead/G25.png",
      "img/4_enemie_boss_chicken/5_dead/G26.png",
    ];
  
    introPlayed = false;
    introPlayedWalking = false;
    deathSoundPlayed = false;
    intro_sound = new Audio("audio/endboss_sound.mp3");
    intro_walking_sound = new Audio("audio/endboss_walk_intro.mp3");
    hurt_sound = new Audio("audio/endboss_hit.mp3");
    dead_sound = new Audio("audio/endboss_dead.mp3");
    intro_atmosphere = new Audio("audio/endboss_atmosphere2.mp3");
    atmospherePlayed = false;
  
    constructor() {
      super().loadImage(this.imagesAlert[0]);
      this.loadImages(this.imagesAlert);
      this.loadImages(this.imagesWalking);
      this.loadImages(this.imagesHurt);
      this.loadImages(this.imagesDead);
      this.loadImages(this.imagesAttack);
      this.x = 4600;
      this.applyGravity();
      this.animate();
      this.monitorSound();
    }
  
    /**
     * Monitors the sound state and pauses sounds if sound is off.
     */
    monitorSound() {
      setInterval(() => {
        if (!soundOn) {
          this.pauseAllSounds();
        }
      }, 100);
    }
  
    /**
     * Pauses all Endboss-related sounds.
     */
    pauseAllSounds() {
      this.intro_sound.pause();
      this.intro_walking_sound.pause();
      this.intro_atmosphere.pause();
    }
  
    /**
     * Initiates animation and movements for the Endboss.
     */
    animate() {
      this.setStoppableInterval(() => this.checkFirstContact(), 100);
      this.setStoppableInterval(() => this.handleSpawning(), 300);
      this.setStoppableInterval(() => this.updateEndbossStatus(), 100);
      this.setStoppableInterval(() => this.endbossMovements(), 1000 / 30);
      this.initiateRandomJump();
    }
  
    /**
     * Begins the jumping sequence of the Endboss at random intervals.
     */
    initiateRandomJump() {
      this.checkJump();
    }
  
    /**
     * Checks if the Endboss should jump and schedules the next jump.
     */
    checkJump() {
      this.spawningFinished ? this.scheduleNextJump() : this.delayJumpCheck();
    }
  
    /**
     * Schedules the next jump for the Endboss.
     */
    scheduleNextJump() {
      setTimeout(() => {
        this.jump();
        this.checkJump();
      }, this.calculateNextJumpInterval());
    }
  
    /**
     * Delays the next jump by 500ms.
     */
    delayJumpCheck() {
      setTimeout(() => this.checkJump(), 500);
    }
  
    /**
     * Makes the Endboss jump if it is not above ground.
     */
    jump() {
      if (this.world.gameEnd || this.isAboveGround()) return;
      this.speedY = 33;
    }
  
    /**
     * Updates the status of the Endboss: whether it is dead, hurt, attacking, or walking.
     */
    updateEndbossStatus() {
      if (!this.spawningFinished) {
        return;
      } else if (this.isDead()) {
        this.handleDeath();
      } else if (this.isHurt()) {
        this.handleHurt();
      } else if (this.isAboveGround()) {
        this.playAnimation(this.imagesAttack);
      } else {
        this.playAnimation(this.imagesWalking);
      }
    }
  
    /**
     * Moves the Endboss when it has had its first contact with the character.
     */
    endbossMovements() {
      if (this.spawningFinished && this.hadFirstContact) {
        this.endbossMove();
      }
    }
  
    /**
     * Plays the alert animation and handles the Endboss spawning process.
     */
    handleSpawning() {
      if (!this.spawningFinished && this.hadFirstContact) {
        this.playAnimation(this.imagesAlert);
        setTimeout(() => {
          this.spawningFinished = true;
        }, 300);
      }
    }
  
    /**
     * Checks if the Endboss has finished spawning and made first contact with the character,
     * then moves the Endboss accordingly.
     */
    checkAndMoveEndboss() {
      if (this.spawningFinished && this.hadFirstContact) {
        this.endbossMove();
      }
    }
  
    /**
     * Checks for the first contact with the character to trigger Endboss actions.
     */
    checkFirstContact() {
      if (this.shouldInitiateFirstContact()) {
        this.handleFirstContact();
      }
    }
  
    /**
     * Determines if the character has approached the Endboss.
     * @returns {boolean} True if the character is near the Endboss.
     */
    shouldInitiateFirstContact() {
      return this.world?.character?.x > 4000 && !this.hadFirstContact;
    }
  
    /**
     * Handles the first contact between the Endboss and the character.
     */
    handleFirstContact() {
      this.speed = 10;
      this.moveLeft();
      this.playAnimation(this.imagesWalking);
      this.playEndbossWalkingIntro();
      this.playEndbossAtmosphere();
      this.scheduleEndbossActions();
    }
  
    /**
     * Schedules the Endboss's actions after the first contact.
     */
    scheduleEndbossActions() {
      setTimeout(() => {
        this.atmospherePlayed = true;
        this.introPlayedWalking = true;
        this.intro_walking_sound.pause();
        this.intro_atmosphere.pause();
        this.playEndbossIntro();
        this.hadFirstContact = true;
        this.speed = 3;
      }, 4500);
    }
  
    /**
     * Plays the background atmosphere sound for the Endboss.
     */
    playEndbossAtmosphere() {
      if (!this.atmospherePlayed) {
        if (soundOn) {
          this.intro_atmosphere.volume = 0.7;
          this.intro_atmosphere.play();
        }
      }
    }
  
    /**
     * Plays the Endboss intro sound.
     */
    playEndbossIntro() {
      if (!this.introPlayed) {
        if (soundOn) {
          this.intro_sound.volume = 0.8;
          this.intro_sound.play();
        }
        this.introPlayed = true;
      }
    }
  
    /**
     * Plays the walking intro sound for the Endboss.
     */
    playEndbossWalkingIntro() {
      if (!this.introPlayedWalking) {
        if (soundOn) {
          this.intro_walking_sound.volume = 0.6;
          this.intro_walking_sound.playbackRate = 1.5;
          this.intro_walking_sound.play();
        }
      }
    }
  
    /**
     * Reduces the Endboss's health when hit and plays the hurt sound.
     */
    hit() {
      this.energy -= 20;
      if (this.energy < 0) {
        this.energy = 0;
      } else {
        this.lastHit = new Date().getTime();
        this.determineDirectionAfterHit();
        if (soundOn) {
          this.hurt_sound.play();
        }
      }
    }
  
    /**
     * Determines which direction the Endboss should move after being hit.
     */
    determineDirectionAfterHit() {
      const characterX = this.world.character.x;
      const endbossX = this.x;
      if (this.isCharacterLeft(characterX, endbossX)) {
        this.moveEndbossLeft();
      } else {
        this.moveEndbossRight();
      }
    }
  
    /**
     * Moves the Endboss to the left.
     */
    moveEndbossLeft() {
      this.moveLeft();
      this.direction = "left";
      this.otherDirection = false;
    }
  
    /**
     * Moves the Endboss to the right.
     */
    moveEndbossRight() {
      this.moveRight();
      this.direction = "right";
      this.otherDirection = true;
    }
  
    /**
     * Moves the Endboss in the current direction.
     */
    endbossMove() {
      const characterX = this.world.character.x;
      const distanceToCharacter = Math.abs(this.x - characterX);
      if (this.shouldChangeDirection(distanceToCharacter)) {
        this.updateDirection(characterX);
      }
      this.moveInCurrentDirection();
    }
  
    /**
     * Determines if the Endboss should change direction based on the distance to the character.
     * @param {number} distanceToCharacter - Distance between the Endboss and the character.
     * @returns {boolean} True if the Endboss should change direction.
     */
    shouldChangeDirection(distanceToCharacter) {
      const minDistance = 400;
      const maxDistance = 800;
      const dynamicMaxDistance = this.getRandomDistance(minDistance, maxDistance);
      return distanceToCharacter > dynamicMaxDistance;
    }
  
    /**
     * Updates the Endboss's direction based on the character's position.
     * @param {number} characterX - X position of the character.
     */
    updateDirection(characterX) {
      if (this.x < characterX) {
        this.direction = "right";
        this.otherDirection = true;
      } else {
        this.direction = "left";
        this.otherDirection = false;
      }
    }
  
    /**
     * Moves the Endboss based on its current direction.
     */
    moveInCurrentDirection() {
      if (this.direction === "left") {
        this.moveLeft();
      } else if (this.direction === "right") {
        this.moveRight();
      }
    }
  
    /**
     * Handles the Endboss's death sequence and stops its movement.
     */
    handleDeath() {
      if (this.isDead()) {
        this.playAnimation(this.imagesDead);
        this.isActive = false;
        this.speed = 0;
        this.playDeathSound();
        this.world.gameEnd = true;
      }
    }
  
    /**
     * Plays the Endboss's death sound.
     */
    playDeathSound() {
      if (!this.deathSoundPlayed && soundOn) {
        this.dead_sound.volume = 0.8;
        this.dead_sound.play();
        this.deathSoundPlayed = true;
      }
    }
  
    /**
     * Handles the Endboss's hurt animation and sound when hit.
     */
    handleHurt() {
      if (this.isHurt() && !this.isDead()) {
        this.playAnimation(this.imagesHurt);
        this.speed += 0.5;
      }
    }
  }
  