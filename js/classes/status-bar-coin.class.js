/**
 * Represents the status bar for tracking coin collection.
 * Extends DrawableObject to visually render the status.
 */
class StatusBarCoin extends DrawableObject {
  percentage = 0;
  imagesCoinBar = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
  ];

  /**
   * Initializes the coin status bar by loading images, setting the initial position, and percentage.
   */
  constructor() {
    super();
    this.loadImages(this.imagesCoinBar);
    this.x = 20;
    this.y = 100;
    this.width = 200;
    this.height = 60;
    this.setPercentage(0);
  }

  /**
   * Updates the percentage of coins collected and updates the image accordingly.
   * @param {number} percentage - The percentage of coins collected (0 to 10).
   */
  setPercentage(percentage) {
    this.percentage = percentage * 10;
    let path = this.imagesCoinBar[ImageIndexResolver.resolveImageIndex(this.percentage)];
    this.img = this.imageCache[path];
  }
}
