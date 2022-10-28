import axios from 'axios'

const readAllScenes = async (id) => {
    const localToken = localStorage.getItem('token');
    const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/scenes/read-all-groups', { id }, {headers: { Authorization: 'Bearer ' + localToken }});
    return data
}

const readScene = async (scene, session) => {
    const localToken = localStorage.getItem('token');
    const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/scenes/read', { scene, session }, {headers: { Authorization: 'Bearer ' + localToken }});
    return data
}

const readDataScenes = async (session) => {
    const localToken = localStorage.getItem('token');
    const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/scenes/read-scene-data', { session }, {headers: { Authorization: 'Bearer ' + localToken }});
    return data
}

export {
    readAllScenes,
    readDataScenes,
    readScene
}