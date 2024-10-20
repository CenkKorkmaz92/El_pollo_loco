let level1;

/**
 * Initializes level 1 of the game.
 * Sets up the enemies, coins, bottles, clouds, and background objects for the level.
 * Creates a new instance of the Level class with all game objects.
 */
function initLevel1() {
  level1 = new Level(
    [
      new Endboss(),
      new Chicken(700),
      new Chicken(1000),
      new Chicken(1500),
      new Chicken(2000),
      new Chicken(2500),
      new Chicken(2700),
      new Chicken(3000),
      new Chicken(3200),
      new Chicken(3500),
      new Chicken(4000),
      new Chicken(4200),
      new Chicken(5000),
      new Chicken(5200),

      new Chick(900),
      new Chick(1200),
      new Chick(1700),
      new Chick(2200),
      new Chick(2700),
      new Chick(3200),
      new Chick(3300),
      new Chick(3700),
      new Chick(3900),
      new Chick(4200),
      new Chick(4800),
      new Chick(5100),
      new Chick(5300),
    ],

    [
      new Coin(-400, 150),
      new Coin(600, 250),
      new Coin(1000, 200),
      new Coin(1500, 250),
      new Coin(2000, 150),
      new Coin(2500, 120),
      new Coin(3000, 200),
      new Coin(3500, 250),
      new Coin(4000, 150),
      new Coin(4500, 120),
    ],

    [
      new Bottle(-500),
      new Bottle(-350),
      new Bottle(-200),
      new Bottle(450),
      new Bottle(950),
      new Bottle(2300),
      new Bottle(4700),
      new Bottle(4800),
      new Bottle(4900),
      new Bottle(5000),
    ],

    [
      new Cloud(1, -500),
      new Cloud(2, 1100),
      new Cloud(1, 300),
      new Cloud(2, 2700),
      new Cloud(1, 1900),
      new Cloud(2, 4300),
      new Cloud(1, 3500),
      new Cloud(2, 5100),
      new Cloud(1, 5900),
      new Cloud(2, 6700),
      new Cloud(1, 7500),
    ],

    [
      new BackgroundObject('img/5_background/layers/air.png', -719*2),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', -719*2),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', -719*2),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', -719*2),
        
      new BackgroundObject('img/5_background/layers/air.png', -719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
        
      new BackgroundObject('img/5_background/layers/air.png', 0),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
        
      new BackgroundObject('img/5_background/layers/air.png', 719),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
        
      new BackgroundObject('img/5_background/layers/air.png', 719*2),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*2),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*2),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*2),
        
      new BackgroundObject('img/5_background/layers/air.png', 719*3),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*3),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*3),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*3),
        
      new BackgroundObject('img/5_background/layers/air.png', 719*4),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*4),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*4),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*4),
        
      new BackgroundObject('img/5_background/layers/air.png', 719*5),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*5),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*5),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*5),
        
      new BackgroundObject('img/5_background/layers/air.png', 719*6),
      new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719*6),
      new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719*6),
      new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719*6),
        
      new BackgroundObject('img/5_background/layers/air.png', 719*7),
      new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719*7),
      new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719*7),
      new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719*7),
    ]
  );
}
