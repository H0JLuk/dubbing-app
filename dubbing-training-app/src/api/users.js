import axios from 'axios';

const signInUser = async (data) => {
    const { data: resData } = await axios.post(process.env.REACT_APP_SERVER_URL + '/auth/login', data);
    return resData;
}

const checkUserToken = async (localToken) => {
    const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + '/users/profile', {headers: { Authorization: 'Bearer ' + localToken }});
    return data
}

export {
    signInUser,
    checkUserToken
}