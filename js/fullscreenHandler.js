/**
 * Toggles fullscreen mode for the specified element.
 * If not already in fullscreen, it will enter fullscreen mode; otherwise, it will exit fullscreen mode.
 */
function openFullscreen() {
    if (!document.fullscreenElement) {
      checkFullscreen();
    } else {
      closeFullscreen();
    }
  }
  
  /**
   * Requests fullscreen mode for the specified element.
   * Uses the appropriate method depending on the browser (standard, webkit, or ms).
   */
  function checkFullscreen() {
    let elem = document.getElementById("fullscreen");
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  }
  
  /**
   * Exits fullscreen mode for the document.
   * Uses the appropriate method depending on the browser (standard, webkit, or ms).
   */
  function closeFullscreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
  
  /**
   * Registers an event listener that handles changes in fullscreen state.
   */
  function registerFullscreenChangeListener() {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
  }
  
  /**
   * Handles the changes in fullscreen mode by adjusting the canvas size and updating the fullscreen icon.
   * @param {Event} event - The fullscreen change event.
   */
  
  function handleFullscreenChange(event) {
    let canvas = document.getElementById("canvas");
    let fullscreenIcon = document.getElementById("fullscreenIcon");
    if (document.fullscreenElement) {
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      fullscreenIcon.src = "img/10_interface_icons/fullscreen.png";
    } else {
      canvas.style.width = "";
      canvas.style.height = "";
      fullscreenIcon.src = "img/10_interface_icons/fullscreen.png";
    }
  }
  