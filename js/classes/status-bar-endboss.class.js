class StatusBarEndboss extends DrawableObject {
    percentage = 100;
    imagesEndbossBar = [
      "img/7_statusbars/2_statusbar_endboss/blue/blue0.png",
      "img/7_statusbars/2_statusbar_endboss/blue/blue20.png",
      "img/7_statusbars/2_statusbar_endboss/blue/blue40.png",
      "img/7_statusbars/2_statusbar_endboss/blue/blue60.png",
      "img/7_statusbars/2_statusbar_endboss/blue/blue80.png",
      "img/7_statusbars/2_statusbar_endboss/blue/blue100.png",
    ];
  
    /**
     * Initializes the Endboss status bar by loading images, setting its position, and setting the initial percentage.
     */
    constructor() {
      super();
      this.loadImages(this.imagesEndbossBar);
      this.x = 490;
      this.y = 6;
      this.width = 200;
      this.height = 60;
      this.setPercentage(100);
    }
  
    /**
     * Updates the health percentage of the Endboss and changes the displayed image accordingly.
     * @param {number} percentage - The current health percentage of the Endboss (0 to 100).
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.imagesEndbossBar[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Determines the correct image to display based on the current health percentage.
     * @returns {number} The index of the corresponding image in the Endboss health bar array.
     */
    resolveImageIndex() {
      if (this.percentage === 100) return 5;
      if (this.percentage > 79) return 4;
      if (this.percentage > 59) return 3;
      if (this.percentage > 39) return 2;
      if (this.percentage > 19) return 1;
      return 0;
    }
  }
  