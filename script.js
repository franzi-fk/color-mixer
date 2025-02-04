/*----------------------------------------------------------*/
/* GLOBAL SCOPE VARIABLES */

const sliders = document.querySelector("#sliders-container");
const sliderRed = document.querySelector("#slider-red");
const sliderGreen = document.querySelector("#slider-green");
const sliderBlue = document.querySelector("#slider-blue");
const btnRandom = document.querySelector("#btn-random");
const root = document.documentElement;

/*----------------------------------------------------------*/
/* INIT */

updateColorValues();
updateHex();

sliders.addEventListener("input", updateColorValues);
btnRandom.addEventListener("click", applyRandomColor);

/*----------------------------------------------------------*/
/* FUNCTION DEFINITIONS */

function updateColorValues() {
  root.style.setProperty("--r-value", sliderRed.value);
  root.style.setProperty("--g-value", sliderGreen.value);
  root.style.setProperty("--b-value", sliderBlue.value);
  updateHex();
}

function applyRandomColor() {
  fetch("https://dummy-apis.netlify.app/api/color")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((color) => {
      sliderRed.value = Number(color.rgb.r);
      sliderGreen.value = Number(color.rgb.g);
      sliderBlue.value = Number(color.rgb.b);
      updateColorValues();
    });
}

function updateHex() {
  const hex = document.querySelector("#hex-value");
  hex.innerText = rgbToHex(
    Number(sliderRed.value),
    Number(sliderGreen.value),
    Number(sliderBlue.value)
  );
}

function rgbToHex(r, g, b) {
  // Convert each color component to a 2-digit hex
  const red = r.toString(16).padStart(2, "0");
  const green = g.toString(16).padStart(2, "0");
  const blue = b.toString(16).padStart(2, "0");

  // Combine them and return the final hex code
  return `#${red}${green}${blue}`;
}
