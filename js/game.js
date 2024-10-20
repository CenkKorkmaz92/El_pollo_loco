let canvas;
let world;
let keyboard = new Keyboard();
let soundOn = false;
let soundtrack = new Audio("audio/soundtrack.mp3");
let gameStart = false;
let soundtrackChanged = false;
let soundtrackShouldBePlaying = true;

/**
 * Initializes the game by setting up portrait warning, keyboard/touch listeners, and fullscreen handling.
 */
function init() {
  initPortraitWarning();
  keyboardListener();
  touchListener();
  registerFullscreenChangeListener();
  handleFullscreenChange();
}

/**
 * Starts the game, initializes the level, world, and mobile controls.
 */
function startGame() {
  initLevel1();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  gameStart = true;
  setTimeout(() => {
    removeElements();
    toggleMobilePlayPanel();
  }, 200);
  setInterval(checkCameraAdjustmentAndChangeSoundtrack, 100);
}

/**
 * Restarts the game, resets the world, and soundtrack. Hides the end screen and starts the game again.
 */
function restartGame() {
  document.getElementById("endScreen").classList.add("d-none");
  soundtrackChanged = false;
  soundtrackShouldBePlaying = true;
  resetSoundtrack();

  if (soundOn && soundtrackShouldBePlaying) {
    soundtrack.loop = true;
    soundtrack.play();
  }
  world = null;
  startGame();
}

/**
 * Ends the game and navigates to the home screen, resetting the game state and soundtrack.
 */
function goHome() {
  world = null;
  resetSoundtrack();
  soundtrackChanged = false;
  soundtrackShouldBePlaying = true;
  soundOn = false;
  document.getElementById("endScreen").classList.add("d-none");
  document.getElementById("startScreen").classList.remove("d-none");
  document.getElementById("controlButtons").className = "control-buttons";
  updateSoundIcon();
}

/**
 * Resets the soundtrack to the initial state and volume.
 */
function resetSoundtrack() {
  soundtrack.pause();
  soundtrack.currentTime = 0;
  soundtrack = new Audio("audio/soundtrack.mp3");
  setSoundtrackVolume();
}

/**
 * Updates the sound icon based on whether the sound is on or off.
 */
function updateSoundIcon() {
  let soundOffPath = "img/10_interface_icons/soundOff.png";
  let soundOnPath = "img/10_interface_icons/soundOn.png";
  let imgElement = document.getElementById("soundIcon");

  if (soundOn) {
    imgElement.src = soundOnPath;
  } else {
    imgElement.src = soundOffPath;
  }
}

/**
 * Removes the start screen elements and repositions control buttons for the game.
 */
function removeElements() {
  document.getElementById("startScreen").classList.add("d-none");
  document.getElementById("controlButtons").className =
    "control-buttons-center";
}

/**
 * Toggles the music volume on or off and updates the sound icon accordingly.
 */
function toggleMusicVolume() {
  let soundOffPath = "img/10_interface_icons/soundOff.png";
  let soundOnPath = "img/10_interface_icons/soundOn.png";
  let imgElement = document.getElementById("soundIcon");

  if (imgElement.src.includes(soundOffPath)) {
    turnSoundOn(imgElement, soundOnPath);
  } else {
    turnSoundOff(imgElement, soundOffPath);
  }
}

/**
 * Turns the sound on, sets the volume, and plays the soundtrack if applicable.
 * @param {HTMLElement} imgElement - The element representing the sound icon.
 * @param {string} soundOnPath - Path to the "sound on" icon.
 */
function turnSoundOn(imgElement, soundOnPath) {
  soundOn = true;
  imgElement.src = soundOnPath;
  setSoundtrackVolume();

  if (soundtrackShouldBePlaying) {
    soundtrack.loop = true;
    soundtrack.play();
  }
}

/**
 * Turns the sound off and pauses the soundtrack.
 * @param {HTMLElement} imgElement - The element representing the sound icon.
 * @param {string} soundOffPath - Path to the "sound off" icon.
 */
function turnSoundOff(imgElement, soundOffPath) {
  soundOn = false;
  imgElement.src = soundOffPath;
  soundtrack.pause();
}

/**
 * Checks if the camera is adjusting, and if so, changes the soundtrack to the Endboss theme.
 */
function checkCameraAdjustmentAndChangeSoundtrack() {
  if (world) {
    if (world.isCameraAdjusting && !soundtrackChanged) {
      soundtrack.pause();
      soundtrackShouldBePlaying = false;
      soundtrackChanged = true;

      changeToEndbossSoundtrack();
    }
  }
}

/**
 * Changes the soundtrack to the Endboss theme after a delay.
 */
function changeToEndbossSoundtrack() {
  setTimeout(() => {
    soundtrack = new Audio("audio/EndbossSoundtrack.mp3");
    soundtrack.loop = true;
    setSoundtrackVolume();
    soundtrackShouldBePlaying = true;

    if (soundOn) {
      soundtrack.play();
    }
  }, 5300);
}

/**
 * Sets the volume of the soundtrack depending on whether it's the Endboss or regular soundtrack.
 */
function setSoundtrackVolume() {
  if (soundtrack.src.includes("audio/EndbossSoundtrack.mp3")) {
    soundtrack.volume = 0.7;
  } else if (soundtrack.src.includes("audio/soundtrack.mp3")) {
    soundtrack.volume = 0.2;
  } else {
    soundtrack.volume = 0.5;
  }
}

/**
 * Clears all active intervals in the game.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Displays the Game Over screen, updates the end screen with Game Over HTML,
 * clears intervals, and toggles the mobile play panel.
 */
function showGameOverScreen() {
  gameStart = false;
  let endScreen = document.getElementById("endScreen");
  endScreen.innerHTML = showGameOverScreenHtml();

  endScreen.classList.remove("d-none");
  clearAllIntervals();
  toggleMobilePlayPanel();
}

/**
 * Returns the HTML structure for the Game Over screen.
 * @returns {string} HTML for the Game Over screen.
 */
function showGameOverScreenHtml() {
  return /*html*/ `
   <img class="end-screen-img" src="./img/9_intro_outro_screens/game_over/game over.png" alt="">
            <div class="end-buttons">
                <button onclick="goHome()" class="end-button">HOME</button>
                <button onclick="restartGame()" class="end-button">RESTART</button>
            </div>
  `;
}

/**
 * Displays the You Win screen, updates the end screen with win HTML,
 * clears intervals, and toggles the mobile play panel.
 * @param {number} collectedCoins - The number of coins collected by the player.
 */
function showYouWinScreen(collectedCoins) {
  gameStart = false;
  let endScreen = document.getElementById("endScreen");
  endScreen.innerHTML = showYouWinScreenHtml(collectedCoins);

  endScreen.classList.remove("d-none");
  clearAllIntervals();
  toggleMobilePlayPanel();
}

/**
 * Returns the HTML structure for the You Win screen, including the number of collected coins.
 * @param {number} collectedCoins - The number of coins collected by the player.
 * @returns {string} HTML for the You Win screen.
 */
function showYouWinScreenHtml(collectedCoins) {
  return /*html*/ `
      <div class="end-screen-collected-coins">
      <img src="./img/8_coin/coinEndscreen.png" alt="Collected Coins">
      <span>${collectedCoins}/10</span>
    </div>
    <img class="end-screen-img" src="./img/9_intro_outro_screens/win/youWinBg.png" alt="You Win Background">
    <div class="end-buttons">
      <button class="end-button" onclick="goHome()">HOME</button>
      <button class="end-button" onclick="restartGame()">RESTART</button>
    </div>
  `;
}

/**
 * Toggles the visibility of the info screen. Opens the screen if it's hidden and closes it if it's visible.
 * Prevents event propagation to avoid triggering unintended actions.
 * @param {Event} event - The click event that triggered the toggle (optional).
 */
function toggleInfoScreen(event) {
  if (event) event.stopPropagation();
  let infoScreen = document.getElementById("infoScreen");

  if (infoScreen.classList.contains("d-none")) {
    openInfoScreen();
  } else {
    closeInfoScreen();
  }
}

/**
 * Opens the info screen and adds an event listener to close the screen when clicking outside of it.
 */
function openInfoScreen() {
  let infoScreen = document.getElementById("infoScreen");
  infoScreen.classList.remove("d-none");
  document.addEventListener("click", closeInfoOnClickOutside);
}

/**
 * Closes the info screen and removes the event listener that checks for clicks outside the info screen.
 */
function closeInfoScreen() {
  let infoScreen = document.getElementById("infoScreen");
  infoScreen.classList.add("d-none");
  document.removeEventListener("click", closeInfoOnClickOutside);
}

/**
 * Closes the info screen if the user clicks outside of it.
 * @param {Event} event - The click event that occurred outside of the info screen.
 */
function closeInfoOnClickOutside(event) {
  let infoScreen = document.getElementById("infoScreen");
  if (!infoScreen.contains(event.target)) {
    closeInfoScreen();
  }
}

/**
 * Toggles the visibility of the mobile play panel based on whether the game has started and if the device is mobile or tablet.
 */
function toggleMobilePlayPanel() {
  let mobilePlayPanel = document.getElementById("mobilePlayPanel");
  if (gameStart && isMobileOrTablet()) {
    mobilePlayPanel.classList.remove("d-none");
  } else {
    mobilePlayPanel.classList.add("d-none");
  }
}

/**
 * Detects if the current device is a mobile or tablet by checking for touch capabilities and user agent strings.
 * @returns {boolean} True if the device is a mobile or tablet, false otherwise.
 */
function isMobileOrTablet() {
  let isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
  let userAgent = navigator.userAgent.toLowerCase();
  let isMobileAgent = /mobi|android|ipad|tablet|iphone|ipod/i.test(userAgent);
  return isTouchDevice || isMobileAgent;
}

/**
 * Initializes the portrait warning if the device is a mobile or tablet.
 * Shows a warning if the device is in portrait orientation.
 */
function initPortraitWarning() {
  if (isMobileOrTablet()) {
    handleOrientationChangeMobile();
  }
}

/**
 * Handles changes in device orientation on mobile or tablet.
 * Adds listeners for orientation change and window resize events to show or hide the portrait warning.
 */
function handleOrientationChangeMobile() {
  let mediaQuery = window.matchMedia("(orientation: portrait)");
  togglePortraitWarning(mediaQuery.matches);

  mediaQuery.addEventListener("change", (e) => {
    togglePortraitWarning(e.matches);
  });
  window.addEventListener("resize", () => {
    togglePortraitWarning(mediaQuery.matches);
  });
}

/**
 * Toggles the display of the portrait mode warning overlay.
 * Shows the warning and disables body scroll when in portrait mode, hides the warning and enables scroll in landscape mode.
 * @param {boolean} show - Indicates whether to show (true) or hide (false) the portrait warning.
 */
function togglePortraitWarning(show) {
  let warningOverlay = document.getElementById("portraitWarningMobile");
  let body = document.querySelector("body");
  if (warningOverlay) {
    if (show) {
      warningOverlay.classList.remove("d-none");
      body.style.overflow = "hidden";
    } else {
      warningOverlay.classList.add("d-none");
      body.style.overflow = "auto";
    }
  }
}
