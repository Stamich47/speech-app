const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition();

rec.lang = "en-US";
rec.continuous = false;

const startButton = document.querySelector(".start-button");
const resetButton = document.querySelector(".reset-button");

const textAppear = document.querySelector(".after-start");
const textDissapear = document.querySelector(".before-start");
const infoText = document.querySelector(".info-text");

const speechText = document.querySelector(".speech-text");
const output = document.querySelector(".speech-output");

startButton.addEventListener("click", () => {
  output.style.display = "hidden";
  infoText.style.display = "none";
  textDissapear.style.display = "none";
  textAppear.style.display = "block";
  rec.start();
});

resetButton.addEventListener("click", () => {
  infoText.style.display = "block";
  textDissapear.style.display = "block";
  textAppear.style.display = "none";
  rec.stop();
  output.innerText = "";
  output.classList.remove("alert", "alert-primary", "mt-3");
  speechText.innerText = "";
});

rec.onresult = function (e) {
  const transcript = e.results[0][0].transcript;

  function capitalFirstLetter(transcript) {
    return transcript.charAt(0).toUpperCase() + transcript.slice(1);
  }

  const confidence = (e.results[0][0].confidence * 100).toFixed(1);

  speechText.innerText = `I am ${confidence}% confident that you said: `;
  output.innerText = `${capitalFirstLetter(transcript)}`;
  output.classList.add("alert", "alert-primary", "mt-3");
};
