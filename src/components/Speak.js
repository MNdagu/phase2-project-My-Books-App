 import React, { useState, useEffect } from "react";

function Speak({ book }) {
  //initialize speaking 
  const [speaking, setSpeaking] = useState(false);
  //initialize selected voice
  const [selectedVoice, setSelectedVoice] = useState(null);

  //retrieve the available TTS voice from the browser 
  useEffect(() => {
    const fetchVoices = () => {
      //getVoices() method to fetch available voice for the TTS
      const availableVoices = speechSynthesis.getVoices();
      //find desired  voice which is either google US in english 
      const desiredVoice = availableVoices.find(
        (voice) => voice.name === "Google US English" || voice.lang === "en-US"
      );
      //set selected voivce to the desired voice of desired voice not found set to first voice in array
      setSelectedVoice(desiredVoice || availableVoices[0]);
    };

    fetchVoices();
    //set event handler onVoiceChanged ,whenever the list of available voices changes , the fetchVoices is called again to update selectedVoice
    speechSynthesis.onvoiceschanged = fetchVoices;
  }, []);
 
  //split descriptio to smaller chunks
  const splitDescription = (text, chunkSize) => {
    // an empty array to hold the split chunks of description
    const chunks = [];
    //iterate through the text and break it to chunks
    for (let i = 0; i < text.length; i += chunkSize) {
      chunks.push(text.substring(i, i + chunkSize));
    }
    // return chunks array
    return chunks;
  };
  
// function to handle the process of speaking using TTS
  const speakText = () => {
    // check if book and book description exists before proceeding
    if (book && book.description) {
      const chunks = splitDescription(book.description, 200); // Adjust chunk size as needed
      //keep track of which chunk is being spoken
      let currentChunkIndex = 0;

      // speak the next chunk until  all chunks are spoken
      const speakNextChunk = () => {
        if (currentChunkIndex < chunks.length) {
          //represent the TTS request for the current chunk of description
          const newUtterance = new SpeechSynthesisUtterance(chunks[currentChunkIndex]);
          //assign selected voice to the chunk
          newUtterance.voice = selectedVoice;

          // event hanlder onend which increaments current chunk index and calls the next chunk index
          newUtterance.onend = () => {
            currentChunkIndex++;
            speakNextChunk();
          };

          //start speaking next chunk 
          speechSynthesis.speak(newUtterance);
        } else {
          setSpeaking(false);
        }
      };

      // set speaking state to true 
      setSpeaking(true);
      speakNextChunk();
    } else {
      alert("Oops! Book description is not available or TTS is not supported.");
    }
  };

  //stop TTS process
  const stopSpeaking = () => {
    if (speaking) {
      //cancel any ongoing speech
      speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  return (
    <div>
      <button onClick={speakText} disabled={speaking}>
        {speaking ? "Speaking..." : "Play audio"}
      </button>
      <button onClick={stopSpeaking} disabled={!speaking}>
        Stop audio
      </button>
    </div>
  );
}

export default Speak;