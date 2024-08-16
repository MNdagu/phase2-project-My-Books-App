import React, { useState, useEffect } from "react";

function Speak({ book }) {
  const [speaking, setSpeaking] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    const fetchVoices = () => {
      const availableVoices = speechSynthesis.getVoices();
      const desiredVoice = availableVoices.find(
        (voice) => voice.name === "Google US English" || voice.lang === "en-US"
      );
      setSelectedVoice(desiredVoice || availableVoices[0]);
    };

    fetchVoices();
    speechSynthesis.onvoiceschanged = fetchVoices;
  }, []);

  const splitDescription = (text, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.substring(i, i + chunkSize));
    }
    return chunks;
  };
  

  const speakText = () => {
    if (book && book.description) {
      const chunks = splitDescription(book.description, 200); // Adjust chunk size as needed
      let currentChunkIndex = 0;

      const speakNextChunk = () => {
        if (currentChunkIndex < chunks.length) {
          const newUtterance = new SpeechSynthesisUtterance(chunks[currentChunkIndex]);
          newUtterance.voice = selectedVoice;

          newUtterance.onend = () => {
            currentChunkIndex++;
            speakNextChunk();
          };

          speechSynthesis.speak(newUtterance);
        } else {
          setSpeaking(false);
        }
      };

      setSpeaking(true);
      speakNextChunk();
    } else {
      alert("Oops! Book description is not available or TTS is not supported.");
    }
  };

  const stopSpeaking = () => {
    if (speaking) {
      speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  return (
    <div className="tts">
      <button className="speak" onClick={speakText} disabled={speaking}>
        {speaking ? "Speaking..." : "Play audio"}
      </button>
      <button className="speak" onClick={stopSpeaking} disabled={!speaking}>
        Stop audio
      </button>
    </div>
  );
}

export default Speak;
