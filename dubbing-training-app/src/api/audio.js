import axios from 'axios'

const uploadAudio = async (blob, session) => {
    const localToken = localStorage.getItem('token');

    const formData = new FormData();
    const file = new File([blob], `audio.mp4`);
    formData.append("file", file);

    const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/audio/upload',
        formData,
        { headers: { Authorization: 'Bearer ' + localToken}, params: {session}}
    );
    return data
}

const loadAudio = async (url) => {
    try {
        const res = await axios.get(url, { responseType: 'blob' });
        if (res.status === 200) {
            return URL.createObjectURL(res.data);
        }
    } catch {}
}

export {
    uploadAudio,
    loadAudio
}