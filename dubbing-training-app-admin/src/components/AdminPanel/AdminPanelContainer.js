import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import AdminPanel from "./AdminPanel"
import { getAllScenes, setNewScene, getGroups, saveScene, removeScene } from '../../store/actions/scenes'
import { setScenesInterface, setUsersInterface } from '../../store/actions/settings'
import { setNewUser, getAllUsers, saveUser } from '../../store/actions/users'
import { deleteTempTakes } from '../../api/scenes'
import deepEqual from '../../utils/deepEqual'

const AdminPanelContainer = () => {
    const dispatch = useDispatch();
    const [ isSceneChanged, setSceneChange ] = useState(false);
    const [ isUserValid, setUserValid ] = useState(false);
    const scenes = useSelector(state => state.scenes);
    const { isUsersVisible, isScenesVisible } = useSelector(state => state.settings);
    const users = useSelector(state => state.users);

    useEffect(() => {
        dispatch(getAllScenes());
        dispatch(getAllUsers());
        dispatch(getGroups());
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        window.addEventListener("beforeunload", refreshAlert, false);
        window.addEventListener('pagehide' , unloadHandler);

        return () => {
            window.removeEventListener("beforeunload", refreshAlert);
            window.removeEventListener('pagehide' , unloadHandler);
        };
        // eslint-disable-next-line
    }, [isSceneChanged, isUserValid])

    const unloadHandler = () => {
        if (isSceneChanged || isUserValid) {
            deleteTempTakes(scenes.takes);
        }
    }

    const refreshAlert = (e) => {
        if (isSceneChanged || isUserValid) {
            e.preventDefault();
            e.returnValue = '';
        }
    }

    const addScene = () => {
        dispatch(setNewScene());
    }

    const addUser = () => {
        dispatch(setNewUser());
    }

    const saveSceneHandler = (e) => {
        const isDataEqual = deepEqual(scenes.activeScene, scenes.changedScene);
        e.preventDefault();

        if (!isDataEqual) {
            if (isSceneChanged) {
                dispatch(saveScene(scenes.changedScene));
            } else {
                alert('Invalid data')
            }
        }
    }

    const saveUserHandler = (e) => {
        const isDataEqual = deepEqual(users.activeUser, users.changedUser);
        e.preventDefault();

        if (!isDataEqual) {
            if (isUserValid) {
                dispatch(saveUser(users.changedUser));
            } else {
                alert('Invalid symbols')
            }
        }
    }

    const deleteHandler = (scene) => {
        const isReady = window.confirm('Delete?')
        isReady && dispatch(removeScene(scene, scenes.allScenes))
    }

    const scenesHandler = () => {
        dispatch(setScenesInterface());
    }

    const usersHandler = () => {
        dispatch(setUsersInterface())
    }

    return <AdminPanel
        activeUser={users.activeUser}
        scenes={scenes.allScenes}
        activeScene={scenes.activeScene}
        addScene={addScene}
        addUser={addUser}
        saveUserHandler={saveUserHandler}
        saveSceneHandler={saveSceneHandler}
        isSceneChanged={isSceneChanged}
        setSceneChange={setSceneChange}
        deleteHandler={deleteHandler}
        isUsersVisible={isUsersVisible}
        isScenesVisible={isScenesVisible}
        scenesHandler={scenesHandler}
        usersHandler={usersHandler}
        setUserValid={setUserValid}
    />
}

export default AdminPanelContainer;

