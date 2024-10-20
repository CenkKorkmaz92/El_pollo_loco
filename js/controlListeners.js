/**
 * Maps key names to the corresponding properties in the keyboard object.
 */
const keyMap = {
    " ": "space",
    ArrowLeft: "left",
    ArrowRight: "right",
    ArrowUp: "up",
    ArrowDown: "down",
    d: "d",
  };
  
  /**
   * Adds event listeners for keyboard interactions (keydown and keyup) to manage game controls.
   */
  function keyboardListener() {
    window.addEventListener("keydown", handleKeyChange(true));
    window.addEventListener("keyup", handleKeyChange(false));
  }
  
  /**
   * Handles the change in key state (keydown or keyup) by updating the corresponding
   * property in the keyboard object.
   *
   * @param {boolean} isKeyDown - Whether the key is being pressed down (true) or released (false).
   * @returns {function} A function that handles the keydown or keyup event.
   */
  function handleKeyChange(isKeyDown) {
    return function (event) {
      const key = keyMap[event.key];
      if (key) {
        event.preventDefault();
        keyboard[key] = isKeyDown;
  
        if (key === "space" && isKeyDown && world) {
          world.checkThrowObjects();
        }
      }
    };
  }
  
  /**
   * Adds touch listeners to the control buttons for left, right, up, and space actions.
   */
  function touchListener() {
    const buttonLeft = document.getElementById("buttonLeft");
    const buttonRight = document.getElementById("buttonRight");
    const buttonUp = document.getElementById("buttonUp");
    const buttonSpace = document.getElementById("buttonSpace");
  
    addTouchListeners(buttonLeft, "left");
    addTouchListeners(buttonRight, "right");
    addTouchListeners(buttonUp, "up");
    addTouchListeners(buttonSpace, "space");
  }
  
  /**
   * Attaches touch event listeners (touchstart, touchend, touchcancel) to a button element.
   *
   * @param {HTMLElement} button - The button element to which the listeners will be attached.
   * @param {string} key - The corresponding key action for the button (e.g., "left", "right", "up", "space").
   */
  function addTouchListeners(button, key) {
    button.addEventListener("touchstart", (e) => handleTouchStart(e, key));
    button.addEventListener("touchend", (e) => handleTouchEnd(e, key));
    button.addEventListener("touchcancel", (e) => handleTouchEnd(e, key));
  }
  
  /**
   * Handles the end of a touch event (touchend or touchcancel) by setting the corresponding key to false.
   *
   * @param {TouchEvent} e - The touch event object.
   * @param {string} key - The key associated with the event (e.g., "left", "right", "up", "space").
   */
  function handleTouchEnd(e, key) {
    e.preventDefault();
    keyboard[key] = false;
  }
  
  /**
   * Handles the start of a touch event by setting the corresponding key to true.
   * Special case: If the key is "space", check if objects can be thrown in the game world.
   *
   * @param {TouchEvent} e - The touch event object.
   * @param {string} key - The key associated with the event (e.g., "left", "right", "up", "space").
   */
  function handleTouchStart(e, key) {
    e.preventDefault();
    keyboard[key] = true;
    if (key === "space" && world) {
      world.checkThrowObjects();
    }
  }
  