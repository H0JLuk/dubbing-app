import axios from 'axios';

const signInAdmin = async (data) => {
    const { data: resData } = await axios.post(process.env.REACT_APP_SERVER_URL + '/auth/admin', data);
    return resData;
}

const checkAdminToken = async (localToken) => {
    const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + '/users/admin-profile', {headers: { Authorization: 'Bearer ' + localToken }});
    return data;
}

const fetchAllUsers = async () => {
    const localToken = localStorage.getItem('token');
    const { data } = await axios.get(process.env.REACT_APP_SERVER_URL + '/users/get-all', {headers: {Authorization: 'Bearer ' + localToken}});
    return data;
}

const updateUser = async (user) => {
    const localToken = localStorage.getItem('token');
    const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/users/update', user, {headers: { Authorization: 'Bearer ' + localToken }});
    return data;
}

const createUser = async (user) => {
    const localToken = localStorage.getItem('token');
    const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/users/create', user, {headers: { Authorization: 'Bearer ' + localToken }});
    return data;
}

const deleteUser = async (user) => {
    const localToken = localStorage.getItem('token');
    const { data } = await axios.post(process.env.REACT_APP_SERVER_URL + '/users/delete', user, {headers: { Authorization: 'Bearer ' + localToken }});
    return data;
}

export {
    signInAdmin,
    checkAdminToken,
    fetchAllUsers,
    updateUser,
    createUser,
    deleteUser
}