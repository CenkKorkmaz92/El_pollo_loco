class World {
    character = new Character();
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    statusBarLife = new StatusBarLife();
    statusBarBottle = new StatusBarBottle();
    statusBarCoin = new StatusBarCoin();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    collectedBottles = 0;
    lastBottleThrow = 0;
    collectedCoins = 0;
    gameEnd = false;
    gameLost = false;
    movableObjects = [];
    isCameraAdjusting = false;
  
    /**
     * Initializes the game world.
     * @param {HTMLCanvasElement} canvas - The canvas where the game is rendered.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
      this.ctx = canvas.getContext("2d");
      this.canvas = canvas;
      this.keyboard = keyboard;
      this.draw();
      this.setWorld();
      this.run();
      this.addMovableObjects();
    }
  
    /**
     * Adds all movable objects (character, enemies, bottles, clouds, coins) to the game.
     */
    addMovableObjects() {
      this.movableObjects.push(this.character);
      this.movableObjects.push(...this.level.enemies);
      this.movableObjects.push(...this.throwableObjects);
      this.movableObjects.push(...this.level.clouds);
      this.movableObjects.push(...this.level.bottles);
      this.movableObjects.push(...this.level.coins);
    }
  
    /**
     * Stops all interval-based animations for all movable objects.
     */
    stopAllMovableObjectIntervals() {
      this.movableObjects.forEach((obj) => obj.stopAllIntervals());
    }
  
    /**
     * Checks if the game has ended and handles win/lose conditions.
     */
    checkGameEnd() {
      if (this.gameEnd) {
        setTimeout(() => {
          this.character.stopAllSounds();
          this.stopAllMovableObjectIntervals();
          if (this.gameLost) {
            showGameOverScreen();
          } else {
            showYouWinScreen(this.collectedCoins);
          }
        }, 300);
      }
    }
  
    /**
     * Sets the world reference for the character and all objects in the level.
     */
    setWorld() {
      this.character.world = this;
      this.level.enemies.forEach(enemy => enemy.world = this);
      this.level.clouds.forEach(cloud => cloud.world = this);
      this.level.bottles.forEach(bottle => bottle.world = this);
      this.level.coins.forEach(coin => coin.world = this);
    }
  
    /**
     * Starts the game loop, checking for collisions, handling game logic, and updating the game state.
     */
    run() {
      setInterval(() => {
        this.checkCollisions();
        this.bottleHitEnemy();
        this.bottleHitEndboss();
        this.checkGameEnd();
      }, 20);
    }
  
    /**
     * Handles collision detection between throwable bottles and enemies (except the end boss).
     */
    bottleHitEnemy() {
      this.throwableObjects.forEach((bottle) => {
        this.level.enemies.forEach((enemy) => {
          if (!(enemy instanceof Endboss)) {
            if (bottle.isColliding(enemy)) {
              enemy.isActive = false;
              this.removeDeadEnemy(enemy);
              bottle.splash();
            }
          }
        });
      });
    }
  
    /**
     * Handles collision detection between throwable bottles and the end boss.
     */
    bottleHitEndboss() {
      this.throwableObjects.forEach((throwableBottle) => {
        if (!throwableBottle.hasHitEndboss) {
          let endboss = this.level.enemies[0];
          if (endboss.isColliding(throwableBottle)) {
            endboss.hit();
            throwableBottle.splash();
            this.statusBarEndboss.setPercentage(endboss.energy);
            throwableBottle.hasHitEndboss = true;
            this.endbossLevelUp(endboss);
          }
        }
      });
    }
  
    /**
     * Reduces the end boss's size after being hit.
     * @param {Endboss} endboss - The end boss object to shrink.
     */
    endbossLevelUp(endboss) {
      endboss.width -= 20;
      endboss.height -= 20;
      endboss.x += 20;
      endboss.y += 20;
      endboss.groundPosition += 20;
    }
  
    /**
     * Checks for collisions between the character and game objects (enemies, coins, bottles).
     */
    checkCollisions() {
      this.checkCollisionsWithEnemy();
      this.checkCollisionsWithBottle();
      this.checkCollisionsWithCoin();
    }
  
    /**
     * Checks for collisions between the character and coins, and handles coin collection.
     */
    checkCollisionsWithCoin() {
      this.level.coins.forEach((coin, index) => {
        if (this.character.isColliding(coin)) {
          this.collectCoin(index);
        }
      });
    }
  
    /**
     * Collects the coin, removes it from the game, and updates the coin status bar.
     * @param {number} index - The index of the collected coin.
     */
    collectCoin(index) {
      const collectedCoin = this.level.coins[index];
      collectedCoin.collect();
      this.level.coins.splice(index, 1);
      this.collectedCoins++;
      this.statusBarCoin.setPercentage(this.collectedCoins);
    }
  
    /**
     * Checks for collisions between the character and bottles, and handles bottle collection.
     */
    checkCollisionsWithBottle() {
      this.level.bottles.forEach((bottle, index) => {
        if (this.character.isColliding(bottle)) {
          this.collectBottle(index);
        }
      });
    }
  
    /**
     * Collects the bottle, removes it from the game, and updates the bottle status bar.
     * @param {number} index - The index of the collected bottle.
     */
    collectBottle(index) {
      const collectedBottle = this.level.bottles[index];
      collectedBottle.collect();
      this.level.bottles.splice(index, 1);
      this.collectedBottles++;
      this.statusBarBottle.setPercentage(this.collectedBottles);
    }
  
    /**
     * Checks for collisions between the character and enemies, and handles the consequences.
     */
    checkCollisionsWithEnemy() {
      this.level.enemies.forEach((enemy, index) => {
        this.enemyisDead(enemy, index);
        this.characterGetsHit(enemy);
      });
    }
  
    /**
     * Handles when the character jumps on an enemy and defeats it.
     * @param {MovableObject} enemy - The enemy that was jumped on.
     * @param {number} index - The index of the enemy in the enemies array.
     */
    enemyisDead(enemy, index) {
      if (index !== 0 && enemy.isActive) {
        if (this.character.isColliding(enemy) && this.character.isAboveGround() && this.character.speedY < 0 && this.isCharacterAboveEnemy(enemy)) {
          enemy.isActive = false;
          this.removeDeadEnemy(enemy);
        }
      }
    }
  
    /**
     * Checks if the character is above the enemy.
     * @param {MovableObject} enemy - The enemy to check against.
     * @returns {boolean} True if the character is above the enemy.
     */
    isCharacterAboveEnemy(enemy) {
      return (this.character.y + this.character.height - this.character.offset.bottom < enemy.y + enemy.height * 0.75);
    }
  
    /**
     * Removes the defeated enemy from the level after a short delay.
     * @param {MovableObject} enemy - The enemy to be removed.
     */
    removeDeadEnemy(enemy) {
      setTimeout(() => this.level.enemies = this.level.enemies.filter(e => e !== enemy), 1000);
    }
  
    /**
     * Handles when the character is hit by an enemy.
     * @param {MovableObject} enemy - The enemy that hit the character.
     */
    characterGetsHit(enemy) {
      if (this.character.isColliding(enemy) && enemy.isActive && this.characterCanTakeDamage()) {
        if (!this.isCharacterJumpingOnEnemy(enemy)) {
          this.character.hit();
          this.statusBarLife.setPercantage(this.character.energy);
        } else {
          enemy.isActive = false;
          this.removeDeadEnemy(enemy);
        }
      }
    }
  
    /**
     * Checks if the character is jumping on the enemy.
     * @param {MovableObject} enemy - The enemy to check.
     * @returns {boolean} True if the character is jumping on the enemy.
     */
    isCharacterJumpingOnEnemy(enemy) {
      return (this.character.speedY < 0 && this.character.y + this.character.height - this.character.offset.bottom <= enemy.y + enemy.height * 0.33 && (!enemy.isAboveGround() || enemy.speedY >= 0));
    }
  
    /**
     * Checks if the character can take damage based on the cooldown time.
     * @returns {boolean} True if the character can take damage.
     */
    characterCanTakeDamage() {
      let currentTime = new Date().getTime();
      let timeSinceLastHit = currentTime - this.character.lastHit;
      if (timeSinceLastHit > 1000) {
        return true;
      } else {
        return false;
      }
    }
  
    /**
     * Checks if the player can throw bottles, and throws a bottle if conditions are met.
     */
    checkThrowObjects() {
      let currentTime = new Date().getTime();
      if (this.isCameraAdjusting) {
        return;
      }
      if (!this.gameEnd && this.keyboard.space && this.collectedBottles > 0 && currentTime - this.lastBottleThrow > 800) {
        this.throwBottle();
        this.lastBottleThrow = currentTime;
      }
    }
  
    /**
     * Throws a bottle, adds it to the throwableObjects array, and updates the bottle status bar.
     */
    throwBottle() {
      let bottle = new ThrowableObject(this.character.x + 90, this.character.y + 100);
      this.throwableObjects.push(bottle);
      this.collectedBottles--;
      this.statusBarBottle.setPercentage(this.collectedBottles);
    }
  
    /**
     * Draws the entire game world and continuously updates the canvas.
     */
    draw() {
      this.clearCanvas();
      this.translateCamera();
      this.drawBackground();
      this.drawObjects();
      this.resetCamera();
      this.drawStatusBars();
      this.drawCharacter();
      requestAnimationFrame(() => this.draw());
    }
  
    /**
     * Clears the canvas before drawing.
     */
    clearCanvas() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    /**
     * Translates the camera view based on the character's position.
     */
    translateCamera() {
      this.ctx.translate(this.camera_x, 0);
    }
  
    /**
     * Resets the camera view back to its original position.
     */
    resetCamera() {
      this.ctx.translate(-this.camera_x, 0);
    }
  
    /**
     * Draws the background objects, including the clouds and other elements.
     */
    drawBackground() {
      this.addObjectsToMap(this.level.backgroundObjects);
      this.addObjectsToMap(this.level.clouds);
    }
  
    /**
     * Draws all game objects like enemies, bottles, and coins.
     */
    drawObjects() {
      this.addObjectsToMap(this.level.enemies);
      this.addObjectsToMap(this.level.bottles);
      this.addObjectsToMap(this.level.coins);
      this.addObjectsToMap(this.throwableObjects);
    }
  
    /**
     * Draws all status bars (life, bottles, coins, endboss).
     */
    drawStatusBars() {
      this.addToMap(this.statusBarLife);
      this.addToMap(this.statusBarBottle);
      this.addToMap(this.statusBarCoin);
      this.addToMap(this.statusBarEndboss);
    }
  
    /**
     * Draws the character at its current position.
     */
    drawCharacter() {
      this.ctx.translate(this.camera_x, 0);
      this.addToMap(this.character);
      this.ctx.translate(-this.camera_x, 0);
    }
  
    /**
     * Adds an array of objects to the map for rendering.
     * @param {MovableObject[]} objects - Array of movable objects to be drawn.
     */
    addObjectsToMap(objects) {
      objects.forEach(movableObject => this.addToMap(movableObject));
    }
  
    /**
     * Draws a single object on the map.
     * @param {MovableObject} MovableObject - The object to be drawn.
     */
    addToMap(MovableObject) {
      if (MovableObject.otherDirection) {
        this.flipImage(MovableObject);
      }
      MovableObject.draw(this.ctx);
      // MovableObject.drawBorder(this.ctx); // Uncomment this line to draw borders around objects for debugging purposes.
      if (MovableObject.otherDirection) {
        this.flipImageBack(MovableObject);
      }
    }
  
    /**
     * Flips an object horizontally.
     * @param {MovableObject} MovableObject - The object to be flipped.
     */
    flipImage(MovableObject) {
      this.ctx.save();
      this.ctx.translate(MovableObject.width, 0);
      this.ctx.scale(-1, 1);
      MovableObject.x = MovableObject.x * -1;
    }
  
    /**
     * Reverses the horizontal flip of an object.
     * @param {MovableObject} MovableObject - The object to be flipped back.
     */
    flipImageBack(MovableObject) {
      MovableObject.x = MovableObject.x * -1;
      this.ctx.restore();
    }
  }
  