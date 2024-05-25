const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const rec = new SpeechRecognition();

rec.lang = 'en-US';
rec.continuous = false;

rec.onresult = function (e) {
  const speechText = document.querySelector('.speech-text');
  const output = document.querySelector('.speech-output');

  const transcript = e.results[0][0].transcript;
  function capitalFirstLetter(transcript) {
    return transcript.charAt(0).toUpperCase() + transcript.slice(1);
  }

  const confidence = (e.results[0][0].confidence * 100).toFixed(1);

  speechText.innerText = `I am ${confidence}% confident that you said: `;
  output.innerText = `${capitalFirstLetter(transcript)}`;
};

rec.start();
