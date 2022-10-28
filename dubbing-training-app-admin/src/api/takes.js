import axios from 'axios';

const deleteTake = async (data) => {
    const localToken = localStorage.getItem('token');
    const { data: resData } = await axios.post(process.env.REACT_APP_SERVER_URL + '/takes/delete', { data }, {headers: { Authorization: 'Bearer ' + localToken }});
    return resData;
}

const uploadVideo = async (file) => {
    const localToken = localStorage.getItem('token');

    const { data: resData } = await axios.post(
        process.env.REACT_APP_SERVER_URL + '/takes/upload-video',
        file,
        { headers: { Authorization: 'Bearer ' + localToken }});
    return resData;
}

const deleteVideo = async (key) => {
    const localToken = localStorage.getItem('token');
    const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/file/delete', { key: key }, {headers: { Authorization: 'Bearer ' + localToken}});
    return data;
}

export {
    deleteTake,
    uploadVideo,
    deleteVideo
}