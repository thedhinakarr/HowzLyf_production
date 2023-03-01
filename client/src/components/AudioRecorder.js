import React, { useState } from 'react';
import axios from 'axios';

const AudioRecorder = () => {
  const [recording, setRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);

  const handleStartRecording = () => {
    setRecording(true);

    // Request access to the user's microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.addEventListener('dataavailable', (event) => {
          if (event.data.size > 0) {
            setAudioChunks((chunks) => [...chunks, event.data]);
          }
        });

        mediaRecorder.start();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleStopRecording = () => {
    setRecording(false);

    // Stop recording and create a new audio Blob
    const mediaRecorder = audioChunks.length > 0 && new MediaRecorder(new Blob(audioChunks));
    mediaRecorder?.stop();

    // Send the audio data to the server using a POST request
    if (mediaRecorder) {
      const formData = new FormData();
      formData.append('audio', mediaRecorder.blob, 'recording.wav');

      axios.post('/api/upload-audio', formData)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    setAudioChunks([]);
  };

  return (
    <div>
      <button className='text-white' onClick={handleStartRecording} disabled={recording}>Start Recording</button>
      <button className='text-white' onClick={handleStopRecording} disabled={!recording}>Stop Recording</button>
    </div>
  );
};

export default AudioRecorder;

