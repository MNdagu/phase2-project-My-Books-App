import React,{useState}  from "react";
function Speak({book}) {
  const [speaking, setSpeaking] = useState(false);
  const speakText = () => {
    if ("speechSynthesis" in window) {
      const text = book.description;
      const utterance = new SpeechSynthesisUtterance(text);
      setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      speechSynthesis.speak(utterance);
    } else {
      alert("oopsie! Browser doesnt support text to audio");
    }
    return (
      <div>
        <button onClick={speakText} disabled={speaking}>{speaking? "Speaking...": "Read out loud"}</button>
      </div>
    )
  };
}
export default Speak;

