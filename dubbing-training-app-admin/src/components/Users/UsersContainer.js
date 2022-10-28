import { useSelector, useDispatch } from 'react-redux'

import Users from "./Users"
import deepEqual from '../../utils/deepEqual'
import { setActiveUser } from '../../store/actions/users'

const UsersContainer = (props) => {
    const {
        addHandler
    } = props;

    const users = useSelector(state => state.users);
    const dispatch = useDispatch();

    const checkActive = (id) => {
        if (users.activeUser && users.activeUser.id === id) {
            return { backgroundColor: '#7B7676' }
        }
    }

    const chooseUser = (user) => {
        let isReady = true;

        if (users.activeUser) {
            const isEqual = deepEqual(users.activeUser, users.changedUser);
            isReady = !isEqual ? window.confirm('Discard all changes?') : true;
        }

        isReady && dispatch(setActiveUser(user));
    }

    return <Users
        addHandler={addHandler}
        usersList={users.users}
        checkActive={checkActive}
        chooseUser={chooseUser}
    />
}

export default UsersContainer;