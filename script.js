/*----------------------------------------------------------*/
/* GLOBAL SCOPE VARIABLES */

const sliders = document.querySelector("#sliders-container");
const sliderRed = document.querySelector("#slider-red");
const sliderGreen = document.querySelector("#slider-green");
const sliderBlue = document.querySelector("#slider-blue");
const btnRandom = document.querySelector("#btn-random");
const root = document.documentElement;
let randomColor = null;

/*----------------------------------------------------------*/
/* INIT */

init();

/*----------------------------------------------------------*/
/* FUNCTION DEFINITIONS */

function init() {
  updateColorValues();
  updateHex();

  sliders.addEventListener("input", updateColorValues);
  btnRandom.addEventListener("click", applyRandomColor);
}

function updateColorValues() {
  root.style.setProperty("--r-value", sliderRed.value);
  root.style.setProperty("--g-value", sliderGreen.value);
  root.style.setProperty("--b-value", sliderBlue.value);
  updateHex();
}

function applyRandomColor() {
  fetchRandomColor();

  // Error Handling
  if (randomColor === null) {
    console.log("Random color could not be loaded.");
    return;
  }

  // Successful path
  sliderRed.value = Number(randomColor.rgb.r);
  sliderGreen.value = Number(randomColor.rgb.g);
  sliderBlue.value = Number(randomColor.rgb.b);
  updateColorValues();
}

// Asynchronous function to fetch a random color from an API
async function fetchRandomColor() {
  try {
    // The `fetch` function sends a request to the specified API URL.
    // `await` pauses execution until the request is completed and a response is received.
    const response = await fetch("https://dummy-apis.netlify.app/api/color/");

    // `await` is used again to parse the response body as JSON.
    // This also pauses execution until the parsing is complete.
    randomColor = await response.json();

    // If everything succeeds, return the fetched color data.
    return randomColor;

    // The `catch` block executes if an error occurs in the `try` block.
    // This could be due to network failure, API unavailability, or invalid JSON response.
  } catch (error) {
    // `console.log` prints the error message to the console for debugging.
    console.log("Error fetching color:", error.message);

    // Return null to indicate failure
    return null;
  }
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
