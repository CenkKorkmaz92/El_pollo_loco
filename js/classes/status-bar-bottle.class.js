class StatusBarBottle extends DrawableObject {
    percentage = 0;
    imagesBottleBar = [
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
      "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
    ];
  
    /**
     * Initializes the bottle status bar by loading images, setting the initial position, and percentage.
     */
    constructor() {
      super();
      this.loadImages(this.imagesBottleBar);
      this.x = 20;
      this.y = 50;
      this.width = 200;
      this.height = 60;
      this.setPercentage(0);
    }
  
    /**
     * Updates the percentage of bottles collected and updates the image accordingly.
     * @param {number} percentage - The percentage of bottles collected (0 to 10).
     */
    setPercentage(percentage) {
      this.percentage = percentage * 10;
      let path = this.imagesBottleBar[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Determines the correct image index based on the current percentage.
     * @returns {number} The index of the corresponding image in the bottle bar.
     */
    resolveImageIndex() {
      if (this.percentage <= 0) return 0;
      if (this.percentage <= 20) return 1;
      if (this.percentage <= 40) return 2;
      if (this.percentage <= 60) return 3;
      if (this.percentage <= 80) return 4;
      return 5;
    }
  }
  