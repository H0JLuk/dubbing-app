import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import UserInfo from './UserInfo'
import { setChangedUser, removeUser } from '../../store/actions/users'
import deepEqual from '../../utils/deepEqual'

const UserInfoContainer = (props) => {
    const {
        setUserValid
    } = props;
    const dispatch = useDispatch();
    const allGroups = useSelector(state => state.scenes.allGroups);
    const { activeUser, changedUser } = useSelector(state => state.users);
    const [groups, setGroups] = useState();
    const [ editMode, setEditMode ] = useState(false);
    const [ passwordVision, setPasswordVision ] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const groupsRef = useRef();
    const adminRef = useRef();
    const noteRef = useRef();

    useEffect(() => {
        setFormValues(activeUser);
        setPasswordVision(false);

        if (activeUser.id) {
            setEditMode(false);
        } else {
            setEditMode(true);
        }
        // eslint-disable-next-line
    }, [activeUser])

    useEffect(() => {
        if (editMode) {
            passwordRef.current.value = '';
        } else {
            passwordRef.current.value = '      ';
        }

        saveChangedUser();
        changeHandler();
        // eslint-disable-next-line
    }, [editMode])

    useEffect(() => {
        changeHandler();
        // eslint-disable-next-line
    }, [groups])

    const editHandler = () => {
        setEditMode(state => !state);
        setPasswordVision(false);
    }

    const eyeHandler = () => {
        setPasswordVision(state => !state);
    }

    const setFormValues = (user) => {
        emailRef.current.value = user.username;
        passwordRef.current.value = user.password === '' ? '' : '      ';
        noteRef.current.value = user.note;
        groupsRef.current.select.setValue(setGroupsOptions(user.groups));
        adminRef.current.value = user.role;
        adminRef.current.checked = user.role === 'admin';

        dispatch(setChangedUser(user))
    }

    const changeHandler = () => {
        const newUser = saveChangedUser();

        const isEqual = deepEqual(newUser, activeUser);
        !isEqual && setUserValid(true);

        const isValid = isFormValid();
        !isValid && setUserValid(false);
    }

    const isFormValid = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        if (email.trim() === '') return false
        if (password.trim() === '' && (editMode || !activeUser.id)) return false
        if (password.includes(' ') && (editMode || !activeUser.id)) return false
        if (password.includes(' ') && (editMode || !activeUser.id)) return false
        if (groups && groups.length === 0) return false
        return true
    }

    const onKeydownHandler = (e) => {
        // eslint-disable-next-line
        const regex = /^[a-zA-Z0-9()*_\-!#$%^&*,."\'\][]+$/;
        if (!regex.test(e.key)) {
            e.preventDefault();
        }
    }

    const saveChangedUser = () => {
        const user = {
            username: emailRef.current.value,
            role: adminRef.current.checked ? 'admin' : 'speaker',
            session: activeUser.session,
            note: noteRef.current.value,
            groups: revertGroups(groupsRef.current.state.value),
            temporary: false
        };

        if (activeUser.id) {
            user.id = activeUser.id;
        }

        if (passwordRef.current.value !== '      ' || !activeUser.id) {
            user.password = passwordRef.current.value;
        }

        dispatch(setChangedUser(user))
        return user;
    }

    const revertGroups = (groups) => {
        return groups.map(group => allGroups.find(element => element.group_name === group.value))
    }

    const setGroupsOptions = (groups) => {
        return groups.map(group => ({ value: group.group_name, label: group.group_name }))
    }

    const deleteHandler = () => {
        const isReady = window.confirm('Delete?')
        isReady && dispatch(removeUser(changedUser));
    }

    return <UserInfo
        allGroups={allGroups}
        setGroups={setGroups}
        activeUser={activeUser}
        changeHandler={changeHandler}
        deleteHandler={deleteHandler}
        editHandler={editHandler}
        eyeHandler={eyeHandler}
        setGroupsOptions={setGroupsOptions}
        onKeydownHandler={onKeydownHandler}
        groups={groups}
        editMode={editMode}
        passwordVision={passwordVision}
        emailRef={emailRef}
        passwordRef={passwordRef}
        groupsRef={groupsRef}
        adminRef={adminRef}
        noteRef={noteRef}
    />
}

export default UserInfoContainer;