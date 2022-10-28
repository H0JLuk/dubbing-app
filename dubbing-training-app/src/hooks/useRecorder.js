import { useEffect, useState } from "react";

const useRecorder = ({ onError, onFinishRecord }) => {
    const [audioData, setAudioData] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [recorder, setRecorder] = useState(null);

    useEffect(() => {
        if (recorder === null) {
            if (isRecording) {
                requestRecorder().then(setRecorder, console.error);
            }
            return;
        }

        isRecording ? recorder.start() : recorder.stop();

        recorder.ondataavailable = (e) => {
            setAudioData(e.data);
            onFinishRecord?.(e.data);
        };
        recorder.onerror = (e) => onError?.(e);

        return () => {
            recorder.ondataavailable = null;
            recorder.onerror = null;
        }
        // eslint-disable-next-line
    }, [recorder, isRecording]);

    const startRecording = () => setIsRecording(true);
    const stopRecording = () => setIsRecording(false);

    return { audioData, isRecording, startRecording, stopRecording };
};

async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
}
export default useRecorder;
