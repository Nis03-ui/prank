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


let loadingTimer = null;


// ======================================
// READ FULL STORY
// ======================================

readButton.addEventListener("click", () => {

  readButton.disabled = true;


  /*
    Prepare the audio after the user's
    interaction.
  */

  try {
    prankAudio.load();
  } catch (error) {
    console.log(error);
  }


  /*
    Hide the news page.
  */

  newsPage.style.display = "none";


  /*
    Show realistic loading state.
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
    Attempt to play the authorized
    prank audio.
  */

  prankAudio.currentTime = 0;


  try {

    await prankAudio.play();

    console.log(
      "Audio started successfully."
    );

  } catch (error) {

    console.log(
      "Browser blocked audio:",
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