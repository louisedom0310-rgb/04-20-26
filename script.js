function startMic() {
  document.getElementById("hbd_hbd.mp3").play();

  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new AudioContext();
      const mic = audioContext.createMediaStreamSource(stream);
      const analyser = audioContext.createAnalyser();

      mic.connect(analyser);
      analyser.fftSize = 256;

      const dataArray = new Uint8Array(analyser.frequencyBinCount);

      function detectSound() {
        analyser.getByteFrequencyData(dataArray);

        let volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

        if (volume > 50) {
          blowOut();
        }

        requestAnimationFrame(detectSound);
      }

      detectSound();
    });
}

function blowOut() {
  document.querySelectorAll(".flame").forEach(f => f.style.display = "none");
  alert("🎉 Enjoy yo 24 hours!");
}
