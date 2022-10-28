import axios from 'axios';

const createScene = async (data) => {
    const localToken = localStorage.getItem('token');
    if (checkScene(data)) {
        const { data: resData } = await axios.post(process.env.REACT_APP_SERVER_URL + '/scenes/create', data, {headers: { Authorization: 'Bearer ' + localToken }});
        return resData;
    }
    return null
}

const readAllScenes = async () => {
    const localToken = localStorage.getItem('token');
    const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/scenes/read-all', {}, {headers: { Authorization: 'Bearer ' + localToken }});
    return data
}

const updateScene = async (data) => {
    const localToken = localStorage.getItem('token');
    if (checkScene(data) && data.id) {
        const { data: resData } = await axios.post(process.env.REACT_APP_SERVER_URL + '/scenes/update', data, {headers: { Authorization: 'Bearer ' + localToken }});
        return resData;
    }
    return null
}

const deleteScene = async (data) => {
    const localToken = localStorage.getItem('token');
    if (checkScene(data) && data.id) {
        const { data: resData } = await axios.post(process.env.REACT_APP_SERVER_URL + '/scenes/delete', data, {headers: { Authorization: 'Bearer ' + localToken }});
        return resData;
    }
    return null
}

const checkScene = (scene) => {
    if (scene.title && scene.role_name && scene.gender &&
        scene.age && scene.training_time &&
        scene.groups && scene.takes ) {
        return true
    }
    return false
}

const deleteUrls = async (urls) => {
    const localToken = localStorage.getItem('token');
    const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/scenes/delete-urls', {urls}, {headers: { Authorization: 'Bearer ' + localToken }});
    return data
}

const deleteTempTakes = (takes) => {
    const localToken = localStorage.getItem('token');
    const currentTakes = [];

    takes.forEach(take => {
        if (take.take_url.includes(process.env.REACT_APP_SERVER_URL + '/file')) {
            currentTakes.push(take.id)
        }
    })

    const data = new Blob(
        [JSON.stringify({takes: currentTakes, token: localToken })],
        { type: 'text/plain; charset=UTF-8', Authorization: 'Bearer ' + localToken }
    );

    if (currentTakes.length > 0) {
        navigator.sendBeacon(process.env.REACT_APP_SERVER_URL + '/takes/temp', data);
    }
}

export {
    createScene,
    updateScene,
    deleteScene,
    readAllScenes,
    deleteUrls,
    deleteTempTakes
}