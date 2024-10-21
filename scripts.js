const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition();

rec.lang = "en-US";
rec.continuous = false;

const startButton = document.querySelector(".start-button");
const stopButton = document.querySelector(".stop-button");

const textAppear = document.querySelector(".after-start");
const textDissapear = document.querySelector(".before-start");

const speechText = document.querySelector(".speech-text");
const output = document.querySelector(".speech-output");

startButton.addEventListener("click", () => {
  output.style.display = "hidden";
  textDissapear.style.display = "none";
  textAppear.style.display = "block";
  rec.start();
});

stopButton.addEventListener("click", () => {
  textDissapear.style.display = "block";
  textAppear.style.display = "none";
  rec.stop();
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
