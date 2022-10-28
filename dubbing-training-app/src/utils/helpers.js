export const checkVoicePermission = () => 
    navigator.mediaDevices.getUserMedia({ audio: true });
