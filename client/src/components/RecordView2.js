import React, { useState } from 'react';
import { ReactMediaRecorder } from 'react-media-recorder';
import axios from 'axios';

function AudioRecorder() {
    const [audioSrc, setAudioSrc] = useState(null);

    let token = localStorage.getItem("token");
    console.log(token)
    token = JSON.parse(token);

    async function handleStop(blobUrl) {
        setAudioSrc(blobUrl);

        const audioBlob = await fetch(blobUrl).then(res => res.blob());
        
        const formData = new FormData();

        formData.append('audio', audioBlob, 'audio.wav');

        const config = {
            headers: {
                'auth-token':token,
                'content-type': 'multipart/form-data',
            },
        };
        const url = '/api/audio/upload';
        await axios.post(url, formData, config);
    }

    return (
        <div>
            <ReactMediaRecorder
                audio
                render={({ startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <button onClick={startRecording}>Start Recording</button>
                        <button onClick={stopRecording}>Stop Recording</button>
                        {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
                    </div>
                )}
                onStop={handleStop}
            />
            {audioSrc && (
                <div>
                    <p>Recorded Audio:</p>
                    <audio src={audioSrc} controls />
                </div>
            )}
        </div>
    );
}

export default AudioRecorder
