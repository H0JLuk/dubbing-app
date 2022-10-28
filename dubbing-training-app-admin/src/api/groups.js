import axios from 'axios';

const getAllGroups = async () => {
    const localToken = localStorage.getItem('token');
    const { data: resData } = await axios.post(process.env.REACT_APP_SERVER_URL + '/group/read-all', {}, {headers: { Authorization: 'Bearer ' + localToken }});
    return resData;
}

export {
    getAllGroups
}