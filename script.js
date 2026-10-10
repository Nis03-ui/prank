const readButton = document.getElementById("readButton");
const newsPage = document.querySelector("main");
const loadingScreen = document.getElementById("loadingScreen");
const prankScreen = document.getElementById("prankScreen");
const prankAudio = document.getElementById("prankAudio");
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

let loadingTimer = null;
let slideTimer = null;

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const slides = Array.from(document.querySelectorAll(".slide"));
const dots = Array.from(document.querySelectorAll(".slider-dots button"));
let activeSlide = 0;

function showSlide(index) {
  if (!slides.length) return;
  activeSlide = (index + slides.length) % slides.length;
  slides.forEach((slide, i) => slide.classList.toggle("active", i === activeSlide));
  dots.forEach((dot, i) => dot.classList.toggle("active", i === activeSlide));
}

document.getElementById("prevSlide")?.addEventListener("click", () => showSlide(activeSlide - 1));
document.getElementById("nextSlide")?.addEventListener("click", () => showSlide(activeSlide + 1));
dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));
if (slides.length > 1) slideTimer = setInterval(() => showSlide(activeSlide + 1), 6500);

if (readButton) {
  readButton.addEventListener("click", () => {
    readButton.disabled = true;
    try {
      prankAudio.load();
    } catch (error) {
      console.warn("Unable to prepare prank sound:", error);
    }
    if (newsPage) newsPage.style.display = "none";
    if (navigation) navigation.style.display = "none";
    loadingScreen.classList.add("show");
    loadingTimer = setTimeout(showPrank, 3000);
  });
}

async function showPrank() {
  loadingScreen.classList.remove("show");
  prankScreen.classList.add("show");
  prankAudio.currentTime = 0;
  try {
    await prankAudio.play();
  } catch (error) {
    console.warn("Browser did not play the prank audio:", error);
  }
}

window.addEventListener("pagehide", () => {
  if (loadingTimer) clearTimeout(loadingTimer);
  if (slideTimer) clearInterval(slideTimer);
  prankAudio.pause();
  prankAudio.currentTime = 0;
});