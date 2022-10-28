import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setSession, connectToSession, initSession } from '../store/actions/socket'
import { setSpeaker } from '../store/actions/profile'
import { useAuth } from '../api/Auth'
import VideoPlayer from '../components/VideoPlayer'
import Scenes from '../components/Scenes'

const UserPlayer = () => {
    const auth = useAuth();
    const dispatch = useDispatch();
    const { session, data } = useSelector(state => state.socket);
    const { status } = useSelector(state => state.profile);

    useEffect(() => {
        if (auth.user.id === data.speaker_id) {
            dispatch(setSpeaker());
        }

        sessionConnection();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (session && session !== 'wrong') {
            localStorage.setItem('session', session);
        } else if (session === 'wrong') {
            dispatch(initSession(auth.user));
        }

        // eslint-disable-next-line
    }, [session])

    const sessionConnection = () => {
        const localSession = localStorage.getItem('session');
        if (localSession) {
            dispatch(setSession(localSession));
            dispatch(connectToSession(localSession));
        } else {
            dispatch(initSession(auth.user));
        }
    }

    return (
        <main>
            {
                !data.take_id && !data.scene_id && status === 'speaker'  ?
                    <Scenes />:
                    <VideoPlayer />
            }
        </main>
    )
}

export default UserPlayer;