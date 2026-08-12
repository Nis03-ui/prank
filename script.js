const readButton =
  document.getElementById("readButton");

const newsPage =
  document.getElementById("newsPage");

const loadingScreen =
  document.getElementById("loadingScreen");

const prankScreen =
  document.getElementById("prankScreen");

const prankAudio =
  document.getElementById("prankAudio");


let loadingTimer;


// ======================================
// READ BUTTON
// ======================================

readButton.addEventListener("click", () => {

  readButton.disabled = true;


  /*
    Prepare the audio after the user's
    interaction.
  */

  prankAudio.load();


  /*
    Hide article.
  */

  newsPage.style.display = "none";


  /*
    Show realistic loading screen.
  */

  loadingScreen.classList.add("show");


  /*
    Wait 3 seconds.
  */

  loadingTimer = setTimeout(() => {

    showPrank();

  }, 3000);

});


// ======================================
// SHOW PRANK
// ======================================

async function showPrank() {

  loadingScreen.classList.remove("show");

  prankScreen.classList.add("show");


  /*
    Attempt audio playback.

    The browser may still reject playback
    depending on its media policy.
  */

  prankAudio.currentTime = 0;


  try {

    await prankAudio.play();

    console.log(
      "Prank audio started."
    );

  } catch (error) {

    console.log(
      "Audio playback blocked by browser:",
      error
    );

  }

}


// ======================================
// CLEANUP
// ======================================

window.addEventListener(
  "pagehide",
  () => {

    if (loadingTimer) {
      clearTimeout(loadingTimer);
    }

    prankAudio.pause();

    prankAudio.currentTime = 0;

  }
);


window.addEventListener(
  "beforeunload",
  () => {

    if (loadingTimer) {
      clearTimeout(loadingTimer);
    }

    prankAudio.pause();

  }
);