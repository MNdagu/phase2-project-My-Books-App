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

  const speakText = () => {
    console.log(book);
    console.log(book.description);

    if ("speechSynthesis" in window && book && book.description) {
      const text = book.description;
      const utterance = new SpeechSynthesisUtterance(text);

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      speechSynthesis.speak(utterance);
    } else {
      alert("Oops! Book description is not available or TTS is not supported.");
    }
  };

  return (
    <div>
      <button onClick={speakText} disabled={speaking}>
        {speaking ? "Speaking..." : "Play audio"}
      </button>
    </div>
  );
}

export default Speak;
