class Level {
    enemies;
    coins;
    clouds;
    bottles;
    backgroundObjects;
    level_end_x = 719 * 7;
  
    /**
     * Creates a new level with the given game objects.
     *
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} coins - The coins to be collected.
     * @param {Array} bottles - The bottles to be collected.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects for the level.
     */
    constructor(enemies, coins, bottles, clouds, backgroundObjects) {
      this.enemies = enemies;
      this.coins = coins;
      this.bottles = bottles;
      this.clouds = clouds;
      this.backgroundObjects = backgroundObjects;
    }
  }
  