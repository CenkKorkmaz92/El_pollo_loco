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
      let path = this.imagesCoinBar[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Determines the correct image index based on the current percentage.
     * @returns {number} The index of the corresponding image in the coin bar.
     */
    resolveImageIndex() {
      if (this.percentage === 0) return 0;
      if (this.percentage < 40) return 1;
      if (this.percentage < 60) return 2;
      if (this.percentage < 80) return 3;
      if (this.percentage < 100) return 4;
      return 5;
    }
  }
  