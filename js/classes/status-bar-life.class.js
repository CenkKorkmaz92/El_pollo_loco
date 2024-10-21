class StatusBarLife extends DrawableObject {
  imagesHealth = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];
  percentage = 100;

  /**
   * Initializes the player's health status bar by loading images, setting its position, and initializing with full health (100%).
   */
  constructor() {
    super();
    this.loadImages(this.imagesHealth);
    this.x = 20;
    this.y = 0;
    this.width = 200;
    this.height = 60;
    this.setPercantage(100);
  }

  /**
   * Updates the player's health percentage and changes the displayed image accordingly.
   * @param {number} percentage - The current health percentage of the player (0 to 100).
   */
  setPercantage(percantage) {
    this.percantage = percantage;
    let imagePath = this.imagesHealth[this.resolveImageIndex()];
    this.img = this.imageCache[imagePath];
  }

  /**
   * Determines the correct image to display based on the current health percentage.
   * @returns {number} The index of the corresponding image in the health bar array.
   */
  resolveImageIndex() {
    switch (true) {
      case this.percantage === 100:
        return 5;
      case this.percantage >= 80:
        return 4;
      case this.percantage >= 60:
        return 3;
      case this.percantage >= 40:
        return 2;
      case this.percantage >= 20:
        return 1;
      case this.percantage > 0:
        return 1;
      default:
        return 0;
    }
  }
}
