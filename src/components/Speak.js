import React, { useState } from "react";
function Speak({ book }) {
  const [speaking, setSpeaking] = useState(false);
  const speakText = () => {
    if ("speechSynthesis" in window) {
      //extract description  that will be read out loud
      const text = book.description;
      // create a speechSynthesis Utterance object that will be used to perform speech 
      const utterance = new SpeechSynthesisUtterance(text);
      // indicate that text is currently being spoken 
      setSpeaking(true);
      // stop speaking when text ends
      utterance.onend = () => setSpeaking(false);
      //initiate speech using speak method passing utterance as argument
      speechSynthesis.speak(utterance);
    } else {
      alert("oopsie! Browser doesn't support TTS");
    }
  };
  return (
    // conditioned button to change when audio is being played to speaking and play audio  when not speaking
    <div>
      <button onClick={speakText} disabled={speaking}>
        {speaking ? "Speaking..." : "play audio"}
      </button>
    </div>
  );
}
export default Speak;


