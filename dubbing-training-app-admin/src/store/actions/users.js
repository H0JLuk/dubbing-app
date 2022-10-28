import { SET_USERS_LIST, SET_ACTIVE_USER, SET_CHANGED_USER, ADD_NEW_USER } from './actionTypes'
import { fetchAllUsers, updateUser, createUser, deleteUser } from '../../api/users'

const getAllUsers = () => {
    return async dispatch => {
        const users = await fetchAllUsers();
        dispatch({
            type: SET_USERS_LIST,
            payload: users
        })
    }
}

const setActiveUser = (user) => {
    return {
        type: SET_ACTIVE_USER,
        payload: user
    }
}

const setChangedUser = (user) => {
    return {
        type: SET_CHANGED_USER,
        payload: user
    }
}

const setNewUser = () => {
    const newUser = {
        username: '',
        session: '',
        password: '',
        note: '',
        temporary: false,
        role: 'speaker',
        groups: []
    }

    return {
        type: SET_ACTIVE_USER,
        payload: newUser
    }
}

const addNewUser = (user) => {
    return {
        type: ADD_NEW_USER,
        payload: user
    }
}

const saveUser = (user) => {
    return async dispatch => {
        if (user.id) {
            const data = await updateUser(user);

            if (data) {
                const { password, ...newUser } = data;
                alert('Saved')
                dispatch(getAllUsers());
                dispatch(setActiveUser(newUser));
            }
        } else {
            const data = await createUser(user);

            if (data && !data.error) {
                const { password, ...newUser } = data;
                alert('Saved')
                dispatch(addNewUser(newUser));
                dispatch(setActiveUser(newUser));
            } else if(data && data.error) {
                alert(data.error)
            } else {
                alert('Something goes wrong');
            }
        }
    }
}

const removeUser = (user) => {
    return async dispatch => {
        if (user.id) {
            const data = await deleteUser(user);

            if (data) {
                alert('Deleted');
                dispatch(getAllUsers());
                dispatch(setActiveUser(null));
            }
        } else {
            dispatch(setActiveUser(null));
        }
    }
}

export {
    getAllUsers,
    setActiveUser,
    setChangedUser,
    addNewUser,
    setNewUser,
    saveUser,
    removeUser
}