import { useReactMediaRecorder } from "react-media-recorder";
import React, { useEffect, useState } from "react";
import axios from "axios";

const RecordView = (props) => {
  const [audioBlob, setAudioBlob] = useState(null);

  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isActive) {
      intervalId = setInterval(() => {
        const secondCounter = counter % 60;
        const minuteCounter = Math.floor(counter / 60);

        let computedSecond =
          String(secondCounter).length === 1
            ? `0${secondCounter}`
            : secondCounter;
        let computedMinute =
          String(minuteCounter).length === 1
            ? `0${minuteCounter}`
            : minuteCounter;

        setSecond(computedSecond);
        setMinute(computedMinute);

        setCounter((counter) => counter + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive, counter]);

  function stopTimer() {
    setIsActive(false);
    setCounter(0);
    setSecond("00");
    setMinute("00");
  }

  const handleUpload = () => {
    const formData = new FormData();

    fetch(audioBlob)
        .then(response => response.blob())
        .then(async blob => {
            console.log(blob)
            formData.append('audio', blob, "recording1.wav");
            console.log(formData);

            const response = await axios.post('/upload', formData);

            console.log(response)
            console.log(response.data);
            let url = URL.createObjectURL(response.data.data)
            console.log(url)

        });

    console.log(audioBlob);


}

  const {
    status,
    startRecording,
    stopRecording,
    pauseRecording,
    mediaBlobUrl
  } = useReactMediaRecorder({
    video: false,
    audio: true,
    echoCancellation: true
  });

  console.log("url", mediaBlobUrl);

  return (

    <div className="bg-black text-white">

      <div style={{ height: "38px" }}>
        {" "}
        <audio className="bg-black  border-white mb-10 " src={mediaBlobUrl} controls loop />
      </div>

      <div>
        <button
          className="mt-7 ml-4 p-1 border border-white justify center"
          onClick={stopTimer}
        >
          Clear
        </button>

        <button
          className="mt-3 ml-4 p-1 border border-white justify center"
          onClick={() => {
            if (!isActive) {
              startRecording();
            } else {
              pauseRecording();
            }

            setIsActive(!isActive);
          }}
        >
          {isActive ? "Pause" : "Start"}
        </button>

        <button
          className="mt-3 ml-4 p-1 border border-white justify-center"
          onClick={() => {
            stopRecording();
            pauseRecording();
          }}
        >
          Stop
        </button>

        <button onClick={handleUpload} className="mt-3 ml-4 p-1 border border-white justify-center">
          Post
        </button>




      </div>


    </div>

  );
};
export default RecordView;
